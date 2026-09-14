import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { type UIShelfConfig, UIShelfConfigSchema } from "@uishelf/schema";

export function getDefaultConfig(): UIShelfConfig {
  return {
    providers: {
      mode: "all",
      include: [],
      exclude: [],
      custom: {},
    },
    preferences: {
      minScore: 0,
      preferMotion: true,
      preferTypeScript: true,
      preferRSC: true,
      preferAccessible: true,
      componentsDir: "components/ui",
    },
    stack: [],
    telemetry: false,
    securityLevel: "standard",
  };
}

export function loadConfig(cwd: string = process.cwd()): {
  config: UIShelfConfig;
  projectConfigPath: string | null;
  globalConfigPath: string;
} {
  const globalDir = path.join(os.homedir(), ".uishelf");
  const globalConfigPath = path.join(globalDir, "config.json");

  let globalConfig: Partial<UIShelfConfig> = {};
  if (fs.existsSync(globalConfigPath)) {
    try {
      globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, "utf-8"));
    } catch {
      // Ignore parse error
    }
  }

  // Look for uishelf.json in cwd or parents
  const projectConfigPath = findProjectConfigFile(cwd);
  let projectConfig: Partial<UIShelfConfig> = {};
  if (projectConfigPath && fs.existsSync(projectConfigPath)) {
    try {
      projectConfig = JSON.parse(fs.readFileSync(projectConfigPath, "utf-8"));
    } catch {
      // Ignore parse error
    }
  }

  const merged = mergeConfigs(getDefaultConfig(), globalConfig, projectConfig);
  const validated = UIShelfConfigSchema.parse(merged);

  return {
    config: validated,
    projectConfigPath,
    globalConfigPath,
  };
}

export function saveProjectConfig(
  updates: any,
  cwd: string = process.cwd()
): string {
  const projectConfigPath = findProjectConfigFile(cwd) || path.join(cwd, "uishelf.json");
  let existing: Partial<UIShelfConfig> = {};
  if (fs.existsSync(projectConfigPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(projectConfigPath, "utf-8"));
    } catch {
      existing = {};
    }
  }

  const merged = mergeConfigs(existing, updates);
  fs.writeFileSync(projectConfigPath, JSON.stringify(merged, null, 2), "utf-8");
  return projectConfigPath;
}

export function saveGlobalConfig(updates: any): string {
  const globalDir = path.join(os.homedir(), ".uishelf");
  if (!fs.existsSync(globalDir)) {
    fs.mkdirSync(globalDir, { recursive: true });
  }
  const globalConfigPath = path.join(globalDir, "config.json");

  let existing: Partial<UIShelfConfig> = {};
  if (fs.existsSync(globalConfigPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(globalConfigPath, "utf-8"));
    } catch {
      existing = {};
    }
  }

  const merged = mergeConfigs(existing, updates);
  fs.writeFileSync(globalConfigPath, JSON.stringify(merged, null, 2), "utf-8");
  return globalConfigPath;
}

function findProjectConfigFile(startDir: string): string | null {
  let current = startDir;
  while (true) {
    const configPath = path.join(current, "uishelf.json");
    if (fs.existsSync(configPath)) return configPath;

    const altPath = path.join(current, ".uishelf", "config.json");
    if (fs.existsSync(altPath)) return altPath;

    if (fs.existsSync(path.join(current, "package.json"))) {
      // Don't traverse higher than git root or system root
      const parent = path.dirname(current);
      if (fs.existsSync(path.join(current, ".git")) || parent === current) {
        break;
      }
      current = parent;
    } else {
      break;
    }
  }
  return null;
}

function mergeConfigs(...configs: Partial<UIShelfConfig>[]): UIShelfConfig {
  let result = getDefaultConfig();
  for (const cfg of configs) {
    if (!cfg) continue;
    result = {
      ...result,
      ...cfg,
      providers: {
        ...result.providers,
        ...(cfg.providers || {}),
        include: cfg.providers?.include || result.providers.include,
        exclude: cfg.providers?.exclude || result.providers.exclude,
        custom: {
          ...result.providers.custom,
          ...(cfg.providers?.custom || {}),
        },
      },
      preferences: {
        ...result.preferences,
        ...(cfg.preferences || {}),
      },
      stack: cfg.stack || result.stack,
    };
  }
  return result;
}
