import {
  type SearchQuery,
  type SearchResponse,
  type InstallPlan,
  type InstallResult,
  type ProjectContext,
  type UIShelfComponent,
  type ProviderMetadata,
  type ProviderHealth,
} from "@uishelf/schema";
import { detectProject } from "@uishelf/project";
import { searchComponents as internalSearch } from "@uishelf/search";
import { providerManager } from "@uishelf/providers";
import { registryManager, type RegistrySyncResult } from "@uishelf/registry";
import { executeInstall, loadLockfile, removeComponent as internalRemove, verifyLockfile } from "@uishelf/installer";
import { loadConfig } from "@uishelf/config";
import { MultiTierCredentialStore } from "@uishelf/credentials";
import { scanSourceSecurity } from "@uishelf/security";

export * from "@uishelf/schema";
export { detectProject } from "@uishelf/project";
export { searchComponents } from "@uishelf/search";
export { providerManager } from "@uishelf/providers";
export { registryManager } from "@uishelf/registry";
export { MultiTierCredentialStore } from "@uishelf/credentials";
export { loadConfig, saveProjectConfig, saveGlobalConfig } from "@uishelf/config";

export interface CoreOptions {
  cwd?: string;
}

export interface DoctorReport {
  project: ProjectContext;
  providers: Record<string, ProviderHealth>;
  lockfileValid: boolean;
  issues: string[];
  recommendations: string[];
  ready: boolean;
}

export class UIShelfCore {
  private cwd: string;
  private credentialStore: MultiTierCredentialStore;

  constructor(options: CoreOptions = {}) {
    this.cwd = options.cwd || process.cwd();
    this.credentialStore = new MultiTierCredentialStore(this.cwd);
  }

  getProjectContext(): ProjectContext {
    return detectProject({ cwd: this.cwd });
  }

  async search(query: SearchQuery): Promise<SearchResponse> {
    const project = this.getProjectContext();
    const { config } = loadConfig(this.cwd);

    let allComponents = await registryManager.getComponents();

    // Apply provider mode from config (allowlist/denylist)
    if (config.providers.mode === "allowlist" && config.providers.include.length > 0) {
      allComponents = allComponents.filter((c) =>
        config.providers.include.includes(c.providerId)
      );
    } else if (config.providers.mode === "denylist" && config.providers.exclude.length > 0) {
      allComponents = allComponents.filter(
        (c) => !config.providers.exclude.includes(c.providerId)
      );
    }

    return internalSearch({
      query,
      catalog: allComponents,
      project,
    });
  }

  async getComponent(id: string): Promise<UIShelfComponent | null> {
    const all = await registryManager.getComponents();
    const exact = all.find(
      (c) => c.id === id || c.name === id || c.providerItemId === id
    );
    if (exact) return exact;

    // Search by provider
    for (const p of providerManager.list()) {
      const item = await p.get(id);
      if (item) return item;
    }

    return null;
  }

  async plan(componentId: string, options: { dryRun?: boolean } = {}): Promise<InstallPlan | null> {
    const component = await this.getComponent(componentId);
    if (!component) return null;

    const project = this.getProjectContext();
    const provider = providerManager.get(component.providerId);
    if (!provider) return null;

    const plan = await provider.getInstallPlan(component.id, project);
    if (!plan) return null;

    plan.dryRun = !!options.dryRun;

    // Check credentials if required
    if (component.auth.required) {
      const cred = await this.credentialStore.get(
        component.providerId,
        component.auth.envVar
      );
      plan.authSatisfied = !!cred;
    } else {
      plan.authSatisfied = true;
    }

    return plan;
  }

