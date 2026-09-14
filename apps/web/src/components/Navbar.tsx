"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Terminal, Sparkles, Layers, ArrowRight, Menu, X } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const [quickQuery, setQuickQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(quickQuery.trim())}`);
    } else {
      router.push("/search");
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/search", label: "Discover" },
    { href: "/components", label: "Components" },
    { href: "/libraries", label: "Libraries" },
    { href: "/compare", label: "Compare" },
    { href: "/mcp", label: "MCP", icon: <Sparkles className="size-3.5 text-purple-400" /> },
    { href: "/cli", label: "CLI", icon: <Terminal className="size-3.5 text-cyan-400" /> },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#08080a]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.25)] group-hover:scale-105 transition-transform">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.jpg`}
                alt="UIShelf Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-100 to-cyan-300 bg-clip-text text-transparent">
              UIShelf
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 hover:text-white transition-colors py-1"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-56 lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500" />
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Search components... (/)"
              className="w-full pl-8 pr-12 py-1.5 bg-neutral-900/90 border border-white/[0.08] rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono bg-neutral-800 border border-white/10 px-1 py-0.5 rounded text-neutral-400">
              ⌘K
            </kbd>
          </form>

          <a
            href="https://github.com/SH20RAJ/uishelf"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white border border-white/[0.08] hover:border-white/20 rounded-lg bg-neutral-900/50 hover:bg-neutral-800/80 transition-all"
          >
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>

          <Link
            href="/search"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_18px_rgba(0,240,255,0.35)] hover:shadow-[0_0_24px_rgba(0,240,255,0.5)] transition-all"
          >
            <span>Explore</span>
            <ArrowRight className="size-3" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-400 hover:text-white rounded-lg border border-white/[0.08] bg-neutral-900/60"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0c0c10]/95 backdrop-blur-2xl px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Search components..."
              className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-white/[0.08] rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none"
            />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-lg border border-transparent hover:border-white/[0.08] transition-all"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
            <a
              href="https://github.com/SH20RAJ/uishelf"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Star on GitHub ★
            </a>
            <span className="text-[10px] text-neutral-600 font-mono">v0.1.0</span>
          </div>
        </div>
      )}
    </header>
  );
}
