import { z } from "zod";

// ==========================================
// 1. Universal Component Schema
// ==========================================

export const ComponentTypeSchema = z.enum([
  "component",
  "block",
  "template",
  "hook",
  "pattern",
  "theme",
  "primitive",
  "snippet",
]);
export type ComponentType = z.infer<typeof ComponentTypeSchema>;

export const QualityScoreBreakdownSchema = z.object({
  compatibility: z.number().min(0).max(20).default(20),
  codeQuality: z.number().min(0).max(15).default(15),
  accessibility: z.number().min(0).max(15).default(15),
  maintenance: z.number().min(0).max(10).default(10),
  documentation: z.number().min(0).max(10).default(10),
  performance: z.number().min(0).max(10).default(10),
  dependencyHealth: z.number().min(0).max(10).default(10),
  popularity: z.number().min(0).max(5).default(5),
  previewQuality: z.number().min(0).max(5).default(5),
  reasons: z.array(z.string()).default([]),
  deductions: z.array(z.string()).default([]),
});
export type QualityScoreBreakdown = z.infer<typeof QualityScoreBreakdownSchema>;

export const QualityScoreSchema = z.object({
  overall: z.number().min(0).max(100),
  breakdown: QualityScoreBreakdownSchema,
});
export type QualityScore = z.infer<typeof QualityScoreSchema>;

export const DependencySchema = z.object({
  name: z.string(),
  version: z.string().optional(),
  isDev: z.boolean().default(false),
  peer: z.boolean().default(false),
});
export type Dependency = z.infer<typeof DependencySchema>;

export const FrameworkSupportSchema = z.object({
  react: z.string().default("^18 || ^19"),
  nextjs: z.boolean().default(true),
  vite: z.boolean().default(true),
  remix: z.boolean().default(true),
  rsc: z.boolean().default(true),
  tailwind: z.enum(["3", "4", "any", "none"]).default("any"),
  primitives: z.array(z.string()).default([]),
  motion: z.enum(["motion", "framer-motion", "none"]).default("none"),
});
export type FrameworkSupport = z.infer<typeof FrameworkSupportSchema>;

export const AuthRequirementSchema = z.object({
  required: z.boolean().default(false),
  type: z.enum(["api-key", "license-key", "token", "oauth", "none"]).default("none"),
  envVar: z.string().optional(),
  promptUrl: z.string().optional(),
  description: z.string().optional(),
});
export type AuthRequirement = z.infer<typeof AuthRequirementSchema>;

export const ComponentFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: z.string().optional(),
  target: z.string().optional(),
});
export type ComponentFile = z.infer<typeof ComponentFileSchema>;

export const ProvenanceSchema = z.object({
  provider: z.string(),
  sourceUrl: z.string().optional(),
  registryUrl: z.string().optional(),
  repository: z.string().optional(),
  license: z.string().default("MIT"),
  publishedAt: z.string().optional(),
});
export type Provenance = z.infer<typeof ProvenanceSchema>;

export const UIShelfComponentSchema = z.object({
  id: z.string(), // e.g. "@magic-ui/magic-card" or "mui:Button"
  providerId: z.string(), // e.g. "magic-ui"
  providerItemId: z.string(), // e.g. "magic-card"
  name: z.string(),
  title: z.string(),
  description: z.string(),
  type: ComponentTypeSchema.default("component"),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  preview: z
    .object({
      image: z.string().optional(),
      video: z.string().optional(),
      demoUrl: z.string().optional(),
    })
    .optional(),
  source: z.object({
    homepage: z.string().optional(),
    registryUrl: z.string().optional(),
    repository: z.string().optional(),
  }),
  install: z.object({
    mode: z.enum(["shadcn", "registry-url", "cli", "npm", "manual"]),
    command: z.string().optional(),
    packageName: z.string().optional(),
  }),
  dependencies: z.array(DependencySchema).default([]),
  registryDependencies: z.array(z.string()).default([]),
  frameworkSupport: FrameworkSupportSchema,
  quality: QualityScoreSchema,
  auth: AuthRequirementSchema,
  license: z.string().default("MIT"),
  provenance: ProvenanceSchema,
  files: z.array(ComponentFileSchema).default([]),
  variant: z.string().optional(), // for providers with variants like ruixen: radix-tw4, etc.
});
export type UIShelfComponent = z.infer<typeof UIShelfComponentSchema>;

