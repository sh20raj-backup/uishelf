<p align="center">
  <img src="./assets/og.jpg" alt="UIShelf Banner" width="100%" />
</p>

<h1 align="center">UIShelf</h1>

<p align="center">
  <strong>Universal React UI Registry, Discovery Engine, Compatibility Resolver, Installer & MCP Platform</strong>
</p>

<p align="center">
  <a href="https://github.com/SH20RAJ/uishelf/actions"><img src="https://img.shields.io/github/actions/workflow/status/SH20RAJ/uishelf/ci.yml?branch=main&style=flat-square" alt="CI Status" /></a>
  <a href="https://www.npmjs.com/package/uishelf"><img src="https://img.shields.io/npm/v/uishelf?style=flat-square&color=blue" alt="npm version" /></a>
  <a href="https://sh20raj.github.io/uishelf/"><img src="https://img.shields.io/badge/Web_Platform-Live-00F0FF?style=flat-square&logo=googlechrome&logoColor=black" alt="Web Platform" /></a>
  <a href="https://github.com/SH20RAJ/uishelf/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" /></a>
  <a href="https://github.com/SH20RAJ/uishelf/stargazers"><img src="https://img.shields.io/github/stars/SH20RAJ/uishelf?style=flat-square" alt="GitHub Stars" /></a>
  <a href="https://github.com/SH20RAJ/uishelf/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square" alt="TypeScript" />
  <img src="https://img.shields.io/badge/shadcn-Compatible-black?style=flat-square" alt="shadcn" />
</p>

<p align="center">
  <a href="https://sh20raj.github.io/uishelf/"><strong>🌐 Explore Live Web Catalog</strong></a> • 
  <a href="https://sh20raj.github.io/uishelf/docs/"><strong>📚 Documentation</strong></a> • 
  <a href="https://sh20raj.github.io/uishelf/compare/"><strong>⚖️ Compare UI Systems</strong></a> • 
  <a href="https://sh20raj.github.io/uishelf/mcp/"><strong>🤖 MCP Server Guide</strong></a>
</p>

---

## 💡 What is UIShelf?

**UIShelf is NOT another UI component library.**  
UIShelf is the **resolution layer** between developers and the entire React UI ecosystem.

> **Core Promise**:  
> Search every great UI source → Understand compatibility → Preview & inspect → Choose the best component → Install safely.

Everything runs on the exact same core engine across all interfaces:
- 🌐 **Web Platform**: Interactive search catalog, preview drawer, provider analytics, library comparison (`/compare`).
- ⚡ **Interactive CLI (`uishelf`)**: Instant component discovery, dry-run install plans, doctor diagnostics, smart add.
- 🤖 **Model Context Protocol (MCP)**: Native stdio & remote tools allowing Cursor, Claude, Antigravity, and Windsurf AI agents to safely discover, inspect, and install UI components.

---

## 🚀 Quick Start

### 1. Zero-Config Project Discovery
Run UIShelf inside any React / Next.js / Vite project:

```bash
npx uishelf
```

UIShelf scans your stack:
```text
Scanning project...
✓ Next.js 15.1
✓ React 19
✓ Tailwind CSS v4
✓ shadcn detected (components/ui)
✓ Motion v12 ready
Syncing public registries...
✓ 340+ providers indexed
UIShelf is ready.
```

### 2. Search Components Across Ecosystems

```bash
uishelf search "animated pricing"
```

Output:
```text
1  Magic UI / Animated Pricing Section   96  SaaS pricing with animated monthly/annual billing toggle
   Tailwind 4 · Next.js · shadcn ✓ · Motion ✓
   Why: Exact semantic match · Motion already installed · Fully accessible

2  Ruixen UI / Pricing Table             94  Responsive pricing grid with Base UI & Tailwind 4
   Tailwind 4 · Next.js · shadcn ✓ · Base UI
   Why: Base UI variant matched · No auth required

3  21st / Glassmorphic Pricing Card      93  Frosted glass pricing tier with subtle particle glow
   Tailwind · Next.js · 🔐 21st Auth Required
```

