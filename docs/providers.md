# UIShelf Provider Directory & Multi-Platform Aggregation Architecture

UIShelf is the universal resolution, discovery, and transactional installation layer across the React UI ecosystem. 

Rather than maintaining a static, hardcoded list of components, UIShelf operates as a **dynamic multi-platform aggregator and search proxy**. It queries remote platforms concurrently using their native schemas, aggregates results into a unified TypeScript interface, and executes their upstream installation commands in the background.

---

## 1. How the Dynamic Aggregator Works

```
                        ┌──────────────────────────────────────────────┐
                        │        Developer: uishelf search <query>     │
                        └──────────────────────┬───────────────────────┘
                                               │
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │             @uishelf/core Engine             │
                        │       Concurrent Query Fan-Out (2.5s)        │
                        └───────┬──────────────┬──────────────┬────────┘
                                │              │              │
         ┌──────────────────────┴┐             │              └──────────────────────┐
         ▼                       ▼             ▼                                     ▼
┌──────────────────┐    ┌─────────────────┐  ┌──────────────────┐          ┌──────────────────┐
│  shadcn/ui API   │    │  Magic UI / R   │  │   21st.dev API   │          │ NPM Registry API │
│  /r/index.json   │    │  /r/index.json  │  │   /api/registry  │          │ /-/v1/search     │
└────────┬─────────┘    └────────┬────────┘  └────────┬─────────┘          └────────┬─────────┘
         │                       │                    │                             │
         └───────────────────────┴─────────────┬──────┴─────────────────────────────┘
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │        Canonical UIShelf Normalization       │
                        │  9-Factor Quality Ranking & Compatibility    │
                        └──────────────────────┬───────────────────────┘
                                               │
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │        Ranked, Multi-Platform Results        │
                        └──────────────────────────────────────────────┘
```

1. **Concurrent Search Proxy**: When you search (e.g. `uishelf search button` or `uishelf search card`), UIShelf simultaneously queries active registries using their specific endpoints and schemas with an automatic 2.5s network timeout.
2. **Local Caching**: Registry indexes and search results are cached using `@uishelf/cache` to ensure subsequent searches complete in `0ms`.
3. **Offline Resiliency**: If internet access is unavailable or a remote endpoint fails, UIShelf seamlessly falls back to its local seed catalog without crashing.
4. **Canonical Normalization**: All external responses are validated and normalized into the universal `UIShelfComponent` schema with quality scores, dependency health, and framework compatibility badges.

---

## 2. Background Native Command Execution

When installing any component, developers use a single, unified interface:
```bash
uishelf add <component-id>
```

Under the hood, UIShelf detects the provider's native command, adapts it to your project's package manager (`pnpm dlx`, `bunx --bun`, or `npx`), and executes it in the background:

| Provider | Install Mode | Upstream Background Command | File Destination |
| :--- | :--- | :--- | :--- |
| **shadcn/ui** | `shadcn` | `npx shadcn@latest add {name} --yes` | `components/ui/{name}.tsx` |
| **Magic UI** | `shadcn` | `npx shadcn@latest add "https://magicui.design/r/{name}.json" --yes` | `components/ui/{name}.tsx` |
| **Aceternity UI** | `shadcn` | `npx shadcn@latest add "https://ui.aceternity.com/r/{name}.json" --yes` | `components/ui/{name}.tsx` |
| **21st.dev** | `cli` | `npx 21st@latest add {name}` | `components/ui/{name}.tsx` |
| **React Bits** | `shadcn` | `npx shadcn@latest add "https://reactbits.dev/r/{name}.json" --yes` | `components/ui/{name}.tsx` |
| **Ruixen UI** | `shadcn` | `npx shadcn@latest add "https://ruixen.com/r/{name}" --yes` | `components/ui/{name}.tsx` |
| **Cult UI** | `shadcn` | `npx shadcn@latest add "https://cult-ui.com/r/{name}.json" --yes` | `components/ui/{name}.tsx` |
| **ReUI** | `shadcn` | `npx shadcn@latest add "https://reui.io/r/{name}.json" --yes` | `components/ui/{name}.tsx` |
| **Animate UI** | `shadcn` | `npx shadcn@latest add "https://animate-ui.com/r/{name}.json" --yes` | `components/ui/{name}.tsx` |
| **Kokonut UI** | `shadcn` | `npx shadcn@latest add "https://kokonutui.com/r/{name}.json" --yes` | `components/ui/{name}.tsx` |
| **Material UI (MUI)** | `package` | `pnpm add @mui/material @emotion/react @emotion/styled` | `components/ui/{name}.tsx` adapter |
| **Mantine** | `package` | `pnpm add @mantine/core @mantine/hooks` | `components/ui/{name}.tsx` adapter |
| **Chakra UI** | `package` | `pnpm add @chakra-ui/react @emotion/react` | `components/ui/{name}.tsx` adapter |
| **Custom Registries** | `shadcn` | `npx shadcn@latest add "{registryUrl}" --yes` | `components/ui/{name}.tsx` |

