import React from "react";
import Link from "next/link";
import { Check, X, Shield, ArrowRight } from "lucide-react";

export default function ComparePage() {
  const providers = [
    {
      name: "shadcn/ui",
      type: "Copy-source",
      installMode: "shadcn add",
      auth: "Public (None)",
      tailwind4: true,
      react19: true,
      motion: "Optional",
      ownership: "Developer Repo",
      mcp: "Native",
    },
    {
      name: "Magic UI",
      type: "Copy-source",
      installMode: "shadcn add @magic-ui/*",
      auth: "Public (None)",
      tailwind4: true,
      react19: true,
      motion: "Motion v12",
      ownership: "Developer Repo",
      mcp: "Native",
    },
    {
      name: "Aceternity UI",
      type: "Copy-source",
      installMode: "shadcn add @aceternity/*",
      auth: "Public (None)",
      tailwind4: true,
      react19: true,
      motion: "Motion v12",
      ownership: "Developer Repo",
      mcp: "Native",
    },
    {
      name: "Ruixen UI",
      type: "Multi-Stack",
      installMode: "Stack-Aware URL",
      auth: "Public (None)",
      tailwind4: true,
      react19: true,
      motion: "None",
      ownership: "Developer Repo",
      mcp: "Native",
    },
    {
      name: "React Bits",
      type: "Copy-source",
      installMode: "shadcn add",
      auth: "Free / Pro License",
      tailwind4: true,
      react19: true,
      motion: "Motion v12",
      ownership: "Developer Repo",
      mcp: "Native",
    },
    {
      name: "21st.dev",
      type: "Marketplace",
      installMode: "21st CLI add",
      auth: "API Key Required",
      tailwind4: true,
      react19: true,
      motion: "Motion",
      ownership: "Developer Repo",
      mcp: "Native",
    },
    {
      name: "MUI (Material UI)",
      type: "Package Library",
      installMode: "npm install @mui/*",
      auth: "Public (None)",
      tailwind4: false,
      react19: true,
      motion: "None",
      ownership: "node_modules",
      mcp: "Native",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Provider Ecosystem Comparison
        </h1>
        <p className="text-sm text-neutral-400">
          Compare architectural styles, prerequisites, authentication models, and source ownership.
        </p>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950/80 border-b border-white/10 text-neutral-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-6 font-bold text-white">Provider</th>
                <th className="py-4 px-6 font-bold">Category</th>
                <th className="py-4 px-6 font-bold">Installation Method</th>
                <th className="py-4 px-6 font-bold">Authentication</th>
                <th className="py-4 px-6 font-bold">Tailwind 4</th>
                <th className="py-4 px-6 font-bold">React 19</th>
                <th className="py-4 px-6 font-bold">Code Ownership</th>
                <th className="py-4 px-6 font-bold">UIShelf MCP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {providers.map((p) => (
                <tr key={p.name} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                    {p.name}
                  </td>
                  <td className="py-4 px-6 text-neutral-400">{p.type}</td>
                  <td className="py-4 px-6 font-mono text-[11px] text-cyan-300">{p.installMode}</td>
                  <td className="py-4 px-6">
                    {p.auth.includes("Required") ? (
                      <span className="text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">
                        🔐 {p.auth}
                      </span>
                    ) : (
                      <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        ✓ {p.auth}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {p.tailwind4 ? (
                      <span className="text-emerald-400 font-bold">✓ Ready</span>
                    ) : (
                      <span className="text-neutral-500">CSS-in-JS</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {p.react19 ? (
                      <span className="text-emerald-400 font-bold">✓ Ready</span>
                    ) : (
                      <span className="text-red-400">✖ React 18</span>
                    )}
                  </td>
                  <td className="py-4 px-6 font-medium text-white">{p.ownership}</td>
                  <td className="py-4 px-6 text-cyan-400 font-semibold">✓ {p.mcp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
