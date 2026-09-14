import fs from "node:fs";
import path from "node:path";
import { type ProjectContext } from "@uishelf/schema";

export interface DetectProjectOptions {
  cwd?: string;
}

export function detectProject(options: DetectProjectOptions = {}): ProjectContext {
  const startDir = path.resolve(options.cwd || process.cwd());
  const projectRoot = findProjectRoot(startDir);
  const workspaceDir = startDir;

  const pkgJsonPath = path.join(workspaceDir, "package.json");
  let pkgJson: Record<string, any> = {};
  if (fs.existsSync(pkgJsonPath)) {
    try {
      pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
    } catch {
      // Ignore parse errors
    }
  }

  const allDeps: Record<string, string> = {
    ...(pkgJson.dependencies || {}),
    ...(pkgJson.devDependencies || {}),
  };

  // Detect Package Manager
  const packageManager = detectPackageManager(workspaceDir, projectRoot);

  // Detect Framework
  const { framework, frameworkVersion, rsc } = detectFramework(allDeps);

  // Detect React Version
  const reactVersion = detectReactVersion(allDeps);

  // Detect Tailwind Version
  const tailwindVersion = detectTailwindVersion(workspaceDir, allDeps);

  // Detect Primitives
  const stylingPrimitives = detectPrimitives(allDeps);

  // Detect Motion
  const motionEngine = detectMotion(allDeps);

  // Detect TypeScript and Aliases
  const { typescript, aliases } = detectTypeScriptAndAliases(workspaceDir);

  // Detect shadcn configuration
  const { hasShadcn, shadcnConfigPath, componentsDir } = detectShadcn(workspaceDir);

  // Detect Existing Components (for Design System Mode)
  const existingComponents = detectExistingComponents(workspaceDir, componentsDir);

  const isMonorepo = projectRoot !== workspaceDir || checkMonorepoIndicators(projectRoot);

  return {
    rootDir: projectRoot,
    workspaceDir,
    isMonorepo,
    packageManager,
    framework,
    frameworkVersion,
    reactVersion,
    tailwindVersion,
    hasShadcn,
    shadcnConfigPath,
    stylingPrimitives,
    motionEngine,
    typescript,
    rsc,
    aliases,
    componentsDir,
    existingComponents,
    installedDependencies: allDeps,
  };
}

function findProjectRoot(startDir: string): string {
  let current = startDir;
  let highestRoot = startDir;

  while (true) {
    if (
      fs.existsSync(path.join(current, "pnpm-workspace.yaml")) ||
      fs.existsSync(path.join(current, "lerna.json")) ||
      fs.existsSync(path.join(current, "turbo.json")) ||
      fs.existsSync(path.join(current, ".git"))
    ) {
      highestRoot = current;
      break;
    }

    if (fs.existsSync(path.join(current, "package.json"))) {
      highestRoot = current;
    }

    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }

  return highestRoot;
}

function checkMonorepoIndicators(rootDir: string): boolean {
  return (
    fs.existsSync(path.join(rootDir, "pnpm-workspace.yaml")) ||
    fs.existsSync(path.join(rootDir, "turbo.json")) ||
    fs.existsSync(path.join(rootDir, "lerna.json"))
  );
}

function detectPackageManager(
  workspaceDir: string,
  rootDir: string
): "pnpm" | "npm" | "yarn" | "bun" {
  const dirs = [workspaceDir, rootDir];
  for (const dir of dirs) {
    if (fs.existsSync(path.join(dir, "pnpm-lock.yaml"))) return "pnpm";
    if (fs.existsSync(path.join(dir, "bun.lockb")) || fs.existsSync(path.join(dir, "bun.lock")))
      return "bun";
    if (fs.existsSync(path.join(dir, "yarn.lock"))) return "yarn";
    if (fs.existsSync(path.join(dir, "package-lock.json"))) return "npm";
  }
  return "npm";
}

function detectFramework(deps: Record<string, string>): {
  framework: ProjectContext["framework"];
  frameworkVersion: string | null;
  rsc: boolean;
} {
  if (deps["next"]) {
    return {
      framework: "next",
      frameworkVersion: deps["next"],
      rsc: true,
    };
  }
  if (deps["vite"] || deps["@vitejs/plugin-react"] || deps["@vitejs/plugin-react-swc"]) {
    return {
      framework: "vite",
      frameworkVersion: deps["vite"] || null,
      rsc: false,
    };
  }
  if (deps["@remix-run/react"] || deps["@remix-run/node"]) {
    return {
      framework: "remix",
      frameworkVersion: deps["@remix-run/react"] || null,
      rsc: false,
    };
  }
  if (deps["react-router"] || deps["react-router-dom"]) {
    return {
      framework: "react-router",
      frameworkVersion: deps["react-router"] || deps["react-router-dom"] || null,
      rsc: false,
    };
  }
  if (deps["astro"]) {
    return {
      framework: "astro",
      frameworkVersion: deps["astro"],
      rsc: false,
    };
  }
  return {
    framework: "other",
    frameworkVersion: null,
    rsc: false,
  };
}

function detectReactVersion(deps: Record<string, string>): string | null {
  const v = deps["react"];
  if (!v) return null;
  if (v.includes("19") || v.startsWith("^19") || v.startsWith("19")) return "19";
  if (v.includes("18") || v.startsWith("^18") || v.startsWith("18")) return "18";
  return v;
}

