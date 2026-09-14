"use client";
import React, { useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    // Automatically redirect back to the home route
    const target = "https://sh20raj.github.io/uishelf/";
    const timer = setTimeout(() => {
      window.location.replace(target);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl max-w-md w-full border border-cyan-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-cyan-500/20 blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-6 border border-cyan-500/20">
          <Sparkles className="size-3.5" /> 404 Route
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 mb-8 leading-relaxed">
          The requested path doesn't exist or was moved. Redirecting you to the UIShelf discovery hub...
        </p>

        <a
          href="https://sh20raj.github.io/uishelf/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-cyan-400 hover:bg-cyan-300 text-black text-xs sm:text-sm font-bold rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all"
        >
          Return to UIShelf Home <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