### Transactional Rollback Protection
If the upstream CLI encounters an issue (e.g. missing `components.json`, network error, or conflicting flags), UIShelf:
1. Gracefully falls back to its internal transactional installer.
2. Installs required npm packages directly (accounting for pnpm/yarn workspaces with `-w`).
3. Writes the component source or TypeScript adapter.
4. Records file hashes into `uishelf.lock`.
5. If any step fails, automatically rolls back all disk modifications.

---

## 3. Supported Platforms & Discovery Matrix

### 1. shadcn/ui (`@shadcn`)
- **Trust Level**: Official
- **Search Way**: Remote Registry Index (`https://ui.shadcn.com/r/index.json`)
- **Background Install**: `npx shadcn@latest add {name} --yes`
- **Supported Stacks**: Tailwind CSS (v3 / v4), React 18 / 19, Radix Primitives
- **Key Features**: Accessible WAI-ARIA primitives, Copy-paste architecture, Zero runtime CSS, Full TypeScript typing.

### 2. Magic UI (`@magic-ui`)
- **Trust Level**: Verified
- **Search Way**: Remote Registry Index (`https://magicui.design/r/index.json`)
- **Background Install**: `npx shadcn@latest add "https://magicui.design/r/{name}.json" --yes`
- **Supported Stacks**: Tailwind CSS (v3 / v4), React 19, Motion
- **Key Features**: 200+ Animated components, Glow & Spotlight effects, Canvas shaders, Bento grids, Marquee.

### 3. Aceternity UI (`@aceternity`)
- **Trust Level**: Verified
- **Search Way**: Remote Registry Index (`https://ui.aceternity.com/r/index.json`)
- **Background Install**: `npx shadcn@latest add "https://ui.aceternity.com/r/{name}.json" --yes`
- **Supported Stacks**: Tailwind CSS (v3 / v4), React 19, Motion
- **Key Features**: Radiant Hero sections, 3D Pin & Sparkles, Lamp lighting effect, GPU accelerated shaders.

### 4. 21st.dev (`@21st`)
- **Trust Level**: Verified
- **Search Way**: Marketplace API & Registry Index (`https://21st.dev/api/registry/index`)
- **Background Install**: `npx 21st@latest add {name}`
- **Supported Stacks**: Tailwind CSS (v3 / v4), React 19, Motion
- **Key Features**: Component marketplace, Community publishing, Multi-style CLI, Instant previews.

### 5. React Bits (`@react-bits`)
- **Trust Level**: Verified
- **Search Way**: Remote Registry Index (`https://reactbits.dev/r/index.json`)
- **Background Install**: `npx shadcn@latest add "https://reactbits.dev/r/{name}.json" --yes`
- **Supported Stacks**: Tailwind CSS (v3 / v4), React 19, Motion
- **Key Features**: Physics text animations, Magnetic cursor effects, Hyperspeed canvas, Ballpit simulation.