function detectTailwindVersion(
  dir: string,
  deps: Record<string, string>
): "3" | "4" | null {
  const tw = deps["tailwindcss"];
  if (deps["@tailwindcss/postcss"] || (tw && (tw.startsWith("^4") || tw.startsWith("4")))) {
    return "4";
  }
  if (tw && (tw.startsWith("^3") || tw.startsWith("3"))) {
    return "3";
  }

  // Check config files
  const twConfigs = [
    "tailwind.config.js",
    "tailwind.config.ts",
    "tailwind.config.mjs",
    "tailwind.config.cjs",
  ];
  for (const cfg of twConfigs) {
    if (fs.existsSync(path.join(dir, cfg))) {
      return "3";
    }
  }

  // Check CSS imports for v4
  const cssPaths = [
    path.join(dir, "src/index.css"),
    path.join(dir, "src/app/globals.css"),
    path.join(dir, "app/globals.css"),
    path.join(dir, "styles/globals.css"),
  ];
  for (const cssPath of cssPaths) {
    if (fs.existsSync(cssPath)) {
      const content = fs.readFileSync(cssPath, "utf-8");
      if (content.includes('@import "tailwindcss"') || content.includes("@import 'tailwindcss'")) {
        return "4";
      }
    }
  }

  if (tw) return "3"; // default fallback if tailwind is installed
  return null;
}

function detectPrimitives(deps: Record<string, string>): string[] {
  const primitives: string[] = [];
  const keys = Object.keys(deps);

  if (keys.some((k) => k.startsWith("@radix-ui/"))) {
    primitives.push("radix");
  }
  if (keys.some((k) => k.startsWith("@base-ui-components/") || k === "@base-ui/react")) {
    primitives.push("base-ui");
  }
  if (keys.some((k) => k.startsWith("@react-aria/") || k === "react-aria-components")) {
    primitives.push("react-aria");
  }
  if (keys.some((k) => k.startsWith("@ark-ui/"))) {
    primitives.push("ark-ui");
  }
  if (deps["@headlessui/react"]) {
    primitives.push("headless-ui");
  }

  return primitives;
}

function detectMotion(deps: Record<string, string>): "framer-motion" | "motion" | null {
  if (deps["motion"]) return "motion";
  if (deps["framer-motion"]) return "framer-motion";
  return null;
}

function detectTypeScriptAndAliases(dir: string): {
  typescript: boolean;
  aliases: Record<string, string>;
} {
  const tsconfigPath = path.join(dir, "tsconfig.json");
  const jsconfigPath = path.join(dir, "jsconfig.json");

  const configPath = fs.existsSync(tsconfigPath)
    ? tsconfigPath
    : fs.existsSync(jsconfigPath)
    ? jsconfigPath
    : null;

  if (!configPath) {
    return { typescript: false, aliases: {} };
  }

  const aliases: Record<string, string> = {};
  try {
    const raw = fs.readFileSync(configPath, "utf-8");
    // Strip comments
    const stripped = raw.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
    const parsed = JSON.parse(stripped);
    const paths = parsed.compilerOptions?.paths || {};
    for (const [key, values] of Object.entries(paths)) {
      if (Array.isArray(values) && values.length > 0) {
        aliases[key] = values[0] as string;
      }
    }
  } catch {
    // Ignore JSON parse errors
  }

  return {
    typescript: configPath === tsconfigPath,
    aliases,
  };
}

function detectShadcn(dir: string): {
  hasShadcn: boolean;
  shadcnConfigPath: string | null;
  componentsDir: string;
} {
  const componentsJsonPath = path.join(dir, "components.json");
  if (fs.existsSync(componentsJsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(componentsJsonPath, "utf-8"));
      const uiAlias = data.aliases?.ui || "@/components/ui";
      const cleaned = uiAlias.replace(/^@\//, "").replace(/^~\//, "");
      return {
        hasShadcn: true,
        shadcnConfigPath: componentsJsonPath,
        componentsDir: cleaned || "components/ui",
      };
    } catch {
      return {
        hasShadcn: true,
        shadcnConfigPath: componentsJsonPath,
        componentsDir: "components/ui",
      };
    }
  }

  // Fallback check if components/ui exists
  if (fs.existsSync(path.join(dir, "components/ui")) || fs.existsSync(path.join(dir, "src/components/ui"))) {
    return {
      hasShadcn: true,
      shadcnConfigPath: null,
      componentsDir: fs.existsSync(path.join(dir, "src/components/ui"))
        ? "src/components/ui"
        : "components/ui",
    };
  }

  return {
    hasShadcn: false,
    shadcnConfigPath: null,
    componentsDir: "components/ui",
  };
}

function detectExistingComponents(dir: string, componentsDir: string): string[] {
  const targetDir = path.isAbsolute(componentsDir)
    ? componentsDir
    : path.join(dir, componentsDir);

  if (!fs.existsSync(targetDir)) {
    // Try src/components/ui if standard components/ui does not exist
    const altDir = path.join(dir, "src", componentsDir);
    if (!fs.existsSync(altDir)) return [];
    return readComponentFiles(altDir);
  }

  return readComponentFiles(targetDir);
}

function readComponentFiles(dir: string): string[] {
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    return files
      .filter((f) => f.isFile() && (f.name.endsWith(".tsx") || f.name.endsWith(".jsx")))
      .map((f) => f.name.replace(/\.(tsx|jsx)$/, ""));
  } catch {
    return [];
  }
}