### 3. Safe, Dry-Run Installation

```bash
# Preview changes without modifying files:
uishelf add @magic-ui/magic-card --dry-run
```

```text
Install Plan:
Component: Magic UI / Magic Card
Files:
  + components/ui/magic-card.tsx (sha256:8f4c2e...)
Packages:
  + motion (^12.0.0)
Registry dependencies:
  none
Potential conflicts:
  none
No files were modified. (dry-run mode)
```

To install for real:
```bash
uishelf add @magic-ui/magic-card
```

---

## 🌟 Key Features

- 🔍 **Hybrid BM25 & Fuzzy Search**: Sub-millisecond search across thousands of components. Works 100% offline with zero external API keys!
- 🧩 **Stack-Aware Resolution**: Detects your exact stack (Tailwind v3 vs v4, Radix vs Base UI, React 18 vs 19) and picks the matching variant. E.g., Ruixen UI multi-variant routing is handled automatically.
- 📊 **Transparent 9-Factor Quality Score**: Every result explains *why* it got its score based on Compatibility (20%), Code Quality (15%), Accessibility (15%), Maintenance (10%), Docs (10%), Performance (10%), Dependency Health (10%), Popularity (5%), and Preview Quality (5%).
- 🛡️ **Transactional Installation & Rollback**: Backs up target files before writing. If package installation fails, changes are cleanly reverted.
- 🔒 **uishelf.lock**: Reproducible provenance tracking, recording upstream provider, registry version, and SHA-256 integrity hashes.
- 🔑 **Strict On-Demand Auth**: Public components never ask for credentials. Keys (e.g. `API_KEY_21ST`, `REACTBITS_LICENSE_KEY`) are requested strictly when you target a private or Pro component.
- 🩺 **Doctor (`uishelf doctor`)**: Probes project framework, Tailwind config, aliases, design system duplication, and provider health.
- 🤖 **Native MCP Server (`uishelf mcp`)**: Seamlessly connects your IDE agent to the registry with read and write safeguards.

---

## 📦 Supported Ecosystems & Providers

UIShelf dynamically discovers and indexes all **340+ official shadcn registries** (`https://ui.shadcn.com/r/registries.json`), plus curated adapters:

| Provider | Type | Install Mode | Auth Requirement |
|---|---|---|---|
| **shadcn/ui** | Registry | `npx shadcn add` | Public (None) |
| **Magic UI** | Registry | `@magic-ui/*` | Public (None) |
| **Aceternity UI** | Registry | `@aceternity/*` | Public (None) |
| **Ruixen UI** | Multi-Variant | TW3/TW4 & Radix/BaseUI | Public (None) |
| **React Bits** | Registry | Free / Pro | `REACTBITS_LICENSE_KEY` (Pro only) |
| **21st** | CLI | `21st add` | `API_KEY_21ST` (On install) |
| **Cult UI** | Registry | `@cult-ui/*` | Public (None) |
| **ReUI** | Registry | Free / Pro | `REUI_LICENSE_KEY` (Pro only) |
| **Animate UI** | Registry | `@animate-ui/*` | Public (None) |
| **Kokonut UI** | Registry | `@kokonutui/*` | Public (None) |
| **MUI (Material UI)** | Package Library | `npm i @mui/material` | Package based |
| **Mantine** | Package Library | `npm i @mantine/core` | Package based |
| **Chakra UI** | Package Library | `npm i @chakra-ui/react` | Package based |

---

## 🛠️ CLI Commands

