import { describe, it, expect } from "vitest";
import path from "node:path";
import {
  detectProject,
  searchComponents,
  providerManager,
  registryManager,
  UIShelfCore,
} from "@uishelf/core";
import { resolveRuixenVariant } from "@uishelf/resolver";
import { validateSafePath, scanSourceSecurity, computeSourceHash } from "@uishelf/security";

describe("1. Project Stack Detection (@uishelf/project)", () => {
  it("detects Next.js 15, React 19, Tailwind 4, and Motion", () => {
    const fixtureDir = path.resolve(__dirname, "../fixtures/next-tailwind4");
    const project = detectProject({ cwd: fixtureDir });

    expect(project.framework).toBe("next");
    expect(project.reactVersion).toBe("19");
    expect(project.tailwindVersion).toBe("4");
    expect(project.motionEngine).toBe("motion");
    expect(project.aliases["@/*"]).toBe("./src/*");
  });

  it("detects Next.js 14, React 18, Tailwind 3, and Radix UI", () => {
    const fixtureDir = path.resolve(__dirname, "../fixtures/next-tailwind3");
    const project = detectProject({ cwd: fixtureDir });

    expect(project.framework).toBe("next");
    expect(project.reactVersion).toBe("18");
    expect(project.tailwindVersion).toBe("3");
    expect(project.stylingPrimitives).toContain("radix");
  });

  it("detects existing components for Design System Mode", () => {
    const fixtureDir = path.resolve(__dirname, "../fixtures/existing-button");
    const project = detectProject({ cwd: fixtureDir });

    expect(project.existingComponents).toContain("button");
  });
});

describe("2. Ruixen Stack-Aware Multi-Variant Resolution (@uishelf/resolver)", () => {
  it("resolves Tailwind 4 + Base UI variant", () => {
    const component = {
      id: "@ruixen/pricing-table",
      providerId: "ruixen",
      providerItemId: "pricing-table",
      name: "pricing-table",
      title: "Pricing Table",
      description: "Ruixen pricing table",
      type: "block" as const,
      categories: ["pricing"],
      tags: ["pricing"],
      source: { homepage: "https://ruixen.com" },
      install: { mode: "shadcn" as const },
      dependencies: [],
      registryDependencies: [],
      frameworkSupport: { react: "^19", nextjs: true, vite: true, remix: true, rsc: true, tailwind: "any" as const, primitives: [], motion: "none" as const },
      quality: { overall: 90, breakdown: { compatibility: 20, codeQuality: 15, accessibility: 15, maintenance: 10, documentation: 10, performance: 10, dependencyHealth: 10, popularity: 5, previewQuality: 5, reasons: [], deductions: [] } },
      auth: { required: false, type: "none" as const },
      license: "MIT",
      provenance: { provider: "ruixen", license: "MIT" },
      files: [],
    };

    const project: any = {
      tailwindVersion: "4",
      stylingPrimitives: ["base-ui"],
    };

    const resolved = resolveRuixenVariant(component, project);
    expect(resolved.variant).toBe("baseui-tw4");
    expect(resolved.source.registryUrl).toBe("https://ruixen.com/r/baseui/pricing-table");
  });

  it("resolves Tailwind 3 + Radix variant", () => {
    const component = {
      id: "@ruixen/hero",
      providerId: "ruixen",
      providerItemId: "hero",
      name: "hero",
      title: "Hero",
      description: "Ruixen hero",
      type: "block" as const,
      categories: ["hero"],
      tags: ["hero"],
      source: { homepage: "https://ruixen.com" },
      install: { mode: "shadcn" as const },
      dependencies: [],
      registryDependencies: [],
      frameworkSupport: { react: "^18", nextjs: true, vite: true, remix: true, rsc: true, tailwind: "any" as const, primitives: [], motion: "none" as const },
      quality: { overall: 90, breakdown: { compatibility: 20, codeQuality: 15, accessibility: 15, maintenance: 10, documentation: 10, performance: 10, dependencyHealth: 10, popularity: 5, previewQuality: 5, reasons: [], deductions: [] } },
      auth: { required: false, type: "none" as const },
      license: "MIT",
      provenance: { provider: "ruixen", license: "MIT" },
      files: [],
    };

    const project: any = {
      tailwindVersion: "3",
      stylingPrimitives: ["radix"],
    };

    const resolved = resolveRuixenVariant(component, project);
    expect(resolved.variant).toBe("radix-tw3");
    expect(resolved.source.registryUrl).toBe("https://ruixen.com/r/tw3/hero");
  });
});

describe("3. Hybrid Discovery & Search Engine (@uishelf/search)", () => {
  it("searches components across providers without external API keys", async () => {
    const catalog = await registryManager.getComponents();
    const results = await searchComponents({
      query: { query: "pricing", limit: 10 },
      catalog,
    });

    expect(results.total).toBeGreaterThan(0);
    const titles = results.items.map((i) => i.component.title);
    expect(titles.some((t) => t.toLowerCase().includes("pricing"))).toBe(true);
  });

  it("filters search results by provider", async () => {
    const catalog = await registryManager.getComponents();
    const results = await searchComponents({
      query: { query: "text", providers: ["cult-ui"], limit: 10 },
      catalog,
    });

    expect(results.items.length).toBeGreaterThan(0);
    results.items.forEach((item) => {
      expect(item.component.providerId).toBe("cult-ui");
    });
  });
});

describe("4. Security & Untrusted Source Scanner (@uishelf/security)", () => {
  it("rejects path traversal attempts", () => {
    const rootDir = "/workspace/project";
    const res = validateSafePath("../../etc/passwd", rootDir);
    expect(res.safe).toBe(false);
    expect(res.reason).toContain("outside project root");
  });

  it("detects malicious eval and child_process execution", () => {
    const maliciousCode = `
      import React from "react";
      const cp = require("child_process");
      eval("window.stolen = document.cookie");
    `;
    const scan = scanSourceSecurity(maliciousCode);
    expect(scan.passed).toBe(false);
    expect(scan.blockers.length).toBeGreaterThan(0);
  });

  it("passes safe React component code", () => {
    const safeCode = `
      import * as React from "react";
      export function Card({ title }: { title: string }) {
        return <div className="p-4 rounded-xl border">{title}</div>;
      }
    `;
    const scan = scanSourceSecurity(safeCode);
    expect(scan.passed).toBe(true);
    expect(scan.score).toBe(100);
  });
});

describe("5. Dry-Run Planning & Installation (@uishelf/core)", () => {
  it("calculates install plan with files and dependencies", async () => {
    const core = new UIShelfCore({ cwd: path.resolve(__dirname, "../fixtures/next-tailwind4") });
    const plan = await core.plan("@magic-ui/magic-card", { dryRun: true });

    expect(plan).not.toBeNull();
    expect(plan!.files.length).toBeGreaterThan(0);
    expect(plan!.files[0].path).toContain("magic-card.tsx");
    expect(plan!.dryRun).toBe(true);
  });

  it("runs doctor diagnostic", async () => {
    const core = new UIShelfCore({ cwd: path.resolve(__dirname, "../fixtures/next-tailwind4") });
    const doctor = await core.runDoctor();

    expect(doctor.project.framework).toBe("next");
    expect(doctor.providers["magic-ui"].status).toBe("healthy");
  });
});
