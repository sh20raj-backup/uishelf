import React from "react";
import { BookOpen, Layers, ShieldCheck, Terminal, Cpu } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Architecture & Technical Documentation
        </h1>
        <p className="text-sm text-neutral-400">
          Comprehensive guide to UIShelf Core, provider abstractions, and safety mechanisms.
        </p>
      </div>

      <div className="space-y-10 text-xs sm:text-sm text-neutral-300 leading-relaxed">
        {/* Core Architecture Principle */}
        <section className="glass-panel p-6 rounded-2xl border border-white/10">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Layers className="size-4 text-cyan-400" /> Non-Negotiable Architecture Principle
          </h2>
          <p className="mb-4 text-neutral-400">
            UIShelf Core contains all business logic. The Web application, the CLI, and the MCP server invoke the exact same core orchestration layer. Provider integrations are decoupled through the <code className="text-white">UIShelfProvider</code> interface.
          </p>
          <pre className="p-4 bg-neutral-950 border border-white/10 rounded-xl font-mono text-xs text-cyan-300 overflow-x-auto">
{`UIShelf Core
    │
    ├─ Web Application (Next.js)
    ├─ Interactive CLI (uishelf)
    └─ Model Context Protocol (MCP Server)
          │
    Provider System (shadcn registry, 21st, package libraries)`}
          </pre>
        </section>

        {/* The 9-Factor Quality Score */}
        <section className="glass-panel p-6 rounded-2xl border border-white/10">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-400" /> Transparent 9-Factor Quality Scoring
          </h2>
          <p className="mb-4 text-neutral-400">
            Unlike simple star counts, UIShelf calculates a transparent, multi-dimensional quality score with full explanations:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <li className="p-2.5 bg-neutral-950/80 rounded-lg border border-white/5">
              <span className="text-cyan-400 font-bold">Compatibility: 20%</span> — Match against project React, Next.js, and Tailwind versions.
            </li>
            <li className="p-2.5 bg-neutral-950/80 rounded-lg border border-white/5">
              <span className="text-purple-400 font-bold">Code Quality: 15%</span> — TypeScript rigor, clean interfaces, and slot polymorphism.
            </li>
            <li className="p-2.5 bg-neutral-950/80 rounded-lg border border-white/5">
              <span className="text-emerald-400 font-bold">Accessibility: 15%</span> — WAI-ARIA compliance, focus trap, and screen reader labels.
            </li>
            <li className="p-2.5 bg-neutral-950/80 rounded-lg border border-white/5">
              <span className="text-blue-400 font-bold">Maintenance: 10%</span> — Registry uptime and recent check health.
            </li>
            <li className="p-2.5 bg-neutral-950/80 rounded-lg border border-white/5">
              <span className="text-yellow-400 font-bold">Documentation: 10%</span> — Descriptions, examples, and prop types.
            </li>
            <li className="p-2.5 bg-neutral-950/80 rounded-lg border border-white/5">
              <span className="text-pink-400 font-bold">Performance: 10%</span> — Zero bloated runtime overhead.
            </li>
          </ul>
        </section>

        {/* Lockfile Specification */}
        <section className="glass-panel p-6 rounded-2xl border border-white/10">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Terminal className="size-4 text-cyan-400" /> Lockfile Specification (uishelf.lock)
          </h2>
          <p className="mb-4 text-neutral-400">
            Every installed component records upstream provenance, source hashes, and dependencies for reproducibility and auditing:
          </p>
          <pre className="p-4 bg-neutral-950 border border-white/10 rounded-xl font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
{`{
  "version": 1,
  "createdAt": "2026-09-14T11:00:00.000Z",
  "components": {
    "@magic-ui/magic-card": {
      "id": "@magic-ui/magic-card",
      "provider": "magic-ui",
      "sourceHash": "sha256:8f4c2e...",
      "license": "MIT",
      "dependencies": {
        "motion": "^12.0.0"
      },
      "files": [
        { "path": "components/ui/magic-card.tsx", "hash": "sha256:..." }
      ]
    }
  }
}`}
          </pre>
        </section>
      </div>
    </div>
  );
}
