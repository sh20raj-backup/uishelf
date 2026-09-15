import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Check, ShieldCheck, Sparkles, Layers, ArrowRight } from "lucide-react";
import { CURATED_PROVIDERS } from "@uishelf/registry/seed";
import { getCanonicalUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Supported React UI Registries & Providers Directory",
  description:
    "Explore 340+ supported React UI providers and registries including shadcn/ui, Magic UI, Aceternity UI, 21st.dev, React Bits, Cult UI, ReUI, MUI, Mantine, and Chakra UI.",
  keywords: [
    "react ui providers",
    "shadcn registry directory",
    "magic ui registry",
    "aceternity ui registry",
    "21st dev registry",
    "react ui libraries list",
  ],
  alternates: {
    canonical: getCanonicalUrl("/libraries/"),
  },
  openGraph: {
    title: "Supported React UI Registries & Providers Directory | UIShelf",
    description:
      "Explore 340+ supported React UI providers and registries including shadcn/ui, Magic UI, Aceternity UI, 21st.dev, and NPM libraries.",
    url: getCanonicalUrl("/libraries/"),
    siteName: "UIShelf",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "UIShelf Providers Directory" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supported React UI Registries & Providers Directory | UIShelf",
    description:
      "Explore 340+ supported React UI providers and registries with native compatibility support.",
    images: [DEFAULT_OG_IMAGE],
    creator: "@shaswatraj",
  },
};

export default function LibrariesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium mb-4 border border-cyan-500/20">
          <Layers className="size-3.5" /> Registry Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Supported React UI Providers
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          UIShelf connects to 340+ official registries and curated adapters. Each provider declares capabilities, installation mode, and prerequisites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURATED_PROVIDERS.map((p) => {
          const isOfficial = p.trustLevel === "official";
          const isVerified = p.trustLevel === "verified";

          return (
            <div
              key={p.id}
              className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-lg">{p.name}</span>
                    <span className="text-xs font-mono text-neutral-500">{p.namespace || p.id}</span>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                      isOfficial
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                        : isVerified
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-neutral-800 text-neutral-400 border-neutral-700"
                    }`}
                  >
                    {p.trustLevel}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 mb-4 leading-relaxed line-clamp-3">
                  {p.description}
                </p>

                {/* Search & Install Architecture */}
                <div className="space-y-2 mb-4 bg-black/40 border border-white/5 p-3 rounded-xl">
                  {p.searchMethod && (
                    <div className="text-[11px]">
                      <span className="text-neutral-500 font-mono">Search Schema: </span>
                      <span className="text-cyan-400 font-mono">{p.searchMethod}</span>
                    </div>
                  )}
                  {p.installCommandTemplate && (
                    <div className="text-[11px]">
                      <span className="text-neutral-500 font-mono">Background CMD: </span>
                      <code className="text-yellow-400 font-mono text-[10px] break-all">{p.installCommandTemplate}</code>
                    </div>
                  )}
                </div>

                {/* Stacks Badges */}
                {p.supportedStacks && p.supportedStacks.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">Stacks</div>
                    <div className="flex flex-wrap gap-1">
                      {p.supportedStacks.map((st) => (
                        <span key={st} className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {p.features && p.features.length > 0 && (
                  <div className="mb-4">
                    <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">Capabilities</div>
                    <div className="flex flex-wrap gap-1">
                      {p.features.map((feat) => (
                        <span key={feat} className="text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-1.5 py-0.5 rounded">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prerequisites */}
                {p.prerequisites && p.prerequisites.length > 0 && (
                  <div className="text-[11px] text-neutral-400 mb-4">
                    <span className="text-neutral-500">Prerequisites: </span>
                    {p.prerequisites.join(", ")}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={p.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  Official Site <ExternalLink className="size-3" />
                </a>

                <Link
                  href={`/search?provider=${encodeURIComponent(p.id)}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Browse Components <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
