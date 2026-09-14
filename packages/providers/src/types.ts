import {
  type UIShelfComponent,
  type ProviderMetadata,
  type ProviderHealth,
  type ProjectContext,
  type InstallPlan,
  type SearchQuery,
  type InstallResult,
} from "@uishelf/schema";

export interface UIShelfProvider {
  id: string;
  name: string;
  type: "shadcn-registry" | "package-library" | "cli" | "npm" | "github" | "custom";
  capabilities: {
    search: boolean;
    list: boolean;
    inspect: boolean;
    install: boolean;
    preview: boolean;
    auth: boolean;
  };
  discover(): Promise<ProviderMetadata>;
  search(query: SearchQuery): Promise<UIShelfComponent[]>;
  list(): Promise<UIShelfComponent[]>;
  get(id: string): Promise<UIShelfComponent | null>;
  getInstallPlan(id: string, context: ProjectContext): Promise<InstallPlan | null>;
  install?(id: string, context: { project: ProjectContext; credential?: string }): Promise<InstallResult>;
  health(): Promise<ProviderHealth>;
}
