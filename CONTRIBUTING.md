# Contributing to UIShelf

Thank you for your interest in contributing to **UIShelf**!  
UIShelf is the universal resolution layer between developers and the React UI ecosystem — helping developers search, inspect compatibility, resolve dependencies, and safely install components across 340+ registries, copy-paste libraries, and UI packages.

This document outlines how to set up the development environment, our architectural guidelines, and the pull request process.

---

## 🧭 Core Architectural Principles

Before writing code, please keep these non-negotiable principles in mind:

1. **UIShelf is NOT another UI component library**:
   We don't maintain button styles or design tokens. We build discovery, compatibility resolution, static security checks, transactional installation, and AI agent interoperability (MCP).
2. **Single Source of Truth**:
   All business logic lives in `@uishelf/core`. The Web application (`apps/web`), the terminal CLI (`uishelf`), and the MCP server (`@uishelf/mcp`) must only invoke `@uishelf/core` and NEVER re-implement business logic.
3. **Zero-API-Key Public Search**:
   Searching and installing public registries must never require credentials, sign-ups, or remote third-party API dependencies. Credentials are only requested on-demand when a developer explicitly accesses a paid or authenticated provider.
4. **Safety & Transactional Integrity**:
   Installations must never break a developer's repository. Rollback mechanisms, AST scans against dangerous code (`eval`, `child_process`), and cryptographic `uishelf.lock` hash tracking are mandatory.

---

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **pnpm**: `v9.0.0` or higher (`corepack enable pnpm`)
- **Git**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SH20RAJ/uishelf.git
cd uishelf

# 2. Install monorepo dependencies
pnpm install

# 3. Build all internal packages
pnpm build

# 4. Run automated test suite
pnpm test
```

### Running Locally

```bash
# Start Next.js web application (http://localhost:3000)
pnpm dev

# Run CLI commands directly via node
pnpm cli search button
pnpm cli doctor

# Link the CLI globally to test 'uishelf' in your terminal
cd packages/cli && npm link
uishelf --help
```

---

## 📁 Repository Structure

```text
uishelf/
├── apps/
│   └── web/            # Next.js 15 App Router web platform
├── packages/
│   ├── cache/          # Memory & filesystem cache with TTL
│   ├── cli/            # Interactive commander CLI ('uishelf')
│   ├── config/         # uishelf.json project & global configuration
│   ├── core/           # Central programmatic engine
│   ├── credentials/    # Multi-tier credential store & secret redaction
│   ├── installer/      # Transactional planner, dry-run & backup rollback
│   ├── mcp/            # Stdio Model Context Protocol server
│   ├── project/        # Framework & stack detection (React 18/19, TW v3/v4)
│   ├── providers/      # Pluggable registry & package provider adapters
│   ├── ranking/        # Transparent 9-factor quality scoring algorithm
│   ├── registry/       # Official shadcn registry synchronizer & seed catalog
│   ├── resolver/       # Dependency & conflict resolution, Ruixen multi-variant
│   ├── schema/         # Canonical Zod schemas & TypeScript types
│   ├── search/         # Zero-API-key BM25 + fuzzy hybrid search engine
│   └── security/       # AST safety validator & SHA-256 integrity checker
└── tests/              # Vitest test suites
```

---

## 🔌 Adding a New Provider Adapter

To integrate a new UI library or registry:

1. Navigate to `packages/providers/src/adapters/`.
2. Implement the `UIShelfProvider` interface defined in `@uishelf/schema`:
   ```ts
   export class MyCustomProvider implements UIShelfProvider {
     readonly metadata: ProviderMetadata = {
       id: "my-provider",
       name: "My Provider",
       type: "shadcn-registry",
       description: "...",
       homepage: "https://...",
       documentation: "https://...",
       repository: "https://...",
       trustLevel: "community",
       capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
       authRequired: false,
       variants: [],
       prerequisites: ["Tailwind CSS"],
     };

     async search(query: SearchQuery): Promise<UIShelfComponent[]> { ... }
     async getComponent(id: string): Promise<UIShelfComponent | null> { ... }
     async getInstallPlan(request: InstallPlanRequest): Promise<InstallPlan> { ... }
     async healthCheck(): Promise<ProviderHealth> { ... }
   }
   ```
3. Register your adapter in `packages/providers/src/index.ts`.
4. Add unit test coverage in `tests/core.test.ts`.

---

## 🧪 Testing & Validation

Before submitting any code, verify all checks pass:

```bash
# Type check all packages
pnpm typecheck

# Run test suite
pnpm test

# Build all packages
pnpm build
```

---

## 📝 Commit Convention

We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature (e.g. `feat(providers): add cult-ui adapter`)
- `fix:` A bug fix (e.g. `fix(resolver): resolve Tailwind v4 alpha conflicts`)
- `docs:` Documentation improvements (e.g. `docs: update MCP setup guide`)
- `refactor:` Code changes that neither fix a bug nor add a feature
- `test:` Adding or updating tests
- `chore:` Routine tasks, dependencies, or tool updates

---

## 🚀 Pull Request Workflow

1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feat/my-awesome-feature
   ```
2. Make changes following our design guidelines and architectural rules.
3. Ensure `pnpm typecheck` and `pnpm test` pass with 100% success.
4. Commit your changes using Conventional Commits.
5. Push your branch to your fork and open a Pull Request.
6. A maintainer will review your PR, provide constructive feedback, and merge once ready!

Thank you for helping build the universal UI resolution layer for React! 🚀
