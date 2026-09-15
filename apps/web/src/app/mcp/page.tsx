import React from "react";
import type { Metadata } from "next";
import { Sparkles, Terminal, ShieldCheck, Cpu, Code2, Copy } from "lucide-react";
import { getCanonicalUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Model Context Protocol (MCP) Server for React UI Discovery",
  description:
    "Empower AI agents in Cursor, Claude Desktop, Antigravity, and Windsurf to search 340+ React UI registries, inspect project stacks, and calculate safe install plans via UIShelf MCP.",
  keywords: [
    "uishelf mcp",
    "mcp server react",
    "model context protocol ui",
    "claude desktop ui components",
    "cursor mcp server react",
    "ai ui generator",
    "ai coding assistant ui",
  ],
  alternates: {
    canonical: getCanonicalUrl("/mcp/"),
  },
  openGraph: {
    title: "Model Context Protocol (MCP) Server for React UI Discovery | UIShelf",
    description:
      "Connect Claude Desktop, Cursor, and AI agents to the entire React UI ecosystem via UIShelf MCP.",
    url: getCanonicalUrl("/mcp/"),
    siteName: "UIShelf",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "UIShelf MCP Server" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Model Context Protocol (MCP) Server for React UI Discovery | UIShelf",
    description:
      "Allow Cursor, Claude Desktop, and AI agents to discover and install React components safely.",
    images: [DEFAULT_OG_IMAGE],
    creator: "@shaswatraj",
  },
};

export default function McpPage() {
  const mcpConfig = `{
  "mcpServers": {
    "uishelf": {
      "command": "npx",
      "args": ["-y", "uishelf", "mcp"]
    }
  }
}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium mb-4 border border-purple-500/20">
          <Sparkles className="size-3.5 text-purple-400" /> Model Context Protocol (MCP)
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Supercharge AI Agents with UIShelf MCP
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Allow Cursor, Claude Desktop, Antigravity, and Windsurf agents to inspect your stack, discover real UI components across 340+ registries, and calculate safe install plans.
        </p>
      </div>

      {/* Configuration Card */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 mb-10">
        <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Cpu className="size-4 text-cyan-400" /> One-Line MCP Setup
        </h2>
        <p className="text-xs text-neutral-400 mb-4">
          Add the following configuration to your <code className="text-white">claude_desktop_config.json</code> or IDE MCP settings:
        </p>

        <pre className="p-4 bg-neutral-950 border border-white/10 rounded-xl font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
          {mcpConfig}
        </pre>
      </div>

      {/* Exposed Tools Table */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 mb-10">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Terminal className="size-4 text-purple-400" /> Exposed MCP Tools
        </h2>

        <div className="space-y-4 text-xs">
          <div className="p-3 bg-neutral-950/60 rounded-xl border border-white/5">
            <div className="font-mono text-cyan-400 font-semibold mb-1">search_components(query, providers?, framework?)</div>
            <div className="text-neutral-400">Hybrid discovery with semantic scoring, provider filtering, and project compatibility weighting.</div>
          </div>

          <div className="p-3 bg-neutral-950/60 rounded-xl border border-white/5">
            <div className="font-mono text-cyan-400 font-semibold mb-1">detect_project()</div>
            <div className="text-neutral-400">Deep diagnostic of framework (Next.js, Vite), React version, Tailwind (v3 vs v4), Radix vs Base UI, and motion engines.</div>
          </div>

          <div className="p-3 bg-neutral-950/60 rounded-xl border border-white/5">
            <div className="font-mono text-cyan-400 font-semibold mb-1">get_install_plan(componentId)</div>
            <div className="text-neutral-400">Calculates non-destructive install plan with target file paths, package dependencies, and conflict detection.</div>
          </div>

          <div className="p-3 bg-neutral-950/60 rounded-xl border border-white/5">
            <div className="font-mono text-cyan-400 font-semibold mb-1">install_component(componentId, dryRun?)</div>
            <div className="text-neutral-400">Transactional installation with automatic backup and rollback safeguards, updating <code className="text-white">uishelf.lock</code>.</div>
          </div>

          <div className="p-3 bg-neutral-950/60 rounded-xl border border-white/5">
            <div className="font-mono text-cyan-400 font-semibold mb-1">doctor()</div>
            <div className="text-neutral-400">Runs comprehensive health and environment diagnostic.</div>
          </div>
        </div>
      </div>

      {/* Non-Destructive Principles */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="size-4 text-emerald-400" /> Non-Destructive Agent Safety
        </h2>
        <p className="text-xs text-neutral-400 leading-relaxed">
          UIShelf enforces strict transactional safety for AI agents. Files are never silently overwritten without detection, path traversal attacks are rejected, and upstream component hashes are cryptographically verified in <code className="text-white">uishelf.lock</code>.
        </p>
      </div>
    </div>
  );
}
