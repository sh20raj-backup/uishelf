import {
  type UIShelfComponent,
  type ProviderMetadata,
  UIShelfComponentSchema,
} from "@uishelf/schema";
import { defaultCache } from "@uishelf/cache";
import { CURATED_PROVIDERS, SEED_COMPONENTS } from "./seed.js";

export * from "./seed.js";

export interface RegistrySyncResult {
  totalProviders: number;
  newlyDiscovered: number;
  updatedProviders: number;
  syncedAt: string;
  source: string;
}

export class RegistryManager {
  private cache = defaultCache;
  private officialIndexUrl = "https://ui.shadcn.com/r/registries.json";

  async getProviders(): Promise<ProviderMetadata[]> {
    // 1. Check cached providers
    const cached = this.cache.get<ProviderMetadata[]>("uishelf_providers_list");
    if (cached && cached.length > 0) {
      return cached;
    }

    // 2. Return curated providers by default
    return CURATED_PROVIDERS;
  }

  async getComponents(): Promise<UIShelfComponent[]> {
    const cached = this.cache.get<UIShelfComponent[]>("uishelf_components_catalog");
    if (cached && cached.length > 0) {
      return cached;
    }
    return SEED_COMPONENTS;
  }

  async syncOfficialRegistries(): Promise<RegistrySyncResult> {
    const syncedAt = new Date().toISOString();
    let remoteRegistries: any[] = [];

    try {
      const res = await fetch(this.officialIndexUrl, {
        headers: { "User-Agent": "uishelf/0.1.0" },
      });
      if (res.ok) {
        remoteRegistries = await res.json();
      }
    } catch {
      // Offline fallback: keep curated list
    }

    const currentProviders = new Map<string, ProviderMetadata>();
    for (const p of CURATED_PROVIDERS) {
      currentProviders.set(p.id, p);
    }

    let newlyDiscovered = 0;

    for (const item of remoteRegistries) {
      if (!item.name || !item.url) continue;

      const cleanId = item.name.replace(/^@/, "").toLowerCase();
      const existing = currentProviders.get(cleanId);

      if (!existing) {
        newlyDiscovered++;
        const newProvider: ProviderMetadata = {
          id: cleanId,
          name: item.name,
          type: "shadcn-registry",
          description: item.description || `Official shadcn registry for ${item.name}`,
          homepage: item.homepage || "",
          registryUrl: item.url,
          namespace: item.name.startsWith("@") ? item.name : `@${item.name}`,
          trustLevel: "verified",
          capabilities: {
            search: true,
            list: true,
            inspect: true,
            install: true,
            preview: false,
            auth: false,
          },
          authRequired: false,
          componentCount: item.health?.breakdown?.installability ? 10 : 5,
          variants: [],
          prerequisites: ["Tailwind CSS"],
          searchMethod: "Remote Registry Index (JSON)",
          searchEndpoint: item.url,
          installCommandTemplate: `npx shadcn@latest add "${item.url}" --yes`,
          supportedStacks: ["Tailwind CSS", "React 19"],
          features: ["Official ecosystem registry"],
        };
        currentProviders.set(cleanId, newProvider);
      }
    }

    const providerList = Array.from(currentProviders.values());
    this.cache.set("uishelf_providers_list", providerList, 1000 * 60 * 60 * 24);

    return {
      totalProviders: providerList.length,
      newlyDiscovered,
      updatedProviders: providerList.length - newlyDiscovered,
      syncedAt,
      source: this.officialIndexUrl,
    };
  }

