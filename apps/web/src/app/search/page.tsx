"use client";
import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  Check,
  Copy,
  ExternalLink,
  Code2,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  Eye,
  X,
} from "lucide-react";
import { SEED_COMPONENTS, CURATED_PROVIDERS } from "@uishelf/registry/seed";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialProvider = searchParams.get("provider") || "all";

  const [query, setQuery] = useState(initialQuery);
  const [selectedProvider, setSelectedProvider] = useState(initialProvider);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [onlyFree, setOnlyFree] = useState(false);
  const [previewComponent, setPreviewComponent] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter components locally for instant response
  const filteredComponents = useMemo(() => {
    return SEED_COMPONENTS.filter((comp) => {
      // Text query match
      if (query.trim()) {
        const q = query.toLowerCase();
        const matches =
          comp.title.toLowerCase().includes(q) ||
          comp.name.toLowerCase().includes(q) ||
          comp.description.toLowerCase().includes(q) ||
          comp.tags.some((t) => t.toLowerCase().includes(q)) ||
          comp.providerId.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Provider match
      if (selectedProvider !== "all") {
        if (comp.providerId !== selectedProvider) return false;
      }

      // Category match
      if (selectedCategory !== "all") {
        if (!comp.categories.includes(selectedCategory)) return false;
      }

      // Auth filter
      if (onlyFree && comp.auth.required) {
        return false;
      }

      return true;
    });
  }, [query, selectedProvider, selectedCategory, onlyFree]);

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ["all", "pricing", "cards", "hero", "typography", "primitives", "effects"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Search Controls */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight mb-4">Discover React Components</h1>
        <p className="text-neutral-400 text-sm mb-6">
          Search across 340+ official shadcn registries and curated providers.
        </p>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, description, tags: 'pricing', 'spotlight', 'hero', 'blur-text'..."
            className="w-full pl-12 pr-4 py-3.5 bg-neutral-900/90 border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-xl"
          />
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Provider Select */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Filter className="size-3.5 text-cyan-400" />
            <span>Provider:</span>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Providers (13+)</option>
              {CURATED_PROVIDERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                  selectedCategory === cat
                    ? "bg-cyan-400 text-black font-semibold shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Free Only Toggle */}
          <label className="flex items-center gap-2 text-xs text-neutral-300 ml-auto cursor-pointer">
            <input
              type="checkbox"
              checked={onlyFree}
              onChange={(e) => setOnlyFree(e.target.checked)}
              className="rounded border-neutral-700 bg-neutral-900 text-cyan-400 focus:ring-0"
            />
            <span>Public / Free only</span>
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-neutral-500 mb-6">
        Found <span className="text-white font-medium">{filteredComponents.length}</span> matching components
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((comp) => {
          const installCmd = `uishelf add ${comp.id}`;
          const isCopied = copiedId === comp.id;

          return (
            <div
              key={comp.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {comp.providerId}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      ★ {comp.quality.overall}
                    </span>
                    {comp.auth.required && (
                      <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-md">
                        🔐 Pro
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {comp.title}
                </h3>

                <p className="text-xs text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                  {comp.description}
                </p>

                {/* Score Reason Highlights */}
                {comp.quality.breakdown.reasons.length > 0 && (
                  <div className="text-[11px] text-neutral-500 bg-neutral-900/80 rounded-lg p-2 mb-4 border border-white/5 space-y-1">
                    <span className="text-cyan-400 font-medium">Why this score: </span>
                    <span>{comp.quality.breakdown.reasons.slice(0, 2).join(" · ")}</span>
                  </div>
                )}
              </div>

              <div>
                {/* Copy Install Command */}
                <div className="flex items-center justify-between bg-neutral-950 border border-white/10 rounded-xl p-2 mb-3 font-mono text-[11px] text-neutral-300">
                  <span className="truncate mr-2">{installCmd}</span>
                  <button
                    onClick={() => copyCommand(installCmd, comp.id)}
                    className="p-1 hover:text-white text-neutral-400 transition-colors shrink-0"
                    title="Copy command"
                  >
                    {isCopied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewComponent(comp)}
                    className="flex-1 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                  >
                    <Eye className="size-3.5 text-cyan-400" /> Preview
                  </button>

                  <Link
                    href={`/components/${comp.providerId}/${comp.providerItemId}`}
                    className="px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-lg text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    Details <ChevronRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Preview Modal / Drawer */}
      {previewComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl max-h-[85vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">{previewComponent.title}</h3>
                <p className="text-xs text-cyan-400">Provider: {previewComponent.providerId}</p>
              </div>
              <button
                onClick={() => setPreviewComponent(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="p-8 bg-neutral-950/80 border border-white/10 rounded-xl flex items-center justify-center min-h-[160px] text-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium mb-3 border border-cyan-500/20">
                    <Sparkles className="size-3.5" /> Live Component Preview
                  </div>
                  <h4 className="text-xl font-extrabold text-white mb-1">{previewComponent.title}</h4>
                  <p className="text-xs text-neutral-400 max-w-sm">{previewComponent.description}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Code2 className="size-3.5 text-cyan-400" /> Source Code ({previewComponent.files[0]?.path || "code"})
                </h4>
                <pre className="p-4 bg-neutral-950 border border-white/10 rounded-xl font-mono text-xs text-neutral-300 overflow-x-auto max-h-60 leading-relaxed">
                  {previewComponent.files[0]?.content || `// ${previewComponent.title} package component`}
                </pre>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 flex items-center justify-between bg-neutral-950/50">
              <span className="text-xs text-neutral-400">Score: <strong className="text-emerald-400">★ {previewComponent.quality.overall}</strong></span>
              <button
                onClick={() => copyCommand(`uishelf add ${previewComponent.id}`, previewComponent.id)}
                className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center gap-1.5"
              >
                {copiedId === previewComponent.id ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span>{copiedId === previewComponent.id ? "Copied Command!" : "Copy Install Command"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-500">Loading search engine...</div>}>
      <SearchContent />
    </Suspense>
  );
}
