import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090b] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded-md overflow-hidden border border-cyan-500/30">
              <img src="/logo.jpg" alt="UIShelf Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">UIShelf</span>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm mb-4 leading-relaxed">
            The universal package manager, registry discovery engine, compatibility resolver, and Model Context Protocol (MCP) platform for modern React UI ecosystems.
          </p>
          <div className="flex items-center gap-3 text-neutral-400">
            <a href="https://github.com/SH20RAJ/uishelf" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub">
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://x.com/SH20RAJ" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="X (Twitter)">
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Discovery</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><Link href="/search" className="hover:text-cyan-400">Search Components</Link></li>
            <li><Link href="/components" className="hover:text-cyan-400">Component Catalog</Link></li>
            <li><Link href="/libraries" className="hover:text-cyan-400">Registry Directory</Link></li>
            <li><Link href="/compare" className="hover:text-cyan-400">Library Comparison</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Developer Tools</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><Link href="/cli" className="hover:text-cyan-400">Interactive CLI</Link></li>
            <li><Link href="/mcp" className="hover:text-cyan-400">Model Context Protocol</Link></li>
            <li><Link href="/docs" className="hover:text-cyan-400">Architecture & Specs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Ecosystem</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400">shadcn/ui</a></li>
            <li><a href="https://magicui.design" target="_blank" rel="noreferrer" className="hover:text-cyan-400">Magic UI</a></li>
            <li><a href="https://ui.aceternity.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400">Aceternity UI</a></li>
            <li><a href="https://21st.dev" target="_blank" rel="noreferrer" className="hover:text-cyan-400">21st.dev</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>© 2026 UIShelf. Open Source under MIT License.</p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="size-3 text-red-500 fill-red-500" /> by <a href="https://github.com/SH20RAJ" className="text-cyan-400 hover:underline">Shaswat Raj</a>
        </p>
      </div>
    </footer>
  );
}