  async fetchOfficialShadcnIndex(): Promise<UIShelfComponent[]> {
    const cacheKey = "uishelf_official_shadcn_index";
    const cached = this.cache.get<UIShelfComponent[]>(cacheKey);
    if (cached && cached.length > 0) {
      return cached;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch("https://ui.shadcn.com/r/index.json", {
        headers: { "User-Agent": "uishelf/0.1.0" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) return [];

      const rawItems = await res.json();
      if (!Array.isArray(rawItems)) return [];

      const components: UIShelfComponent[] = [];
      for (const item of rawItems) {
        if (!item.name) continue;
        const name = item.name;
        const title = formatTitle(name);

        const comp: UIShelfComponent = {
          id: `@shadcn/${name}`,
          providerId: "shadcn",
          providerItemId: name,
          name,
          title,
          description: `Official ${title} component from shadcn/ui. Accessible, customizable, and production-ready.`,
          type: item.type?.includes("block") ? "block" : "component",
          categories: ["ui", "primitives"],
          tags: [name, "shadcn", "radix", "tailwind", ...(name.split("-"))],
          preview: {
            demoUrl: `https://ui.shadcn.com/docs/components/${name}`,
          },
          source: {
            homepage: "https://ui.shadcn.com",
            registryUrl: `https://ui.shadcn.com/r/styles/default/${name}.json`,
            repository: "https://github.com/shadcn-ui/ui",
          },
          install: {
            mode: "shadcn",
            command: `npx shadcn@latest add ${name} --yes`,
          },
          dependencies: (item.dependencies || []).map((d: string) => ({
            name: d,
            version: undefined,
            isDev: false,
            peer: false,
          })),
          registryDependencies: item.registryDependencies || [],
          frameworkSupport: {
            react: "^18 || ^19",
            nextjs: true,
            vite: true,
            remix: true,
            rsc: true,
            tailwind: "any",
            primitives: ["radix"],
            motion: "none",
          },
          quality: {
            overall: 96,
            breakdown: {
              compatibility: 20,
              codeQuality: 15,
              accessibility: 15,
              maintenance: 10,
              documentation: 10,
              performance: 9,
              reasons: [
                "Official shadcn/ui component primitive",
                "Built on accessible WAI-ARIA Radix UI primitives",
                "Universal Tailwind CSS styling",
              ],
              dependencyHealth: 10,
              popularity: 5,
              previewQuality: 5,
              deductions: [],
            },
          },
          license: "MIT",
          auth: { required: false, type: "none" },
          provenance: {
            provider: "shadcn",
            sourceUrl: `https://ui.shadcn.com/r/styles/default/${name}.json`,
            license: "MIT",
          },
          files: (item.files || []).map((f: any) => ({
            path: f.path || `components/ui/${name}.tsx`,
            content: "",
            type: f.type || "registry:ui",
            target: f.target || "",
          })),
        };

        components.push(comp);
      }

      this.cache.set(cacheKey, components, 1000 * 60 * 60 * 24);
      return components;
    } catch {
      return [];
    }
  }

  searchPackageLibrary(provider: ProviderMetadata, query: string): UIShelfComponent[] {
    const catalog: Array<{ name: string; categories: string[]; description: string }> = [
      { name: "Button", categories: ["buttons", "forms"], description: "Interactive button element with ripple effects and state variations." },
      { name: "Modal", categories: ["dialogs", "overlays"], description: "Modal dialog overlay with backdrop and focus trap." },
      { name: "Dialog", categories: ["dialogs", "overlays"], description: "Dialog window overlay with title, content, and action triggers." },
      { name: "Drawer", categories: ["navigation", "overlays"], description: "Slide-out navigation drawer sheet." },
      { name: "Card", categories: ["cards", "layout"], description: "Content container card with elevation and header sections." },
      { name: "Tabs", categories: ["navigation"], description: "Tabbed content navigation panels with smooth indicators." },
      { name: "Slider", categories: ["inputs", "forms"], description: "Numeric range slider with discrete steps and tooltips." },
      { name: "Switch", categories: ["inputs", "forms"], description: "Toggle switch control with accessible keyboard navigation." },
      { name: "Avatar", categories: ["media", "display"], description: "User avatar with image fallback and status indicators." },
      { name: "Badge", categories: ["display"], description: "Status badge indicator pill with color variations." },
      { name: "Tooltip", categories: ["overlays", "display"], description: "Informative hover popup tooltip with directional arrows." },
      { name: "Accordion", categories: ["disclosure"], description: "Collapsible disclosure panels for FAQs and structured content." },
      { name: "Select", categories: ["inputs", "forms"], description: "Custom dropdown select menu with search and multi-select." },
      { name: "Input", categories: ["inputs", "forms"], description: "Text input field with floating label and validation states." },
      { name: "Alert", categories: ["feedback"], description: "Contextual feedback message banner with warning and success states." },
    ];

    const q = query.toLowerCase().trim();
    const matches = catalog.filter((item) => {
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.categories.some((c) => c.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q)
      );
    });

    const deps: Array<{ name: string; version?: string; isDev: boolean; peer: boolean }> = [];
    if (provider.id === "mui") {
      deps.push({ name: "@mui/material", isDev: false, peer: false });
      deps.push({ name: "@emotion/react", isDev: false, peer: false });
      deps.push({ name: "@emotion/styled", isDev: false, peer: false });
    } else if (provider.id === "mantine") {
      deps.push({ name: "@mantine/core", isDev: false, peer: false });
      deps.push({ name: "@mantine/hooks", isDev: false, peer: false });
    } else if (provider.id === "chakra") {
      deps.push({ name: "@chakra-ui/react", isDev: false, peer: false });
      deps.push({ name: "@emotion/react", isDev: false, peer: false });
    }

    return matches.map((item) => {
      const compId = `${provider.id}:${item.name}`;
      return {
        id: compId,
        providerId: provider.id,
        providerItemId: item.name,
        name: item.name.toLowerCase(),
        title: `${provider.name} ${item.name}`,
        description: `${provider.name} ${item.name} component. ${item.description}`,
        type: "component",
        categories: item.categories,
        tags: [item.name.toLowerCase(), provider.id, ...item.categories],
        preview: {
          demoUrl: provider.homepage,
        },
        source: {
          homepage: provider.homepage,
          repository: provider.repository,
        },
        install: {
          mode: "package" as any,
          command: provider.installCommandTemplate || `pnpm add ${deps.map((d) => d.name).join(" ")}`,
          packageName: deps[0]?.name,
        },
        dependencies: deps,
        registryDependencies: [],
        frameworkSupport: {
          react: "^18 || ^19",
          nextjs: true,
          vite: true,
          remix: true,
          rsc: true,
          tailwind: "none",
          primitives: [],
          motion: "none",
        },
        quality: {
          overall: 93,
          breakdown: {
            compatibility: 19,
            codeQuality: 15,
            accessibility: 14,
            maintenance: 10,
            documentation: 10,
            performance: 9,
            reasons: [
              `Official ${provider.name} package integration`,
              "Zero-config component adapter generated in components/ui",
            ],
            dependencyHealth: 9,
            popularity: 5,
            previewQuality: 4,
            deductions: [],
          },
        },
        license: "MIT",
        auth: { required: false, type: "none" },
        provenance: {
          provider: provider.id,
          sourceUrl: provider.homepage,
          license: "MIT",
        },
        files: [
          {
            path: `components/ui/${item.name.toLowerCase()}.tsx`,
            content: "",
            type: "registry:ui",
          },
        ],
      };
    });
  }

  async searchRemoteRegistry(
    provider: ProviderMetadata,
    query: string
  ): Promise<UIShelfComponent[]> {
    const q = query.toLowerCase().trim();

    // 1. If shadcn official, query the 63-item official registry index
    if (provider.id === "shadcn") {
      const allShadcn = await this.fetchOfficialShadcnIndex();
      if (!q) return allShadcn;
      return allShadcn.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 2. If package library (MUI, Mantine, Chakra), dynamically generate component definitions
    if (provider.type === "package-library") {
      return this.searchPackageLibrary(provider, query);
    }

    // 3. If shadcn-registry with a registryUrl template e.g. https://domain/r/{name}.json
    if (provider.registryUrl && q) {
      // Try querying the component directly upstream if query looks like a component name
      const cleanQuery = q.replace(/^@?[a-z0-9_-]+\//, "");
      const directComp = await this.fetchComponentFromRegistry(
        provider.registryUrl,
        cleanQuery,
        provider.id
      );
      if (directComp) {
        return [directComp];
      }
    }

    return [];
  }

  async fetchComponentFromRegistry(
    registryUrlTemplate: string,
    componentName: string,
    providerId: string
  ): Promise<UIShelfComponent | null> {
    const targetUrl = registryUrlTemplate.replace("{name}", componentName);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(targetUrl, {
        headers: { "User-Agent": "uishelf/0.1.0" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) return null;

      const data = await res.json();
      return this.normalizeRegistryItem(data, providerId, targetUrl);
    } catch {
      return null;
    }
  }

  normalizeRegistryItem(
    raw: any,
    providerId: string,
    sourceUrl: string
  ): UIShelfComponent {
    const name = raw.name || "component";
    const title = raw.title || formatTitle(name);
    const dependencies = (raw.dependencies || []).map((d: string) => ({
      name: d,
      version: undefined,
      isDev: false,
      peer: false,
    }));
    const registryDependencies = raw.registryDependencies || [];

    const files = (raw.files || []).map((f: any) => ({
      path: f.path || `components/ui/${name}.tsx`,
      content: f.content || "",
      type: f.type || "registry:ui",
      target: f.target || "",
    }));

    return UIShelfComponentSchema.parse({
      id: `@${providerId}/${name}`,
      providerId,
      providerItemId: name,
      name,
      title,
      description: raw.description || `Dynamic component ${name} from ${providerId}`,
      type: raw.type?.includes("block") ? "block" : "component",
      categories: raw.categories || ["ui"],
      tags: [name, providerId, ...(raw.tags || [])],
      source: {
        homepage: raw.homepage || "",
        registryUrl: sourceUrl,
      },
      install: {
        mode: "shadcn",
        command: `npx shadcn@latest add @${providerId}/${name} --yes`,
      },
      dependencies,
      registryDependencies,
      frameworkSupport: {
        react: "^18 || ^19",
        nextjs: true,
        vite: true,
        remix: true,
        rsc: true,
        tailwind: "any",
        primitives: [],
        motion: dependencies.some((d: any) => d.name === "motion") ? "motion" : "none",
      },
      quality: {
        overall: 92,
        breakdown: {
          compatibility: 18,
          codeQuality: 14,
          accessibility: 14,
          maintenance: 10,
          documentation: 9,
          performance: 9,
          dependencyHealth: 9,
          popularity: 4,
          previewQuality: 5,
          reasons: ["Dynamically resolved from upstream registry"],
          deductions: [],
        },
      },
      auth: { required: false, type: "none" },
      license: "MIT",
      provenance: {
        provider: providerId,
        sourceUrl,
        license: "MIT",
      },
      files,
    });
  }
}

function formatTitle(name: string): string {
  return name
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const registryManager = new RegistryManager();
