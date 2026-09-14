import {
  type UIShelfComponent,
  type ProviderMetadata,
  type ProviderHealth,
  type ProjectContext,
  type InstallPlan,
  type SearchQuery,
  type InstallResult,
} from "@uishelf/schema";
import { CURATED_PROVIDERS, SEED_COMPONENTS, registryManager } from "@uishelf/registry";
import { resolveInstallPlan } from "@uishelf/resolver";
import { type UIShelfProvider } from "./types.js";

export * from "./types.js";

export abstract class BaseProvider implements UIShelfProvider {
  public id: string;
  public name: string;
  public type: "shadcn-registry" | "package-library" | "cli" | "npm" | "github" | "custom";
  public capabilities: UIShelfProvider["capabilities"];
  protected metadata: ProviderMetadata;

  constructor(metadata: ProviderMetadata) {
    this.id = metadata.id;
    this.name = metadata.name;
    this.type = metadata.type;
    this.capabilities = metadata.capabilities;
    this.metadata = metadata;
  }

  async discover(): Promise<ProviderMetadata> {
    return this.metadata;
  }

  async list(): Promise<UIShelfComponent[]> {
    const all = await registryManager.getComponents();
    return all.filter((c) => c.providerId === this.id);
  }

  async search(query: SearchQuery): Promise<UIShelfComponent[]> {
    const items = await this.list();
    const q = (query.query || "").toLowerCase();
    if (!q) return items;
    return items.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  async get(id: string): Promise<UIShelfComponent | null> {
    const items = await this.list();
    const found = items.find((c) => c.id === id || c.name === id || c.providerItemId === id);
    if (found) return found;

    // If dynamic registry URL is available, try fetching upstream
    if (this.metadata.registryUrl) {
      const cleanName = id.replace(new RegExp(`^@?${this.id}/`), "");
      return registryManager.fetchComponentFromRegistry(
        this.metadata.registryUrl,
        cleanName,
        this.id
      );
    }

    return null;
  }

  async getInstallPlan(id: string, context: ProjectContext): Promise<InstallPlan | null> {
    const component = await this.get(id);
    if (!component) return null;
    return resolveInstallPlan({
      component,
      provider: this.metadata,
      project: context,
    });
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: this.metadata.authRequired ? "auth-required" : "healthy",
      latencyMs: 15,
      message: "Online and operational",
      lastChecked: new Date().toISOString(),
    };
  }
}

// 1. shadcn / ui Provider
export class ShadcnProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "shadcn")!);
  }
}

// 2. 21st Provider
export class TwentyFirstProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "21st")!);
  }

  async health(): Promise<ProviderHealth> {
    const hasKey = !!process.env.API_KEY_21ST;
    return {
      status: hasKey ? "healthy" : "auth-required",
      latencyMs: 35,
      message: hasKey ? "Authenticated via API_KEY_21ST" : "API key required for installation",
      lastChecked: new Date().toISOString(),
    };
  }
}

// 3. React Bits Provider
export class ReactBitsProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "react-bits")!);
  }
}

// 4. Magic UI Provider
export class MagicUIProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "magic-ui")!);
  }
}

// 5. Aceternity UI Provider
export class AceternityProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "aceternity")!);
  }
}

// 6. Ruixen UI Provider (Stack-Aware Multi-Variant)
export class RuixenProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "ruixen")!);
  }
}

// 7. Cult UI Provider
export class CultUIProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "cult-ui")!);
  }
}

// 8. ReUI Provider
export class ReUIProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "reui")!);
  }
}

// 9. Animate UI Provider
export class AnimateUIProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "animate-ui")!);
  }
}

// 10. Kokonut UI Provider
export class KokonutUIProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "kokonut")!);
  }
}

// 11. MUI Provider (Package Library)
export class MuiProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "mui")!);
  }
}

// 12. Mantine Provider (Package Library)
export class MantineProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "mantine")!);
  }
}

// 13. Chakra UI Provider (Package Library)
export class ChakraProvider extends BaseProvider {
  constructor() {
    super(CURATED_PROVIDERS.find((p) => p.id === "chakra")!);
  }
}

// 14. Dynamic Custom Registry Provider
export class CustomRegistryProvider extends BaseProvider {
  constructor(metadata: ProviderMetadata) {
    super(metadata);
  }
}

// Central Provider Registry System
export class ProviderManager {
  private providers: Map<string, UIShelfProvider> = new Map();

  constructor() {
    this.register(new ShadcnProvider());
    this.register(new TwentyFirstProvider());
    this.register(new ReactBitsProvider());
    this.register(new MagicUIProvider());
    this.register(new AceternityProvider());
    this.register(new RuixenProvider());
    this.register(new CultUIProvider());
    this.register(new ReUIProvider());
    this.register(new AnimateUIProvider());
    this.register(new KokonutUIProvider());
    this.register(new MuiProvider());
    this.register(new MantineProvider());
    this.register(new ChakraProvider());
  }

  register(provider: UIShelfProvider): void {
    this.providers.set(provider.id, provider);
  }

  get(id: string): UIShelfProvider | null {
    return this.providers.get(id) || null;
  }

  list(): UIShelfProvider[] {
    return Array.from(this.providers.values());
  }

  async getAllComponents(): Promise<UIShelfComponent[]> {
    const results: UIShelfComponent[] = [];
    for (const provider of this.providers.values()) {
      try {
        const items = await provider.list();
        results.push(...items);
      } catch {
        // Individual provider failure does not crash global catalog
      }
    }
    return results;
  }

  async getHealthReport(): Promise<Record<string, ProviderHealth>> {
    const report: Record<string, ProviderHealth> = {};
    for (const [id, provider] of this.providers.entries()) {
      try {
        report[id] = await provider.health();
      } catch (err: any) {
        report[id] = {
          status: "unavailable",
          message: err?.message || "Health check failed",
          lastChecked: new Date().toISOString(),
        };
      }
    }
    return report;
  }

  addCustomProvider(name: string, registryUrl: string, authEnv?: string): ProviderMetadata {
    const id = name.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    const metadata: ProviderMetadata = {
      id,
      name,
      type: "custom",
      description: `Custom registry at ${registryUrl}`,
      homepage: registryUrl,
      registryUrl,
      namespace: `@${id}`,
      trustLevel: "community",
      capabilities: {
        search: true,
        list: true,
        inspect: true,
        install: true,
        preview: false,
        auth: !!authEnv,
      },
      authRequired: !!authEnv,
      authEnvVar: authEnv,
      componentCount: 0,
      variants: [],
      prerequisites: [],
    };

    this.register(new CustomRegistryProvider(metadata));
    return metadata;
  }
}

export const providerManager = new ProviderManager();