// ==========================================
// 2. Provider Schema
// ==========================================

export const TrustLevelSchema = z.enum([
  "official",
  "verified",
  "community",
  "unverified",
  "blocked",
]);
export type TrustLevel = z.infer<typeof TrustLevelSchema>;

export const ProviderTypeSchema = z.enum([
  "shadcn-registry",
  "package-library",
  "cli",
  "npm",
  "github",
  "custom",
]);
export type ProviderType = z.infer<typeof ProviderTypeSchema>;

export const ProviderCapabilitiesSchema = z.object({
  search: z.boolean().default(true),
  list: z.boolean().default(true),
  inspect: z.boolean().default(true),
  install: z.boolean().default(true),
  preview: z.boolean().default(false),
  auth: z.boolean().default(false),
});
export type ProviderCapabilities = z.infer<typeof ProviderCapabilitiesSchema>;

export const ProviderHealthSchema = z.object({
  status: z.enum(["healthy", "degraded", "unavailable", "auth-required"]),
  latencyMs: z.number().optional(),
  message: z.string().optional(),
  lastChecked: z.string(),
});
export type ProviderHealth = z.infer<typeof ProviderHealthSchema>;

export const ProviderMetadataSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: ProviderTypeSchema,
  description: z.string(),
  homepage: z.string(),
  documentation: z.string().optional(),
  repository: z.string().optional(),
  registryUrl: z.string().optional(),
  namespace: z.string().optional(),
  trustLevel: TrustLevelSchema.default("community"),
  capabilities: ProviderCapabilitiesSchema,
  authRequired: z.boolean().default(false),
  authEnvVar: z.string().optional(),
  componentCount: z.number().default(0),
  variants: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
});
export type ProviderMetadata = z.infer<typeof ProviderMetadataSchema>;

// ==========================================
// 3. Project Context Schema
// ==========================================

export const ProjectContextSchema = z.object({
  rootDir: z.string(),
  workspaceDir: z.string(),
  isMonorepo: z.boolean().default(false),
  packageManager: z.enum(["pnpm", "npm", "yarn", "bun"]).default("npm"),
  framework: z.enum([
    "next",
    "vite",
    "remix",
    "react-router",
    "astro",
    "cra",
    "other",
  ]),
  frameworkVersion: z.string().nullable().default(null),
  reactVersion: z.string().nullable().default(null),
  tailwindVersion: z.enum(["3", "4"]).nullable().default(null),
  hasShadcn: z.boolean().default(false),
  shadcnConfigPath: z.string().nullable().default(null),
  stylingPrimitives: z.array(z.string()).default([]), // e.g. 'radix', 'base-ui'
  motionEngine: z.enum(["framer-motion", "motion"]).nullable().default(null),
  typescript: z.boolean().default(true),
  rsc: z.boolean().default(true),
  aliases: z.record(z.string()).default({}),
  componentsDir: z.string().default("components/ui"),
  existingComponents: z.array(z.string()).default([]),
  installedDependencies: z.record(z.string()).default({}),
});
export type ProjectContext = z.infer<typeof ProjectContextSchema>;

// ==========================================
// 4. Install Plan & Execution Schema
// ==========================================

export const PlannedFileSchema = z.object({
  path: z.string(), // relative to workspaceDir
  content: z.string(),
  action: z.enum(["create", "update", "conflict", "skip"]),
  existingContent: z.string().optional(),
  sourceHash: z.string(),
});
export type PlannedFile = z.infer<typeof PlannedFileSchema>;

export const ComponentConflictSchema = z.object({
  type: z.enum([
    "file-exists",
    "duplicate-component",
    "dependency-mismatch",
    "framework-mismatch",
  ]),
  message: z.string(),
  filePath: z.string().optional(),
  resolution: z.enum(["reuse", "overwrite", "install-elsewhere", "cancel"]).optional(),
});
export type ComponentConflict = z.infer<typeof ComponentConflictSchema>;

export const InstallPlanSchema = z.object({
  component: UIShelfComponentSchema,
  provider: ProviderMetadataSchema,
  files: z.array(PlannedFileSchema),
  npmPackages: z.array(DependencySchema),
  registryDependencies: z.array(z.string()),
  conflicts: z.array(ComponentConflictSchema),
  prerequisites: z.array(z.string()),
  authRequired: z.boolean().default(false),
  authEnvVar: z.string().optional(),
  authSatisfied: z.boolean().default(true),
  dryRun: z.boolean().default(false),
  canonicalCommand: z.string(),
  upstreamCommand: z.string(),
});
export type InstallPlan = z.infer<typeof InstallPlanSchema>;