  async install(
    componentId: string,
    options: { dryRun?: boolean; skipDependencies?: boolean; apiKey?: string } = {}
  ): Promise<InstallResult> {
    const plan = await this.plan(componentId, { dryRun: options.dryRun });
    if (!plan) {
      return {
        success: false,
        componentId,
        installedFiles: [],
        installedPackages: [],
        installedRegistryDependencies: [],
        lockfileUpdated: false,
        warnings: [],
        error: `Component '${componentId}' could not be resolved from any active provider`,
      };
    }

    // Check auth
    if (plan.authRequired && !plan.authSatisfied && !options.apiKey) {
      return {
        success: false,
        componentId,
        installedFiles: [],
        installedPackages: [],
        installedRegistryDependencies: [],
        lockfileUpdated: false,
        warnings: [],
        error: `Authentication required: ${plan.component.auth.description || "Provider requires an API key for installation"} (${plan.authEnvVar})`,
      };
    }

    if (options.apiKey && plan.component.auth.required) {
      await this.credentialStore.set(plan.component.providerId, options.apiKey, "project");
    }

    const project = this.getProjectContext();
    return executeInstall({
      plan,
      project,
      skipDependencies: options.skipDependencies,
    });
  }

  remove(componentId: string): { success: boolean; removedFiles: string[]; message?: string } {
    const project = this.getProjectContext();
    return internalRemove(componentId, project);
  }

  listInstalled(): any[] {
    const lockfile = loadLockfile(this.cwd);
    return Object.values(lockfile.components);
  }

  verify(): { valid: boolean; tamperedFiles: string[]; missingFiles: string[] } {
    return verifyLockfile(this.cwd);
  }

  async runDoctor(): Promise<DoctorReport> {
    const project = this.getProjectContext();
    const providers = await providerManager.getHealthReport();
    const lockVerification = this.verify();

    const issues: string[] = [];
    const recommendations: string[] = [];

    // Framework check
    if (project.framework === "other") {
      recommendations.push("No Next.js or Vite framework detected; components will install as generic React");
    }

    // Tailwind check
    if (!project.tailwindVersion) {
      issues.push("Tailwind CSS not detected. Most shadcn components require Tailwind.");
      recommendations.push("Install Tailwind CSS (v4 or v3) for optimal styling.");
    }

    // Lockfile check
    if (!lockVerification.valid) {
      if (lockVerification.tamperedFiles.length > 0) {
        issues.push(`Tampered files detected: ${lockVerification.tamperedFiles.join(", ")}`);
      }
      if (lockVerification.missingFiles.length > 0) {
        issues.push(`Missing locked files: ${lockVerification.missingFiles.join(", ")}`);
      }
    }

    return {
      project,
      providers,
      lockfileValid: lockVerification.valid,
      issues,
      recommendations,
      ready: issues.length === 0,
    };
  }

  async syncRegistries(): Promise<RegistrySyncResult> {
    return registryManager.syncOfficialRegistries();
  }

  async listProviders(): Promise<ProviderMetadata[]> {
    return registryManager.getProviders();
  }

  async audit(): Promise<{ passed: boolean; score: number; scannedFiles: number; issues: string[] }> {
    const project = this.getProjectContext();
    const lockfile = loadLockfile(project.workspaceDir);
    const issues: string[] = [];
    let scannedFiles = 0;
    let minScore = 100;

    for (const comp of Object.values(lockfile.components)) {
      for (const file of comp.files) {
        const absPath = `${project.workspaceDir}/${file.path}`;
        try {
          const fs = await import("node:fs");
          if (fs.existsSync(absPath)) {
            const content = fs.readFileSync(absPath, "utf-8");
            scannedFiles++;
            const scan = scanSourceSecurity(content);
            if (!scan.passed) {
              issues.push(...scan.blockers.map((b) => `${file.path}: ${b}`));
            }
            if (scan.score < minScore) minScore = scan.score;
          }
        } catch {
          // Ignore
        }
      }
    }

    return {
      passed: issues.length === 0,
      score: minScore,
      scannedFiles,
      issues,
    };
  }
}

export const uishelf = new UIShelfCore();
