"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Terminal, Sparkles, Layers, ArrowRight } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const [quickQuery, setQuickQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(quickQuery.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:scale-105 transition-transform">
              <img src="/logo.jpg" alt="UIShelf Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              UIShelf
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
            <Link href="/search" className="hover:text-cyan-400 transition-colors">
              Discover
            </Link>
            <Link href="/components" className="hover:text-cyan-400 transition-colors">
              Components
            </Link>
            <Link href="/libraries" className="hover:text-cyan-400 transition-colors">
              Libraries
            </Link>
            <Link href="/compare" className="hover:text-cyan-400 transition-colors">
              Compare
            </Link>
            <Link href="/mcp" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Sparkles className="size-3.5 text-purple-400" /> MCP
            </Link>
            <Link href="/cli" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Terminal className="size-3.5 text-cyan-400" /> CLI
            </Link>
            <Link href="/docs" className="hover:text-cyan-400 transition-colors">
              Docs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Search 340+ registries... (Press /)"
              className="w-full pl-9 pr-8 py-1.5 bg-neutral-900/80 border border-neutral-800 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-neutral-800 border border-neutral-700 px-1.5 py-0.5 rounded text-neutral-400">
              ⌘K
            </kbd>
          </form>

          <a
            href="https://github.com/SH20RAJ/uishelf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 rounded-lg bg-neutral-900/60 transition-all"
          >
            <svg className="size-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">Star on GitHub</span>
          </a>

          <Link
            href="/search"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
          >
            Explore <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
