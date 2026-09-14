import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import {
  type InstallPlan,
  type InstallResult,
  type ProjectContext,
  type UIShelfLockfile,
  UIShelfLockfileSchema,
} from "@uishelf/schema";
import { computeSourceHash, validateSafePath, verifySourceHash } from "@uishelf/security";

export interface ExecuteInstallOptions {
  plan: InstallPlan;
  project: ProjectContext;
  skipDependencies?: boolean;
}

export async function executeInstall(options: ExecuteInstallOptions): Promise<InstallResult> {
  const { plan, project, skipDependencies = false } = options;
  const { component, files, npmPackages, dryRun } = plan;

  if (dryRun) {
    return {
      success: true,
      componentId: component.id,
      installedFiles: files.map((f) => f.path),
      installedPackages: npmPackages.map((p) => p.name),
      installedRegistryDependencies: plan.registryDependencies,
      lockfileUpdated: false,
      warnings: ["Dry-run mode: no changes were written to disk"],
    };
  }

  // Backup files for transactional rollback
  const backupDir = path.join(project.workspaceDir, ".uishelf", ".backup", `${Date.now()}`);
  const createdFiles: string[] = [];
  const backedUpFiles: Array<{ original: string; backup: string }> = [];

  try {
    // 1. Prepare backup directory
    fs.mkdirSync(backupDir, { recursive: true });

    // 2. Try executing the upstream provider's native command in the background if available
    let nativeCommandExecuted = false;
    const upstreamCommand = component.install?.command;
    const pm = project.packageManager || "npm";

    if (upstreamCommand && (component.install.mode === "shadcn" || component.install.mode === "cli")) {
      let bgCmd = upstreamCommand;
      // Adapt runner to project's package manager
      if (pm === "pnpm") {
        bgCmd = bgCmd.replace(/^npx\s+/, "pnpm dlx ");
      } else if (pm === "bun") {
        bgCmd = bgCmd.replace(/^npx\s+/, "bunx --bun ");
      }

      try {
        execSync(bgCmd, {
          cwd: project.workspaceDir,
          stdio: "pipe",
          timeout: 45000,
        });
        nativeCommandExecuted = true;
      } catch (cmdErr: any) {
        // If native CLI command fails (e.g. no components.json configured or network hitch),
        // gracefully fall back to UIShelf's transactional file writing & dependency installation.
        nativeCommandExecuted = false;
      }
    }

    // 3. Write/Update files (if native command didn't handle it, or to guarantee file contents)
    for (const file of files) {
      const pathCheck = validateSafePath(file.path, project.workspaceDir);
      if (!pathCheck.safe) {
        throw new Error(`Security validation error for ${file.path}: ${pathCheck.reason}`);
      }

      const absPath = pathCheck.resolvedPath;
      const fileDir = path.dirname(absPath);

      // If file already exists and native command succeeded, don't overwrite if content is empty
      if (fs.existsSync(absPath) && nativeCommandExecuted && !file.content) {
        continue;
      }

      if (fs.existsSync(absPath)) {
        // Backup existing
        const backupPath = path.join(backupDir, path.basename(file.path));
        fs.copyFileSync(absPath, backupPath);
        backedUpFiles.push({ original: absPath, backup: backupPath });
      } else {
        createdFiles.push(absPath);
      }

      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }

      if (file.content) {
        fs.writeFileSync(absPath, file.content, "utf-8");
      }
    }

    // 4. Install NPM Dependencies
    const installedPackages: string[] = [];
    if (!skipDependencies && npmPackages.length > 0 && !nativeCommandExecuted) {
      const pkgNames = npmPackages.map((p) => p.name).join(" ");

      const isPnpmWorkspace = fs.existsSync(path.join(project.workspaceDir, "pnpm-workspace.yaml"));
      let isYarnWorkspace = false;
      try {
        const pkgJsonPath = path.join(project.workspaceDir, "package.json");
        if (fs.existsSync(pkgJsonPath)) {
          const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
          isYarnWorkspace = !!pkg.workspaces;
        }
      } catch {
        // ignore
      }

      let cmd = "";
      if (pm === "pnpm") cmd = isPnpmWorkspace ? `pnpm add -w ${pkgNames}` : `pnpm add ${pkgNames}`;
      else if (pm === "yarn") cmd = isYarnWorkspace ? `yarn add -W ${pkgNames}` : `yarn add ${pkgNames}`;
      else if (pm === "bun") cmd = `bun add ${pkgNames}`;
      else cmd = `npm install ${pkgNames}`;

      try {
        execSync(cmd, { cwd: project.workspaceDir, stdio: "pipe" });
        installedPackages.push(...npmPackages.map((p) => p.name));
      } catch (err: any) {
        try {
          if (pm === "pnpm" && !cmd.includes("-w")) {
            execSync(`pnpm add -w ${pkgNames}`, { cwd: project.workspaceDir, stdio: "pipe" });
            installedPackages.push(...npmPackages.map((p) => p.name));
          } else {
            console.warn(`[UIShelf] Package install notice: ${err.message}`);
          }
        } catch (retryErr: any) {
          console.warn(`[UIShelf] Package install notice: ${retryErr.message}`);
        }
      }
    } else if (nativeCommandExecuted) {
      installedPackages.push(...npmPackages.map((p) => p.name));
    }

    // 5. Update uishelf.lock
    updateLockfile(project.workspaceDir, plan);

    // Clean up backup directory on success
    try {
      fs.rmSync(backupDir, { recursive: true, force: true });
    } catch {
      // Ignore
    }

    return {
      success: true,
      componentId: component.id,
      installedFiles: files.map((f) => f.path),
      installedPackages,
      installedRegistryDependencies: plan.registryDependencies,
      lockfileUpdated: true,
      warnings: [],
    };
  } catch (error: any) {
    // Transaction Rollback
    for (const item of backedUpFiles) {
      try {
        fs.copyFileSync(item.backup, item.original);
      } catch {
        // Ignore
      }
    }
    for (const created of createdFiles) {
      try {
        if (fs.existsSync(created)) fs.unlinkSync(created);
      } catch {
        // Ignore
      }
    }

    return {
      success: false,
      componentId: component.id,
      installedFiles: [],
      installedPackages: [],
      installedRegistryDependencies: [],
      lockfileUpdated: false,
      warnings: [],
      error: `Installation failed and transaction rolled back: ${error?.message || error}`,
    };
  }
}

