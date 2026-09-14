import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { UIShelfCore, providerManager, registryManager } from "@uishelf/core";

export async function createMcpServer(cwd: string = process.cwd()) {
  const core = new UIShelfCore({ cwd });

  const server = new Server(
    {
      name: "uishelf",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  // 1. List Tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "search_components",
          description: "Search React UI components across 340+ registries with project compatibility scoring",
          inputSchema: {
            type: "object",
            properties: {
              query: { type: "string", description: "Search query e.g. 'pricing', 'hero', 'carousel'" },
              provider: { type: "string", description: "Optional provider ID filter e.g. 'magic-ui', 'aceternity'" },
              framework: { type: "string", description: "Optional framework filter e.g. 'next', 'vite'" },
              minScore: { type: "number", description: "Minimum UIShelf score (0-100)" },
            },
            required: ["query"],
          },
        },
        {
          name: "inspect_component",
          description: "Get detailed metadata, quality score breakdown, source code, and dependencies of a component",
          inputSchema: {
            type: "object",
            properties: {
              componentId: { type: "string", description: "Component ID e.g. '@magic-ui/magic-card' or 'mui:Button'" },
            },
            required: ["componentId"],
          },
        },
        {
          name: "get_install_plan",
          description: "Calculate a non-destructive install plan for a component before writing files",
          inputSchema: {
            type: "object",
            properties: {
              componentId: { type: "string", description: "Component ID" },
            },
            required: ["componentId"],
          },
        },
        {
          name: "install_component",
          description: "Safely install a component, write files, install dependencies, and update uishelf.lock",
          inputSchema: {
            type: "object",
            properties: {
              componentId: { type: "string", description: "Component ID" },
              dryRun: { type: "boolean", description: "Simulate installation without writing to disk" },
              apiKey: { type: "string", description: "Optional API key for authenticated providers" },
            },
            required: ["componentId"],
          },
        },
        {
          name: "remove_component",
          description: "Remove an installed component and clean up files and lockfile",
          inputSchema: {
            type: "object",
            properties: {
              componentId: { type: "string", description: "Component ID" },
            },
            required: ["componentId"],
          },
        },
        {
          name: "list_installed_components",
          description: "List all components installed via UIShelf recorded in uishelf.lock",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "list_providers",
          description: "List all active UI registry providers, types, and health states",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "detect_project",
          description: "Diagnose project framework (Next.js, Vite), React version, Tailwind v3/v4, primitives, and motion engines",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "doctor",
          description: "Run comprehensive diagnostic on project stack, dependencies, and provider health",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "compare_components",
          description: "Compare multiple components or providers side by side",
          inputSchema: {
            type: "object",
            properties: {
              componentIds: {
                type: "array",
                items: { type: "string" },
                description: "List of component IDs to compare",
              },
            },
            required: ["componentIds"],
          },
        },
      ],
    };
  });

  // 2. Call Tool Handlers
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;

    switch (name) {
      case "search_components": {
        const query = String(args.query || "");
        const provider = args.provider ? [String(args.provider)] : undefined;
        const framework = args.framework ? String(args.framework) : undefined;
        const minScore = typeof args.minScore === "number" ? args.minScore : undefined;

        const results = await core.search({
          query,
          providers: provider,
          framework,
          minScore,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      case "inspect_component": {
        const componentId = String(args.componentId || "");
        const comp = await core.getComponent(componentId);
        if (!comp) {
          return {
            isError: true,
            content: [{ type: "text", text: `Component '${componentId}' not found.` }],
          };
        }
        const plan = await core.plan(comp.id);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ component: comp, plan }, null, 2),
            },
          ],
        };
      }

      case "get_install_plan": {
        const componentId = String(args.componentId || "");
        const plan = await core.plan(componentId, { dryRun: true });
        if (!plan) {
          return {
            isError: true,
            content: [{ type: "text", text: `Could not calculate install plan for '${componentId}'` }],
          };
        }
        return {
          content: [{ type: "text", text: JSON.stringify(plan, null, 2) }],
        };
      }

      case "install_component": {
        const componentId = String(args.componentId || "");
        const dryRun = !!args.dryRun;
        const apiKey = args.apiKey ? String(args.apiKey) : undefined;

        const result = await core.install(componentId, { dryRun, apiKey });
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "remove_component": {
        const componentId = String(args.componentId || "");
        const result = core.remove(componentId);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "list_installed_components": {
        const items = core.listInstalled();
        return {
          content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
        };
      }

      case "list_providers": {
        const providers = await providerManager.list();
        const metadatas = await Promise.all(providers.map((p) => p.discover()));
        return {
          content: [{ type: "text", text: JSON.stringify(metadatas, null, 2) }],
        };
      }

      case "detect_project": {
        const project = core.getProjectContext();
        return {
          content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
        };
      }

      case "doctor": {
        const report = await core.runDoctor();
        return {
          content: [{ type: "text", text: JSON.stringify(report, null, 2) }],
        };
      }

      case "compare_components": {
        const ids = Array.isArray(args.componentIds) ? args.componentIds : [];
        const components: any[] = [];
        for (const id of ids) {
          const comp = await core.getComponent(String(id));
          if (comp) components.push(comp);
        }
        return {
          content: [{ type: "text", text: JSON.stringify(components, null, 2) }],
        };
      }

      default:
        return {
          isError: true,
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
        };
    }
  });

  // 3. Resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "uishelf://project",
          name: "Project Stack & Context",
          mimeType: "application/json",
          description: "Detected project framework, React version, Tailwind, and dependencies",
        },
        {
          uri: "uishelf://providers",
          name: "Active Providers",
          mimeType: "application/json",
          description: "List of all active and discovered UI registry providers",
        },
        {
          uri: "uishelf://installed",
          name: "Installed Components",
          mimeType: "application/json",
          description: "Components installed in the current project from uishelf.lock",
        },
      ],
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    if (uri === "uishelf://project") {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(core.getProjectContext(), null, 2),
          },
        ],
      };
    }
    if (uri === "uishelf://providers") {
      const providers = await registryManager.getProviders();
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(providers, null, 2),
          },
        ],
      };
    }
    if (uri === "uishelf://installed") {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(core.listInstalled(), null, 2),
          },
        ],
      };
    }

    throw new Error(`Resource not found: ${uri}`);
  });

  return { server, transport: new StdioServerTransport() };
}

export async function runMcpServer(cwd: string = process.cwd()) {
  const { server, transport } = await createMcpServer(cwd);
  await server.connect(transport);
}
