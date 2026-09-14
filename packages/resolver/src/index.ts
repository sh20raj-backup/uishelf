import fs from "node:fs";
import path from "node:path";
import {
  type UIShelfComponent,
  type ProjectContext,
  type InstallPlan,
  type PlannedFile,
  type ComponentConflict,
  type Dependency,
  type ProviderMetadata,
} from "@uishelf/schema";
import { computeSourceHash, validateSafePath } from "@uishelf/security";

export interface ResolvePlanOptions {
  component: UIShelfComponent;
  provider: ProviderMetadata;
  project: ProjectContext;
  dryRun?: boolean;
}

export function resolveInstallPlan(options: ResolvePlanOptions): InstallPlan {
  const { component, provider, project, dryRun = false } = options;

  // 1. Resolve variant if applicable (e.g. Ruixen multi-variant resolution)
  let resolvedComponent = component;
  if (provider.id === "ruixen") {
    resolvedComponent = resolveRuixenVariant(component, project);
  }

  // 2. Resolve target directory for UI files
  const baseUiDir = project.componentsDir || "components/ui";

  // 3. Resolve files to write and detect file conflicts
  const plannedFiles: PlannedFile[] = [];
  const conflicts: ComponentConflict[] = [];

  const filesToProcess =
    resolvedComponent.files && resolvedComponent.files.length > 0
      ? resolvedComponent.files
      : [
          {
            path: `${resolvedComponent.name.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}.tsx`,
            content: generateComponentAdapter(resolvedComponent),
          },
        ];

  for (const file of filesToProcess) {
    let fileName = path.basename(file.path);
    if (!fileName.endsWith(".tsx") && !fileName.endsWith(".ts") && !fileName.endsWith(".jsx")) {
      fileName = `${resolvedComponent.name}.tsx`;
    }

    const relPath = path.join(baseUiDir, fileName);
    const absPath = path.resolve(project.workspaceDir, relPath);

    // Validate path security
    const pathCheck = validateSafePath(relPath, project.workspaceDir);
    if (!pathCheck.safe) {
      conflicts.push({
        type: "file-exists",
        message: `Security validation rejected file path: ${pathCheck.reason}`,
        filePath: relPath,
        resolution: "cancel",
      });
      continue;
    }

    const content = file.content || `// UIShelf generated component: ${resolvedComponent.title}\nexport function ${toPascalCase(resolvedComponent.name)}() { return <div>${resolvedComponent.title}</div>; }`;
    const sourceHash = computeSourceHash(content);

    let action: PlannedFile["action"] = "create";
    let existingContent: string | undefined = undefined;

    if (fs.existsSync(absPath)) {
      try {
        existingContent = fs.readFileSync(absPath, "utf-8");
        const existingHash = computeSourceHash(existingContent);

        if (existingHash === sourceHash) {
          action = "skip";
        } else {
          action = "conflict";
          conflicts.push({
            type: "file-exists",
            message: `File '${relPath}' already exists in the project with different content`,
            filePath: relPath,
            resolution: "reuse",
          });
        }
      } catch {
        action = "conflict";
      }
    }

    plannedFiles.push({
      path: relPath,
      content,
      action,
      existingContent,
      sourceHash,
    });
  }

  // Check Design System duplicate component conflict (e.g. button already exists)
  if (
    resolvedComponent.name === "button" &&
    project.existingComponents.includes("button") &&
    resolvedComponent.providerId !== "shadcn"
  ) {
    conflicts.push({
      type: "duplicate-component",
      message: `A Button already exists in this project (${baseUiDir}/button.tsx). Recommended: reuse the existing Button.`,
      filePath: path.join(baseUiDir, "button.tsx"),
      resolution: "reuse",
    });
  }

  // 4. Resolve npm packages needing installation
  const npmPackages: Dependency[] = [];
  for (const dep of resolvedComponent.dependencies) {
    // Only add if not already installed in project
    if (!project.installedDependencies[dep.name]) {
      npmPackages.push(dep);
    }
  }

  // 5. Prerequisites check
  const prerequisites: string[] = [];
  if (provider.prerequisites) {
    for (const prereq of provider.prerequisites) {
      prerequisites.push(prereq);
    }
  }

  // 6. Generate canonical & upstream commands
  const canonicalCommand = `uishelf add ${resolvedComponent.id}${dryRun ? " --dry-run" : ""}`;
  const upstreamCommand =
    resolvedComponent.install.command ||
    `npx shadcn@latest add ${resolvedComponent.id}`;

  return {
    component: resolvedComponent,
    provider,
    files: plannedFiles,
    npmPackages,
    registryDependencies: resolvedComponent.registryDependencies || [],
    conflicts,
    prerequisites,
    authRequired: resolvedComponent.auth.required,
    authEnvVar: resolvedComponent.auth.envVar,
    authSatisfied: !resolvedComponent.auth.required,
    dryRun,
    canonicalCommand,
    upstreamCommand,
  };
}

/**
 * Stack-aware Ruixen variant resolution:
 * Inspects project stack (Tailwind 3 vs 4, Radix vs Base UI)
 * and resolves the precise URL endpoint.
 */
export function resolveRuixenVariant(
  component: UIShelfComponent,
  project: ProjectContext
): UIShelfComponent {
  const isTw3 = project.tailwindVersion === "3";
  const hasBaseUi = project.stylingPrimitives.includes("base-ui");

  let variantTag = "radix-tw4";
  let targetUrl = `https://ruixen.com/r/${component.providerItemId}`;

  if (isTw3 && hasBaseUi) {
    variantTag = "baseui-tw3";
    targetUrl = `https://ruixen.com/r/baseui/tw3/${component.providerItemId}`;
  } else if (!isTw3 && hasBaseUi) {
    variantTag = "baseui-tw4";
    targetUrl = `https://ruixen.com/r/baseui/${component.providerItemId}`;
  } else if (isTw3 && !hasBaseUi) {
    variantTag = "radix-tw3";
    targetUrl = `https://ruixen.com/r/tw3/${component.providerItemId}`;
  } else {
    variantTag = "radix-tw4";
    targetUrl = `https://ruixen.com/r/${component.providerItemId}`;
  }

  return {
    ...component,
    variant: variantTag,
    source: {
      ...component.source,
      registryUrl: targetUrl,
    },
    install: {
      mode: "shadcn",
      command: `npx shadcn@latest add "${targetUrl}"`,
    },
  };
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function generateComponentAdapter(comp: UIShelfComponent): string {
  const compName = toPascalCase(comp.name);
  if (comp.providerId === "mui") {
    return `"use client";
import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

export { Button, type ButtonProps };
export default Button;
`;
  }
  if (comp.providerId === "mantine") {
    return `"use client";
import React from "react";
import { Button, type ButtonProps } from "@mantine/core";

export { Button, type ButtonProps };
export default Button;
`;
  }
  if (comp.providerId === "chakra") {
    return `"use client";
import React from "react";
import { Button, type ButtonProps } from "@chakra-ui/react";

export { Button, type ButtonProps };
export default Button;
`;
  }
  return `"use client";
import React from "react";

export interface ${compName}Props extends React.HTMLAttributes<HTMLDivElement> {}

export function ${compName}(props: ${compName}Props) {
  return (
    <div {...props} className="p-4 rounded-xl border border-white/10 bg-neutral-900 text-white">
      <h3 className="font-semibold text-sm">${comp.title}</h3>
      <p className="text-xs text-neutral-400 mt-1">${comp.description}</p>
    </div>
  );
}

export default ${compName};
`;
}