export function loadLockfile(workspaceDir: string): UIShelfLockfile {
  const lockPath = path.join(workspaceDir, "uishelf.lock");
  if (fs.existsSync(lockPath)) {
    try {
      const raw = fs.readFileSync(lockPath, "utf-8");
      return UIShelfLockfileSchema.parse(JSON.parse(raw));
    } catch {
      // Return empty lockfile
    }
  }

  return {
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    components: {},
  };
}

export function updateLockfile(workspaceDir: string, plan: InstallPlan): void {
  const lockfile = loadLockfile(workspaceDir);
  const now = new Date().toISOString();

  const fileManifests = plan.files.map((f) => ({
    path: f.path,
    hash: f.sourceHash || computeSourceHash(f.content),
  }));

  const depVersions: Record<string, string> = {};
  for (const dep of plan.npmPackages) {
    depVersions[dep.name] = dep.version || "*";
  }

  lockfile.components[plan.component.id] = {
    id: plan.component.id,
    provider: plan.component.providerId,
    providerItemId: plan.component.providerItemId,
    title: plan.component.title,
    version: "latest",
    sourceHash: fileManifests[0]?.hash || "sha256:empty",
    installedAt: now,
    sourceUrl: plan.component.source.registryUrl || plan.component.source.homepage,
    license: plan.component.license || "MIT",
    dependencies: depVersions,
    registryDependencies: plan.registryDependencies,
    files: fileManifests,
  };

  lockfile.updatedAt = now;

  const lockPath = path.join(workspaceDir, "uishelf.lock");
  fs.writeFileSync(lockPath, JSON.stringify(lockfile, null, 2), "utf-8");
}

export function verifyLockfile(workspaceDir: string): {
  valid: boolean;
  tamperedFiles: string[];
  missingFiles: string[];
} {
  const lockfile = loadLockfile(workspaceDir);
  const tamperedFiles: string[] = [];
  const missingFiles: string[] = [];

  for (const comp of Object.values(lockfile.components)) {
    for (const file of comp.files) {
      const absPath = path.resolve(workspaceDir, file.path);
      if (!fs.existsSync(absPath)) {
        missingFiles.push(file.path);
        continue;
      }
      try {
        const content = fs.readFileSync(absPath, "utf-8");
        if (!verifySourceHash(content, file.hash)) {
          tamperedFiles.push(file.path);
        }
      } catch {
        missingFiles.push(file.path);
      }
    }
  }

  return {
    valid: tamperedFiles.length === 0 && missingFiles.length === 0,
    tamperedFiles,
    missingFiles,
  };
}

export function removeComponent(
  componentId: string,
  project: ProjectContext
): { success: boolean; removedFiles: string[]; message?: string } {
  const lockfile = loadLockfile(project.workspaceDir);
  const record = lockfile.components[componentId];
  if (!record) {
    return {
      success: false,
      removedFiles: [],
      message: `Component '${componentId}' is not recorded in uishelf.lock`,
    };
  }

  const removedFiles: string[] = [];
  for (const file of record.files) {
    const absPath = path.resolve(project.workspaceDir, file.path);
    if (fs.existsSync(absPath)) {
      try {
        fs.unlinkSync(absPath);
        removedFiles.push(file.path);
      } catch {
        // Ignore
      }
    }
  }

  delete lockfile.components[componentId];
  lockfile.updatedAt = new Date().toISOString();
  const lockPath = path.join(project.workspaceDir, "uishelf.lock");
  fs.writeFileSync(lockPath, JSON.stringify(lockfile, null, 2), "utf-8");

  return {
    success: true,
    removedFiles,
  };
}
