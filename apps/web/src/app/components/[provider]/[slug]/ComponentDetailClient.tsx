"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  Code2,
} from "lucide-react";
import { SEED_COMPONENTS } from "@uishelf/registry/seed";

export default function ComponentDetailClient({
  provider,
  slug,
}: {
  provider: string;
  slug: string;
}) {
  const [copiedUishelf, setCopiedUishelf] = useState(false);
  const [copiedOfficial, setCopiedOfficial] = useState(false);

  // Find matching component
  const component =
    SEED_COMPONENTS.find(
      (c) =>
        c.providerId.toLowerCase() === provider.toLowerCase() &&
        c.providerItemId.toLowerCase() === slug.toLowerCase()
    ) || SEED_COMPONENTS[0];

  const uishelfCmd = `uishelf add ${component.id}`;
  const officialCmd = component.install.command || `npx shadcn@latest add ${component.id}`;

  const copyUishelf = () => {
    navigator.clipboard.writeText(uishelfCmd);
    setCopiedUishelf(true);
    setTimeout(() => setCopiedUishelf(false), 2000);
  };

  const copyOfficial = () => {
    navigator.clipboard.writeText(officialCmd);
    setCopiedOfficial(true);
    setTimeout(() => setCopiedOfficial(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <Link
        href="/search"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="size-3.5" /> Back to Discovery
      </Link>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {component.providerId}
            </span>
            <span className="text-xs text-neutral-500 font-mono">{component.id}</span>
            <span className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
              {component.license}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{component.title}</h1>
          <p className="text-neutral-400 text-sm mt-2 max-w-2xl leading-relaxed">
            {component.description}
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 shrink-0">
          <div className="text-right">
            <div className="text-xs text-neutral-400">UIShelf Score</div>
            <div className="text-3xl font-black text-emerald-400">★ {component.quality.overall}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column: Preview & Source Code */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Preview Container */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-neutral-950/60">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-cyan-400" /> Interactive Preview
              </span>
              {component.preview?.demoUrl && (
                <a
                  href={component.preview.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Provider Demo <ExternalLink className="size-3" />
                </a>
              )}
            </div>

            <div className="p-12 bg-neutral-950/40 min-h-[220px] flex items-center justify-center text-center">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] mb-4">
                  <Layers className="size-6 text-black" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">{component.title}</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">{component.description}</p>
              </div>
            </div>
          </div>

          {/* Installation Commands */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="size-3.5 text-cyan-400" /> Installation Commands
            </h3>

            {/* UIShelf Command */}
            <div>
              <div className="text-[11px] text-neutral-400 mb-1 flex items-center justify-between">
                <span>With UIShelf (Transactional, dependency & conflict resolution):</span>
                <span className="text-cyan-400 font-medium">Recommended</span>
              </div>
              <div className="flex items-center justify-between bg-neutral-950 border border-cyan-500/30 rounded-xl px-4 py-2.5 font-mono text-xs text-cyan-300">
                <code>{uishelfCmd}</code>
                <button onClick={copyUishelf} className="p-1 hover:text-white transition-colors">
                  {copiedUishelf ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>

            {/* Canonical Command */}
            <div>
              <div className="text-[11px] text-neutral-400 mb-1">Upstream Canonical Command:</div>
              <div className="flex items-center justify-between bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 font-mono text-xs text-neutral-400">
                <code>{officialCmd}</code>
                <button onClick={copyOfficial} className="p-1 hover:text-white transition-colors">
                  {copiedOfficial ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Source Code */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-neutral-950/60">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Code2 className="size-3.5 text-cyan-400" /> Source Code ({component.files[0]?.path || "component.tsx"})
              </span>
            </div>
            <pre className="p-4 bg-neutral-950 font-mono text-xs text-neutral-300 overflow-x-auto max-h-96 leading-relaxed">
              {component.files[0]?.content || `// ${component.title} component source code`}
            </pre>
          </div>
        </div>

        {/* Right Column: Quality Score, Stack, & Metadata */}
        <div className="space-y-6">
          {/* Quality Score Breakdown */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-400" /> Quality Breakdown
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-neutral-300 mb-1">
                  <span>Stack Compatibility</span>
                  <span className="font-mono text-white">{component.quality.breakdown.compatibility}/20</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${(component.quality.breakdown.compatibility / 20) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-neutral-300 mb-1">
                  <span>Code Quality & TypeScript</span>
                  <span className="font-mono text-white">{component.quality.breakdown.codeQuality}/15</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full rounded-full" style={{ width: `${(component.quality.breakdown.codeQuality / 15) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-neutral-300 mb-1">
                  <span>Accessibility & WAI-ARIA</span>
                  <span className="font-mono text-white">{component.quality.breakdown.accessibility}/15</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(component.quality.breakdown.accessibility / 15) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-neutral-300 mb-1">
                  <span>Maintenance & Reliability</span>
                  <span className="font-mono text-white">{component.quality.breakdown.maintenance}/10</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full" style={{ width: `${(component.quality.breakdown.maintenance / 10) * 100}%` }} />
                </div>
              </div>
            </div>

            {component.quality.breakdown.reasons.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-[11px] text-cyan-400 font-semibold block mb-1">Why this component:</span>
                <ul className="text-xs text-neutral-400 space-y-1">
                  {component.quality.breakdown.reasons.map((r, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Framework Support */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Cpu className="size-3.5 text-cyan-400" /> Stack Support
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">React Version</span>
                <span className="text-white font-medium">{component.frameworkSupport.react}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Next.js Ready</span>
                <span className="text-emerald-400 font-medium">✓ Yes</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Tailwind Compatibility</span>
                <span className="text-cyan-400 font-medium capitalize">{component.frameworkSupport.tailwind}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Motion Engine</span>
                <span className="text-purple-400 font-medium capitalize">{component.frameworkSupport.motion}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-400">Authentication</span>
                <span className={component.auth.required ? "text-yellow-400" : "text-emerald-400"}>
                  {component.auth.required ? "🔐 API Key Required" : "✓ None (Free)"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
