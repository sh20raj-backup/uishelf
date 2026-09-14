import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export interface CredentialStore {
  get(providerId: string, envVarName?: string): Promise<string | null>;
  set(providerId: string, secret: string): Promise<void>;
  delete(providerId: string): Promise<void>;
  listProvidersWithAuth(): Promise<string[]>;
}

export class MultiTierCredentialStore implements CredentialStore {
  private projectDir: string;
  private globalDir: string;

  constructor(projectDir: string = process.cwd()) {
    this.projectDir = projectDir;
    this.globalDir = path.join(os.homedir(), ".uishelf");
  }

  async get(providerId: string, envVarName?: string): Promise<string | null> {
    const normalizedId = providerId.toLowerCase().replace(/[^a-z0-9_]/g, "_");

    // 1. Check explicit envVarName if given
    if (envVarName && process.env[envVarName]) {
      return process.env[envVarName] || null;
    }

    // 2. Check well-known environment variables
    const knownEnvMap: Record<string, string[]> = {
      "21st": ["API_KEY_21ST", "TWENTYFIRST_API_KEY"],
      "react-bits": ["REACTBITS_LICENSE_KEY", "REACT_BITS_LICENSE_KEY"],
      reui: ["REUI_LICENSE_KEY"],
    };

    const envKeys = knownEnvMap[providerId] || [
      `UISHELF_AUTH_${normalizedId.toUpperCase()}`,
      `${normalizedId.toUpperCase()}_API_KEY`,
      `${normalizedId.toUpperCase()}_TOKEN`,
      `${normalizedId.toUpperCase()}_LICENSE_KEY`,
    ];

    for (const key of envKeys) {
      if (process.env[key]) {
        return process.env[key] as string;
      }
    }

    // 3. Check project-local credentials (.uishelf/credentials.json)
    const projectCredsPath = path.join(this.projectDir, ".uishelf", "credentials.json");
    if (fs.existsSync(projectCredsPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(projectCredsPath, "utf-8"));
        if (data[providerId]) return data[providerId];
      } catch {
        // Ignore read errors
      }
    }

    // 4. Check global credentials (~/.uishelf/credentials.json)
    const globalCredsPath = path.join(this.globalDir, "credentials.json");
    if (fs.existsSync(globalCredsPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(globalCredsPath, "utf-8"));
        if (data[providerId]) return data[providerId];
      } catch {
        // Ignore read errors
      }
    }

    return null;
  }

  async set(providerId: string, secret: string, scope: "project" | "global" = "global"): Promise<void> {
    const targetDir =
      scope === "project" ? path.join(this.projectDir, ".uishelf") : this.globalDir;
    const credsPath = path.join(targetDir, "credentials.json");

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true, mode: 0o700 });
    }

    let data: Record<string, string> = {};
    if (fs.existsSync(credsPath)) {
      try {
        data = JSON.parse(fs.readFileSync(credsPath, "utf-8"));
      } catch {
        data = {};
      }
    }

    data[providerId] = secret;
    fs.writeFileSync(credsPath, JSON.stringify(data, null, 2), {
      encoding: "utf-8",
      mode: 0o600,
    });
  }

  async delete(providerId: string): Promise<void> {
    const paths = [
      path.join(this.projectDir, ".uishelf", "credentials.json"),
      path.join(this.globalDir, "credentials.json"),
    ];

    for (const p of paths) {
      if (fs.existsSync(p)) {
        try {
          const data = JSON.parse(fs.readFileSync(p, "utf-8"));
          if (data[providerId]) {
            delete data[providerId];
            fs.writeFileSync(p, JSON.stringify(data, null, 2), {
              encoding: "utf-8",
              mode: 0o600,
            });
          }
        } catch {
          // Ignore
        }
      }
    }
  }

  async listProvidersWithAuth(): Promise<string[]> {
    const providers = new Set<string>();

    const paths = [
      path.join(this.projectDir, ".uishelf", "credentials.json"),
      path.join(this.globalDir, "credentials.json"),
    ];

    for (const p of paths) {
      if (fs.existsSync(p)) {
        try {
          const data = JSON.parse(fs.readFileSync(p, "utf-8"));
          for (const key of Object.keys(data)) {
            providers.add(key);
          }
        } catch {
          // Ignore
        }
      }
    }

    return Array.from(providers);
  }
}

export function redactSecrets(text: string, secrets: string[]): string {
  let result = text;
  for (const secret of secrets) {
    if (secret && secret.length >= 4) {
      result = result.split(secret).join("[REDACTED]");
    }
  }
  return result;
}