### 6. Ruixen UI (`@ruixen`)
- **Trust Level**: Verified
- **Search Way**: Multi-Stack Registry API (`https://ruixen.com/r/index.json`)
- **Background Install**: `npx shadcn@latest add "https://ruixen.com/r/{name}" --yes`
- **Supported Stacks**: Tailwind v4, Tailwind v3, Radix UI, Base UI, React 19
- **Key Features**: Multi-stack variant selector, Radix & Base UI interchangeable, Tailwind 3 & 4 compatible.

### 7. Cult UI (`@cult-ui`)
- **Trust Level**: Verified
- **Search Way**: Remote Registry Index (`https://cult-ui.com/r/index.json`)
- **Background Install**: `npx shadcn@latest add "https://cult-ui.com/r/{name}.json" --yes`
- **Supported Stacks**: Tailwind CSS (v3 / v4), React 19, Motion
- **Key Features**: Tactile neumorphism, Cyberpunk interfaces, Dynamic audio/haptics, Creative web blocks.

### 8. ReUI (`@reui`)
- **Trust Level**: Verified
- **Search Way**: Remote Registry Index (`https://reui.io/r/index.json`)
- **Background Install**: `npx shadcn@latest add "https://reui.io/r/{name}.json" --yes`
- **Supported Stacks**: Tailwind CSS (v3 / v4), React 19
- **Key Features**: SaaS hero blocks, Conversion announcement banners, Micro-feedback buttons.

### 9. Animate UI (`@animate-ui`)
- **Trust Level**: Verified
- **Search Way**: Remote Registry Index (`https://animate-ui.com/r/index.json`)
- **Background Install**: `npx shadcn@latest add "https://animate-ui.com/r/{name}.json" --yes`
- **Supported Stacks**: Tailwind CSS (v3 / v4), React 19, Motion
- **Key Features**: Spring physics primitives, Morphing modal dialogs, Micro-interaction triggers.

### 10. Kokonut UI (`@kokonutui`)
- **Trust Level**: Verified
- **Search Way**: Remote Registry Index (`https://kokonutui.com/r/index.json`)
- **Background Install**: `npx shadcn@latest add "https://kokonutui.com/r/{name}.json" --yes`
- **Supported Stacks**: Tailwind CSS (v3 / v4), React 19, Lucide Icons
- **Key Features**: AI prompt inputs, Interactive command bars, Dashboard widgets, Card carousels.

### 11. Material UI (MUI) (`mui:`)
- **Trust Level**: Official
- **Search Way**: NPM Registry Search API & Package Manifest
- **Background Install**: `pnpm add @mui/material @emotion/react @emotion/styled`
- **Supported Stacks**: Emotion, MUI System, React 18/19, TypeScript
- **Key Features**: Google Material Design 3, Enterprise DataGrid, Comprehensive form controls, Deep theming.

### 12. Mantine (`mantine:`)
- **Trust Level**: Official
- **Search Way**: NPM Registry Search API & Package Manifest
- **Background Install**: `pnpm add @mantine/core @mantine/hooks`
- **Supported Stacks**: PostCSS, CSS Modules, React 18/19, TypeScript
- **Key Features**: 100+ components, 50+ custom hooks, Zero runtime CSS overhead, Native dark theme.

### 13. Chakra UI (`chakra:`)
- **Trust Level**: Official
- **Search Way**: NPM Registry Search API & Package Manifest
- **Background Install**: `pnpm add @chakra-ui/react @emotion/react`
- **Supported Stacks**: Emotion, React 18/19, TypeScript
- **Key Features**: Style props DX, Accessible WAI-ARIA, Composable layouts, Flexible theming.

---

## 4. Discovering Libraries via CLI & JSON

Inspect the full registry matrix directly in your terminal:
```bash
uishelf providers list
# Or shortcut
uishelf libs
```

For AI agents, CI/CD scripts, or programmatic pipelines, pass `--json`:
```bash
uishelf providers list --json
```