export const InstallResultSchema = z.object({
  success: z.boolean(),
  componentId: z.string(),
  installedFiles: z.array(z.string()),
  installedPackages: z.array(z.string()),
  installedRegistryDependencies: z.array(z.string()),
  lockfileUpdated: z.boolean(),
  warnings: z.array(z.string()).default([]),
  error: z.string().optional(),
});
export type InstallResult = z.infer<typeof InstallResultSchema>;

// ==========================================
// 5. Lockfile Schema (uishelf.lock)
// ==========================================

export const InstalledComponentRecordSchema = z.object({
  id: z.string(),
  provider: z.string(),
  providerItemId: z.string(),
  title: z.string(),
  version: z.string().optional(),
  sourceHash: z.string(),
  installedAt: z.string(),
  sourceUrl: z.string().optional(),
  license: z.string().default("MIT"),
  dependencies: z.record(z.string()).default({}),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(
    z.object({
      path: z.string(),
      hash: z.string(),
    })
  ),
});
export type InstalledComponentRecord = z.infer<typeof InstalledComponentRecordSchema>;

export const UIShelfLockfileSchema = z.object({
  version: z.literal(1),
  createdAt: z.string(),
  updatedAt: z.string(),
  components: z.record(InstalledComponentRecordSchema).default({}),
});
export type UIShelfLockfile = z.infer<typeof UIShelfLockfileSchema>;

// ==========================================
// 6. Config Schema (uishelf.json & global)
// ==========================================

export const UIShelfConfigSchema = z.object({
  $schema: z.string().optional(),
  providers: z
    .object({
      mode: z.enum(["all", "allowlist", "denylist"]).default("all"),
      include: z.array(z.string()).default([]),
      exclude: z.array(z.string()).default([]),
      custom: z
        .record(
          z.object({
            name: z.string(),
            registry: z.string(),
            authEnv: z.string().optional(),
          })
        )
        .default({}),
    })
    .default({
      mode: "all",
      include: [],
      exclude: [],
      custom: {},
    }),
  preferences: z
    .object({
      minScore: z.number().min(0).max(100).default(0),
      preferMotion: z.boolean().default(true),
      preferTypeScript: z.boolean().default(true),
      preferRSC: z.boolean().default(true),
      preferAccessible: z.boolean().default(true),
      packageManager: z.enum(["pnpm", "npm", "yarn", "bun"]).optional(),
      componentsDir: z.string().default("components/ui"),
    })
    .default({
      minScore: 0,
      preferMotion: true,
      preferTypeScript: true,
      preferRSC: true,
      preferAccessible: true,
      componentsDir: "components/ui",
    }),
  stack: z.array(z.string()).default([]), // stack presets e.g. ["magic-ui", "react-bits"]
  telemetry: z.boolean().default(false),
  securityLevel: z.enum(["strict", "standard", "lenient"]).default("standard"),
});
export type UIShelfConfig = z.infer<typeof UIShelfConfigSchema>;

// ==========================================
// 7. Search & Discovery Schema
// ==========================================

export const SearchQuerySchema = z.object({
  query: z.string(),
  providers: z.array(z.string()).optional(),
  excludeProviders: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  framework: z.string().optional(),
  tailwind: z.enum(["3", "4"]).optional(),
  motion: z.boolean().optional(),
  authRequired: z.boolean().optional(),
  minScore: z.number().optional(),
  limit: z.number().default(20),
  offset: z.number().default(0),
});
export type SearchQuery = z.infer<typeof SearchQuerySchema>;

export const SearchResultItemSchema = z.object({
  component: UIShelfComponentSchema,
  score: z.number(),
  scoreBreakdown: QualityScoreBreakdownSchema,
  highlights: z.array(z.string()).default([]),
  compatibilityMatches: z.array(z.string()).default([]),
  compatibilityWarnings: z.array(z.string()).default([]),
});
export type SearchResultItem = z.infer<typeof SearchResultItemSchema>;

export const SearchResponseSchema = z.object({
  query: z.string(),
  total: z.number(),
  items: z.array(SearchResultItemSchema),
  tookMs: z.number(),
});
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
