import React from "react";
import Link from "next/link";
import { SEED_COMPONENTS } from "@uishelf/registry/seed";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ComponentsDirectoryPage() {
  const categories = [
    { id: "pricing", title: "Pricing Sections & Cards", desc: "High-converting SaaS pricing tables and billing toggles." },
    { id: "cards", title: "Cards & Perspective Effects", desc: "Spotlight, 3D tilt, and interactive container cards." },
    { id: "typography", title: "Animated Typography", desc: "Blur reveals, text background GIFs, and animated headlines." },
    { id: "primitives", title: "Primitives & Interactive Hooks", desc: "Sliding numbers, tabs, slots, and spring physics." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Component Catalog
        </h1>
        <p className="text-sm text-neutral-400">
          Browse React components by architectural category and pattern.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((cat) => {
          const items = SEED_COMPONENTS.filter((c) => c.categories.includes(cat.id));

          return (
            <div key={cat.id} className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{cat.title}</h2>
                  <p className="text-xs text-neutral-400">{cat.desc}</p>
                </div>
                <Link
                  href={`/search?q=${cat.id}`}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  View all ({items.length}) <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((comp) => (
                  <Link
                    key={comp.id}
                    href={`/components/${comp.providerId}/${comp.providerItemId}`}
                    className="glass-panel glass-panel-hover p-5 rounded-xl block group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {comp.providerId}
                      </span>
                      <span className="text-xs font-black text-emerald-400">★ {comp.quality.overall}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {comp.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {comp.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
