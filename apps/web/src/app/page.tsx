"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  Terminal,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`);
    } else {
      router.push("/search");
    }
  };

  const copyCliCmd = () => {
    navigator.clipboard.writeText("npx uishelf add @magic-ui/magic-card");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featuredProviders = [
    { name: "shadcn/ui", badge: "Official", desc: "Gold standard primitives" },
    { name: "Magic UI", badge: "200+ Components", desc: "Animated cards & effects" },
    { name: "Aceternity UI", badge: "Verified", desc: "Interactive 3D & hero blocks" },
    { name: "21st.dev", badge: "Marketplace", desc: "Community component registry" },
    { name: "React Bits", badge: "Free & Pro", desc: "Dynamic physics & text effects" },
    { name: "Ruixen UI", badge: "Multi-Stack", desc: "Tailwind 4/3 & Radix/Base UI" },
    { name: "Cult UI", badge: "Creative", desc: "Experimental visual typography" },
    { name: "Animate UI", badge: "Micro-Interactions", desc: "Smooth spring primitives" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium mb-8 backdrop-blur-md">
          <Sparkles className="size-3.5 text-cyan-400 animate-pulse" />
          <span>Universal React UI Registry, CLI & MCP Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Search Every UI Source.{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Install Safely.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
          UIShelf is the resolution layer between developers and the React UI ecosystem. Understand project compatibility, preview live code, resolve dependencies, and install with confidence.
        </p>

        {/* Big Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-12 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
          <div className="relative flex items-center bg-neutral-950/90 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
            <Search className="size-5 text-neutral-400 ml-3" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search components: 'pricing', 'bento-grid', 'hero', '3d-card'..."
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-1.5"
            >
              Search <ArrowRight className="size-3.5" />
            </button>
          </div>
        </form>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">340+</div>
            <div className="text-xs text-neutral-400 mt-1">Registries Synced</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">5,000+</div>
            <div className="text-xs text-neutral-400 mt-1">Curated Components</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">0 Keys</div>
            <div className="text-xs text-neutral-400 mt-1">Required for Discovery</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
            <div className="text-xs text-neutral-400 mt-1">Transactional Safety</div>
          </div>
        </div>
      </section>

      {/* Terminal CLI Spotlight */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-neutral-400 font-mono ml-2">terminal — uishelf</span>
            </div>
            <button
              onClick={copyCliCmd}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md"
            >
              {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="font-mono text-xs sm:text-sm space-y-2 text-neutral-300">
            <div className="text-neutral-500"># Install any component directly with stack compatibility checks:</div>
            <div className="text-cyan-400 font-bold">$ npx uishelf add @magic-ui/magic-card</div>
            <div className="text-neutral-400 pl-4">Scanning project stack... Next.js 15 ✓ Tailwind v4 ✓ Motion v12 ✓</div>
            <div className="text-neutral-400 pl-4">+ components/ui/magic-card.tsx (sha256:8f4c2e...)</div>
            <div className="text-emerald-400 font-semibold pl-4">✔ Successfully installed Magic Card & updated uishelf.lock</div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">One Unified Protocol. All Top Registries.</h2>
          <p className="text-neutral-400 text-sm mt-2">Zero fragmentation. Every ecosystem accessible through one engine.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProviders.map((provider) => (
            <Link
              key={provider.name}
              href={`/search?provider=${encodeURIComponent(provider.name.toLowerCase().replace(/[^a-z0-9]/g, "-"))}`}
              className="glass-panel glass-panel-hover p-5 rounded-xl block group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">{provider.name}</span>
                <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full border border-neutral-700">
                  {provider.badge}
                </span>
              </div>
              <p className="text-xs text-neutral-400">{provider.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why UIShelf Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Zap className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Stack-Aware Resolution</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Detects Tailwind v3 vs v4, React 18 vs 19, and Radix vs Base UI primitives. E.g. automatically resolves Ruixen UI's 4 stack variants without manual intervention.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Transactional Safety</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Safe <code className="text-neutral-300">--dry-run</code> planning, automatic rollbacks if file writes fail, path traversal guards, AST security scanning, and <code className="text-neutral-300">uishelf.lock</code> integrity tracking.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Cpu className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Model Context Protocol (MCP)</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Native stdio MCP server for Cursor, Claude Desktop, Antigravity, and Windsurf. Allows AI agents to query the registry, evaluate project compatibility, and generate verified install plans.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
