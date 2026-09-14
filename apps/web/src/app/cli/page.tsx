import React from "react";
import { Terminal, Copy, Check, ShieldCheck } from "lucide-react";

export default function CliPage() {
  const commands = [
    { cmd: "uishelf init", desc: "Initialize UIShelf configuration and scan project stack", eg: "npx uishelf init" },
    { cmd: "uishelf search <query>", desc: "Search across 340+ registries with compatibility scoring", eg: "uishelf search 'animated pricing'" },
    { cmd: "uishelf add <component>", desc: "Install component with transactional safety and lockfile update", eg: "uishelf add @magic-ui/magic-card" },
    { cmd: "uishelf add <comp> --dry-run", desc: "Preview file changes and packages without modifying disk", eg: "uishelf add @aceternity/3d-card --dry-run" },
    { cmd: "uishelf inspect <component>", desc: "Deep-dive into component AST, source code, and dependencies", eg: "uishelf inspect @cult-ui/text-gif" },
    { cmd: "uishelf doctor", desc: "Diagnose project framework, Tailwind config, and provider status", eg: "uishelf doctor" },
    { cmd: "uishelf providers list", desc: "List all active, verified, and community providers", eg: "uishelf providers list" },
    { cmd: "uishelf providers sync", desc: "Fetch and index the official shadcn registry index", eg: "uishelf providers sync" },
    { cmd: "uishelf providers add <name> <url>", desc: "Register a custom community or enterprise registry URL", eg: "uishelf providers add acme https://acme.com/r/{name}.json" },
    { cmd: "uishelf verify", desc: "Verify cryptographic SHA-256 integrity hashes in uishelf.lock", eg: "uishelf verify" },
    { cmd: "uishelf audit", desc: "Scan installed UI components for suspicious code or eval() calls", eg: "uishelf audit" },
    { cmd: "uishelf mcp", desc: "Start Model Context Protocol (MCP) server over stdio", eg: "uishelf mcp" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium mb-4 border border-cyan-500/20">
          <Terminal className="size-3.5 text-cyan-400" /> Developer CLI
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          UIShelf Command Line Interface
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Fast, interactive, and scriptable. Built-in <code className="text-white">--json</code> support across all commands for automation and CI/CD pipelines.
        </p>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="p-4 border-b border-white/10 bg-neutral-950/60 font-mono text-xs text-neutral-400 flex items-center justify-between">
          <span>Command Reference</span>
          <span className="text-cyan-400">v0.1.0</span>
        </div>

        <div className="divide-y divide-white/5">
          {commands.map((c) => (
            <div key={c.cmd} className="p-5 hover:bg-white/[0.02] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                <code className="font-mono text-xs sm:text-sm font-bold text-cyan-300">{c.cmd}</code>
                <span className="font-mono text-[11px] text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-white/5">
                  $ {c.eg}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