```bash
uishelf init                 # Initialize UIShelf in current project
uishelf search <query>       # Hybrid search across all registries (alias: uishelf s)
uishelf browse               # Interactive component browser
uishelf inspect <component>  # Deep dive into component code, AST, and dependencies
uishelf add <component>      # Install component with dependency resolution (alias: uishelf a)
uishelf remove <component>   # Safely uninstall component and update lockfile
uishelf update               # Check for upstream registry component updates
uishelf installed            # List all installed components and integrity hashes
uishelf diff <component>     # Preview changes against current local files
uishelf doctor               # Run comprehensive stack, dependency & provider health check
uishelf providers list       # List all active and discovered providers
uishelf providers sync       # Synchronize with official shadcn registry index
uishelf providers add        # Add a custom enterprise or community registry
uishelf auth login <id>      # Authenticate with an authenticated provider
uishelf config               # View or configure provider allowlist, min-score, etc.
uishelf cache clear          # Purge local registry cache
uishelf mcp                  # Start Model Context Protocol server (stdio mode)
```

---

## 🤖 Model Context Protocol (MCP) Setup

Add UIShelf to your `claude_desktop_config.json`, Cursor, or Antigravity MCP settings:

```json
{
  "mcpServers": {
    "uishelf": {
      "command": "npx",
      "args": ["-y", "uishelf", "mcp"]
    }
  }
}
```

Exposed MCP Tools:
- `search_components`: Hybrid discovery with stack context
- `inspect_component`: Inspect code, score breakdown, and prerequisites
- `compare_components`: Side-by-side component or provider comparison
- `detect_project`: Full project stack diagnostic
- `get_install_plan`: Non-destructive install plan calculation
- `install_component`: Transactional installation with confirmation
- `doctor`: Project and provider health diagnostics

---

## 📦 Modular Packages on NPM

All packages are published under the `@uishelf` scope and the main `uishelf` CLI on the npm registry:

| Package | Version | Description |
|---|---|---|
| [`uishelf`](https://www.npmjs.com/package/uishelf) | `0.1.0` | Production CLI, terminal UX, and stdio MCP command |
| [`@uishelf/core`](https://www.npmjs.com/package/@uishelf/core) | `0.1.0` | Central orchestration engine uniting all packages |
| [`@uishelf/schema`](https://www.npmjs.com/package/@uishelf/schema) | `0.1.0` | Canonical Zod schemas & TypeScript definitions |
| [`@uishelf/project`](https://www.npmjs.com/package/@uishelf/project) | `0.1.0` | React 18/19, Next.js 14/15, Tailwind v3/v4 detector |
| [`@uishelf/search`](https://www.npmjs.com/package/@uishelf/search) | `0.1.0` | Zero-API-key BM25 + fuzzy hybrid search engine |
| [`@uishelf/resolver`](https://www.npmjs.com/package/@uishelf/resolver) | `0.1.0` | Dependency resolution & multi-variant routing engine |
| [`@uishelf/ranking`](https://www.npmjs.com/package/@uishelf/ranking) | `0.1.0` | 9-factor transparent scoring algorithm |
| [`@uishelf/registry`](https://www.npmjs.com/package/@uishelf/registry) | `0.1.0` | Official shadcn registry synchronizer & seed catalog |
| [`@uishelf/providers`](https://www.npmjs.com/package/@uishelf/providers) | `0.1.0` | Pluggable provider system (shadcn, 21st, Ruixen, etc.) |
| [`@uishelf/installer`](https://www.npmjs.com/package/@uishelf/installer) | `0.1.0` | Transactional planner with backup & rollback safety |
| [`@uishelf/security`](https://www.npmjs.com/package/@uishelf/security) | `0.1.0` | Path traversal guard & AST safety validator |
| [`@uishelf/credentials`](https://www.npmjs.com/package/@uishelf/credentials) | `0.1.0` | Secret store with on-demand auth & redaction |
| [`@uishelf/config`](https://www.npmjs.com/package/@uishelf/config) | `0.1.0` | Hierarchical configuration manager (`uishelf.json`) |
| [`@uishelf/cache`](https://www.npmjs.com/package/@uishelf/cache) | `0.1.0` | Fast filesystem & memory caching with offline support |
| [`@uishelf/mcp`](https://www.npmjs.com/package/@uishelf/mcp) | `0.1.0` | Stdio Model Context Protocol (MCP) server |

---

## 📄 License

MIT © [Shaswat Raj](https://github.com/SH20RAJ)
