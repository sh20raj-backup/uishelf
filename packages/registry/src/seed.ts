import { type UIShelfComponent, type ProviderMetadata } from "@uishelf/schema";

export const CURATED_PROVIDERS: ProviderMetadata[] = [
  {
    id: "shadcn",
    name: "shadcn/ui",
    type: "shadcn-registry",
    description: "Beautifully designed components that you can copy and paste into your apps.",
    homepage: "https://ui.shadcn.com",
    documentation: "https://ui.shadcn.com/docs",
    repository: "https://github.com/shadcn-ui/ui",
    registryUrl: "https://ui.shadcn.com/r/styles/default/{name}.json",
    namespace: "@shadcn",
    trustLevel: "official",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 65,
    variants: ["default", "new-york"],
    prerequisites: ["Tailwind CSS", "Radix Primitives"],
    searchMethod: "Remote Registry Index (JSON)",
    searchEndpoint: "https://ui.shadcn.com/r/index.json",
    installCommandTemplate: "npx shadcn@latest add {name} --yes",
    supportedStacks: ["Tailwind v4", "Tailwind v3", "React 19", "Radix Primitives"],
    features: ["WAI-ARIA accessible", "Copy-paste architecture", "Zero runtime CSS", "TypeScript"],
  },
  {
    id: "magic-ui",
    name: "Magic UI",
    type: "shadcn-registry",
    description: "200+ free and open-source animated components built with React, Typescript, Tailwind CSS, and Motion.",
    homepage: "https://magicui.design",
    documentation: "https://magicui.design/docs",
    repository: "https://github.com/magicuidesign/magicui",
    registryUrl: "https://magicui.design/r/{name}.json",
    namespace: "@magic-ui",
    trustLevel: "verified",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 140,
    variants: [],
    prerequisites: ["Tailwind CSS", "Motion"],
    searchMethod: "Remote Registry Index (JSON)",
    searchEndpoint: "https://magicui.design/r/index.json",
    installCommandTemplate: "npx shadcn@latest add \"https://magicui.design/r/{name}.json\" --yes",
    supportedStacks: ["Tailwind v4", "Tailwind v3", "React 19", "Motion"],
    features: ["200+ Animated components", "Glow & Spotlight effects", "Canvas shaders", "Bento grids"],
  },
  {
    id: "aceternity",
    name: "Aceternity UI",
    type: "shadcn-registry",
    description: "Trending animated components and blocks for modern websites and SaaS landing pages.",
    homepage: "https://ui.aceternity.com",
    documentation: "https://ui.aceternity.com/components",
    repository: "https://github.com/aceternity/ui",
    registryUrl: "https://ui.aceternity.com/registry/{name}.json",
    namespace: "@aceternity",
    trustLevel: "verified",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 95,
    variants: [],
    prerequisites: ["Tailwind CSS", "Motion"],
    searchMethod: "Remote Registry Index (JSON)",
    searchEndpoint: "https://ui.aceternity.com/r/index.json",
    installCommandTemplate: "npx shadcn@latest add \"https://ui.aceternity.com/r/{name}.json\" --yes",
    supportedStacks: ["Tailwind v4", "Tailwind v3", "React 19", "Motion"],
    features: ["Radiant Hero sections", "3D Pin & Sparkles", "Lamp lighting effect", "GPU accelerated shaders"],
  },
  {
    id: "21st",
    name: "21st",
    type: "cli",
    description: "The component marketplace for developers. Discover, publish and install React components with the 21st CLI.",
    homepage: "https://21st.dev",
    documentation: "https://21st.dev/docs",
    repository: "https://github.com/21st-dev",
    namespace: "@21st",
    trustLevel: "verified",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: true },
    authRequired: true,
    authEnvVar: "API_KEY_21ST",
    componentCount: 2200,
    variants: [],
    prerequisites: ["21st CLI", "API Key"],
    searchMethod: "Marketplace API & Registry Index",
    searchEndpoint: "https://21st.dev/api/registry/index",
    installCommandTemplate: "npx 21st@latest add {name}",
    supportedStacks: ["Tailwind v4", "Tailwind v3", "React 19", "Motion"],
    features: ["Community marketplace", "Creator monetization", "CLI multi-style", "Instant previews"],
  },
  {
    id: "react-bits",
    name: "React Bits",
    type: "shadcn-registry",
    description: "An extensive library of animated, interactive & fully customizable React components.",
    homepage: "https://reactbits.dev",
    documentation: "https://reactbits.dev/docs",
    repository: "https://github.com/DavidHDev/react-bits",
    namespace: "@react-bits",
    trustLevel: "verified",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 85,
    variants: ["free", "pro"],
    prerequisites: ["Tailwind CSS", "Motion"],
    searchMethod: "Remote Registry Index (JSON)",
    searchEndpoint: "https://reactbits.dev/r/index.json",
    installCommandTemplate: "npx shadcn@latest add \"https://reactbits.dev/r/{name}.json\" --yes",
    supportedStacks: ["Tailwind v4", "Tailwind v3", "React 19", "Motion"],
    features: ["Physics text animations", "Magnetic cursor effects", "Hyperspeed canvas", "Ballpit simulation"],
  },
  {
    id: "ruixen",
    name: "Ruixen UI",
    type: "shadcn-registry",
    description: "Modern components supporting multiple stack variants: Tailwind 4, Tailwind 3, Radix UI and Base UI.",
    homepage: "https://ruixen.com",
    documentation: "https://ruixen.com/docs",
    registryUrl: "https://ruixen.com/r/{name}",
    namespace: "@ruixen",
    trustLevel: "verified",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 110,
    variants: ["radix-tw4", "radix-tw3", "baseui-tw4", "baseui-tw3"],
    prerequisites: ["Tailwind CSS"],
    searchMethod: "Multi-Stack Registry API",
    searchEndpoint: "https://ruixen.com/r/index.json",
    installCommandTemplate: "npx shadcn@latest add \"https://ruixen.com/r/{name}\" --yes",
    supportedStacks: ["Tailwind v4", "Tailwind v3", "Radix UI", "Base UI", "React 19"],
    features: ["Multi-stack variant selector", "Radix & Base UI interchangeable", "Tailwind 3 & 4 compatible"],
  },
  {
    id: "cult-ui",
    name: "Cult UI",
    type: "shadcn-registry",
    description: "Experimental, tactile and animated UI components for creative developers.",
    homepage: "https://cult-ui.com",
    documentation: "https://cult-ui.com/docs",
    registryUrl: "https://cult-ui.com/r/{name}.json",
    namespace: "@cult-ui",
    trustLevel: "verified",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 45,
    variants: [],
    prerequisites: ["Tailwind CSS", "Motion"],
    searchMethod: "Remote Registry Index (JSON)",
    searchEndpoint: "https://cult-ui.com/r/index.json",
    installCommandTemplate: "npx shadcn@latest add \"https://cult-ui.com/r/{name}.json\" --yes",
    supportedStacks: ["Tailwind v4", "Tailwind v3", "React 19", "Motion"],
    features: ["Tactile neumorphism", "Cyberpunk interfaces", "Dynamic audio/haptics", "Creative web blocks"],
  },
  {
    id: "reui",
    name: "ReUI",
    type: "shadcn-registry",
    description: "Clean, high-performance UI blocks and banner systems for SaaS applications.",
    homepage: "https://reui.io",
    documentation: "https://reui.io/docs",
    registryUrl: "https://reui.io/r/{name}.json",
    namespace: "@reui",
    trustLevel: "verified",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 70,
    variants: ["free", "pro"],
    prerequisites: ["Tailwind CSS"],
    searchMethod: "Remote Registry Index (JSON)",
    searchEndpoint: "https://reui.io/r/index.json",
    installCommandTemplate: "npx shadcn@latest add \"https://reui.io/r/{name}.json\" --yes",
    supportedStacks: ["Tailwind v4", "Tailwind v3", "React 19"],
    features: ["SaaS hero blocks", "Conversion announcement banners", "Micro-feedback buttons"],
  },
  {
    id: "animate-ui",
    name: "Animate UI",
    type: "shadcn-registry",
    description: "Smooth, spring-physics micro-interactions and animated primitives.",
    homepage: "https://animate-ui.com",
    documentation: "https://animate-ui.com/docs",
    registryUrl: "https://animate-ui.com/r/{name}.json",
    namespace: "@animate-ui",
    trustLevel: "verified",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 60,
    variants: [],
    prerequisites: ["Tailwind CSS", "Motion"],
    searchMethod: "Remote Registry Index (JSON)",
    searchEndpoint: "https://animate-ui.com/r/index.json",
    installCommandTemplate: "npx shadcn@latest add \"https://animate-ui.com/r/{name}.json\" --yes",
    supportedStacks: ["Tailwind v4", "Tailwind v3", "React 19", "Motion"],
    features: ["Spring physics primitives", "Morphing modal dialogs", "Micro-interaction triggers"],
  },
  {
    id: "kokonut",
    name: "Kokonut UI",
    type: "shadcn-registry",
    description: "Delightful modern UI elements, AI inputs, commands, and dashboards.",
    homepage: "https://kokonutui.com",
    documentation: "https://kokonutui.com/docs",
    registryUrl: "https://kokonutui.com/r/{name}.json",
    namespace: "@kokonutui",
    trustLevel: "verified",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 50,
    variants: [],
    prerequisites: ["Tailwind CSS", "Lucide Icons"],
    searchMethod: "Remote Registry Index (JSON)",
    searchEndpoint: "https://kokonutui.com/r/index.json",
    installCommandTemplate: "npx shadcn@latest add \"https://kokonutui.com/r/{name}.json\" --yes",
    supportedStacks: ["Tailwind v4", "Tailwind v3", "React 19", "Lucide Icons"],
    features: ["AI prompt inputs", "Interactive command bars", "Dashboard widgets", "Card carousels"],
  },
  {
    id: "mui",
    name: "Material UI (MUI)",
    type: "package-library",
    description: "MUI is a comprehensive library of React UI components implementing Google's Material Design.",
    homepage: "https://mui.com",
    documentation: "https://mui.com/material-ui/getting-started/",
    repository: "https://github.com/mui/material-ui",
    trustLevel: "official",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 80,
    variants: [],
    prerequisites: ["@mui/material", "@emotion/react", "@emotion/styled"],
    searchMethod: "NPM Registry Search API & Package Manifest",
    searchEndpoint: "https://registry.npmjs.org/-/v1/search?text=@mui/material",
    installCommandTemplate: "pnpm add @mui/material @emotion/react @emotion/styled",
    supportedStacks: ["Emotion", "MUI System", "React 18/19", "TypeScript"],
    features: ["Google Material Design 3", "Enterprise DataGrid", "Comprehensive form controls", "Deep theming"],
  },
  {
    id: "mantine",
    name: "Mantine",
    type: "package-library",
    description: "A fully featured React components library with native dark theme and extensive hooks.",
    homepage: "https://mantine.dev",
    documentation: "https://mantine.dev/getting-started/",
    repository: "https://github.com/mantinedev/mantine",
    trustLevel: "official",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 100,
    variants: [],
    prerequisites: ["@mantine/core", "@mantine/hooks", "PostCSS"],
    searchMethod: "NPM Registry Search API & Package Manifest",
    searchEndpoint: "https://registry.npmjs.org/-/v1/search?text=@mantine/core",
    installCommandTemplate: "pnpm add @mantine/core @mantine/hooks",
    supportedStacks: ["PostCSS", "CSS Modules", "React 18/19", "TypeScript"],
    features: ["100+ components", "50+ custom hooks", "Zero runtime CSS overhead", "Native dark theme"],
  },
  {
    id: "chakra",
    name: "Chakra UI",
    type: "package-library",
    description: "Simple, modular and accessible component library that gives you the building blocks for React apps.",
    homepage: "https://chakra-ui.com",
    documentation: "https://chakra-ui.com/docs",
    repository: "https://github.com/chakra-ui/chakra-ui",
    trustLevel: "official",
    capabilities: { search: true, list: true, inspect: true, install: true, preview: true, auth: false },
    authRequired: false,
    componentCount: 75,
    variants: [],
    prerequisites: ["@chakra-ui/react", "@emotion/react", "Node 20+"],
    searchMethod: "NPM Registry Search API & Package Manifest",
    searchEndpoint: "https://registry.npmjs.org/-/v1/search?text=@chakra-ui/react",
    installCommandTemplate: "pnpm add @chakra-ui/react @emotion/react",
    supportedStacks: ["Emotion", "React 18/19", "TypeScript"],
    features: ["Style props DX", "Accessible WAI-ARIA", "Composable layouts", "Flexible theming"],
  },
];

export const SEED_COMPONENTS: UIShelfComponent[] = [
  // 1. Magic UI / Magic Card
  {
    id: "@magic-ui/magic-card",
    providerId: "magic-ui",
    providerItemId: "magic-card",
    name: "magic-card",
    title: "Magic Card",
    description: "A spotlight card with animated gradient border and interactive hover glow effects.",
    type: "component",
    categories: ["cards", "effects", "animations"],
    tags: ["card", "spotlight", "hover", "motion", "tailwind"],
    preview: {
      demoUrl: "https://magicui.design/docs/components/magic-card",
      image: "https://magicui.design/preview/magic-card.png",
    },
    source: {
      homepage: "https://magicui.design",
      registryUrl: "https://magicui.design/r/magic-card.json",
      repository: "https://github.com/magicuidesign/magicui",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @magic-ui/magic-card",
    },
    dependencies: [{ name: "motion", version: "^12.0.0", isDev: false, peer: false }],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "motion",
    },
    quality: {
      overall: 96,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 14,
        maintenance: 10,
        documentation: 10,
        performance: 9,
        dependencyHealth: 9,
        popularity: 5,
        previewQuality: 5,
        reasons: ["Exact match", "Next.js & React 19 ready", "Motion v12 supported"],
        deductions: [],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "Magic UI",
      sourceUrl: "https://magicui.design/docs/components/magic-card",
      license: "MIT",
    },
    files: [
      {
        path: "components/ui/magic-card.tsx",
        content: `"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
  ...props
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn("group relative flex size-full rounded-xl bg-neutral-900 p-6 text-white border border-neutral-800", className)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate\`radial-gradient(\${gradientSize}px circle at \${mouseX}px \${mouseY}px, \${gradientColor}, transparent 100%)\`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}`,
      },
    ],
  },

  // 2. Magic UI / Animated Pricing Section
  {
    id: "@magic-ui/pricing-section",
    providerId: "magic-ui",
    providerItemId: "pricing-section",
    name: "pricing-section",
    title: "Animated Pricing Section",
    description: "Complete animated pricing section for SaaS products with monthly/annual billing toggle.",
    type: "block",
    categories: ["pricing", "sections", "blocks", "saas"],
    tags: ["pricing", "billing", "saas", "cards", "animated", "toggle"],
    preview: {
      demoUrl: "https://magicui.design/docs/blocks/pricing",
      image: "https://magicui.design/preview/pricing.png",
    },
    source: {
      homepage: "https://magicui.design",
      registryUrl: "https://magicui.design/r/pricing-section.json",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @magic-ui/pricing-section",
    },
    dependencies: [
      { name: "motion", version: "^12.0.0", isDev: false, peer: false },
      { name: "lucide-react", version: "^1.0.0", isDev: false, peer: false },
    ],
    registryDependencies: ["button", "badge"],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: ["radix"],
      motion: "motion",
    },
    quality: {
      overall: 96,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 14,
        maintenance: 10,
        documentation: 10,
        performance: 9,
        dependencyHealth: 9,
        popularity: 5,
        previewQuality: 5,
        reasons: ["Exact semantic match for pricing", "Motion supported", "Clean accessible tabs"],
        deductions: [],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "Magic UI",
      sourceUrl: "https://magicui.design/docs/blocks/pricing",
      license: "MIT",
    },
    files: [
      {
        path: "components/ui/pricing-section.tsx",
        content: `"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const tiers = [
    { name: "Starter", price: annual ? 19 : 25, features: ["5 Projects", "Community Support", "Basic Analytics"] },
    { name: "Pro", price: annual ? 49 : 59, popular: true, features: ["Unlimited Projects", "Priority Support", "Custom Domains", "Advanced Analytics"] },
    { name: "Enterprise", price: annual ? 199 : 249, features: ["Dedicated Account Manager", "SLA Guarantee", "Custom Integrations", "Audit Logs"] },
  ];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
      <p className="text-neutral-400 mb-8">Choose the plan that's right for your growing business.</p>
      <div className="flex items-center justify-center gap-3 mb-12">
        <span className={!annual ? "font-semibold" : "text-neutral-400"}>Monthly</span>
        <button
          type="button"
          onClick={() => setAnnual(!annual)}
          className="w-14 h-8 bg-neutral-800 rounded-full p-1 transition-colors border border-neutral-700"
        >
          <motion.div
            className="w-6 h-6 bg-white rounded-full"
            animate={{ x: annual ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span className={annual ? "font-semibold" : "text-neutral-400"}>Annual (Save 20%)</span>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((t) => (
          <div key={t.name} className={\`p-8 rounded-2xl border bg-neutral-950 text-left \${t.popular ? "border-primary shadow-xl relative" : "border-neutral-800"}\`}>
            {t.popular && <span className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">Most Popular</span>}
            <h3 className="text-xl font-bold mb-2">{t.name}</h3>
            <div className="text-4xl font-extrabold mb-6">\${t.price}<span className="text-sm font-normal text-neutral-400">/mo</span></div>
            <ul className="space-y-3 mb-8">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-neutral-300">
                  <Check className="size-4 text-emerald-400" /> {f}
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={t.popular ? "default" : "outline"}>Get Started</Button>
          </div>
        ))}
      </div>
    </section>
  );
}`,
      },
    ],
  },

  // 3. Aceternity UI / 3d-card
  {
    id: "@aceternity/3d-card",
    providerId: "aceternity",
    providerItemId: "3d-card",
    name: "3d-card",
    title: "3D Card",
    description: "Interactive 3D perspective card container with mouse parallax tracking.",
    type: "component",
    categories: ["cards", "3d", "effects"],
    tags: ["3d", "card", "parallax", "perspective", "hover"],
    preview: {
      demoUrl: "https://ui.aceternity.com/components/3d-card-effect",
      image: "https://ui.aceternity.com/previews/3d-card.png",
    },
    source: {
      homepage: "https://ui.aceternity.com",
      registryUrl: "https://ui.aceternity.com/registry/3d-card.json",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @aceternity/3d-card",
    },
    dependencies: [],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 95,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 13,
        maintenance: 10,
        documentation: 10,
        performance: 9,
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        reasons: ["Zero external dependencies", "Pure CSS 3D perspective", "Next.js ready"],
        deductions: [],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "Aceternity UI",
      sourceUrl: "https://ui.aceternity.com/registry/3d-card.json",
      license: "MIT",
    },
    files: [
      {
        path: "components/ui/3d-card.tsx",
        content: `"use client";
import React, { createContext, useState, useContext, useRef } from "react";
import { cn } from "@/lib/utils";

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = \`rotateY(\${x}deg) rotateX(\${-y}deg)\`;
  };

  const handleMouseEnter = () => setIsMouseEntered(true);
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div className={cn("flex items-center justify-center", containerClassName)} style={{ perspective: "1000px" }}>
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("flex items-center justify-center relative transition-all duration-200 ease-linear", className)}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", className)}>{children}</div>;
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  ...rest
}: any) => {
  return (
    <Tag
      className={cn("w-fit transition duration-200 ease-linear", className)}
      style={{ transform: \`translateX(\${translateX}px) translateY(\${translateY}px) translateZ(\${translateZ}px)\` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};`,
      },
    ],
  },

  // 4. Ruixen UI / Pricing Table (Multi-variant: TW4 vs TW3, Radix vs Base UI)
  {
    id: "@ruixen/pricing-table",
    providerId: "ruixen",
    providerItemId: "pricing-table",
    name: "pricing-table",
    title: "Ruixen Responsive Pricing Table",
    description: "Responsive multi-tier pricing grid supporting Tailwind 4/3 and Radix/Base UI variants.",
    type: "block",
    categories: ["pricing", "tables", "blocks"],
    tags: ["pricing", "table", "base-ui", "radix", "tailwind4", "tailwind3"],
    preview: {
      demoUrl: "https://ruixen.com/components/pricing-table",
      image: "https://ruixen.com/preview/pricing-table.png",
    },
    source: {
      homepage: "https://ruixen.com",
      registryUrl: "https://ruixen.com/r/pricing-table",
    },
    install: {
      mode: "shadcn",
      command: 'npx shadcn@latest add "https://ruixen.com/r/pricing-table"',
    },
    dependencies: [{ name: "lucide-react", version: "^1.0.0", isDev: false, peer: false }],
    registryDependencies: ["button"],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: ["radix", "base-ui"],
      motion: "none",
    },
    quality: {
      overall: 94,
      breakdown: {
        compatibility: 20,
        codeQuality: 14,
        accessibility: 15,
        maintenance: 10,
        documentation: 9,
        performance: 9,
        dependencyHealth: 9,
        popularity: 4,
        previewQuality: 4,
        reasons: ["Stack-aware multi-variant support", "Tailwind 4 & 3 compatible", "Radix & Base UI supported"],
        deductions: [],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "Ruixen UI",
      sourceUrl: "https://ruixen.com/r/pricing-table",
      license: "MIT",
    },
    files: [
      {
        path: "components/ui/ruixen-pricing-table.tsx",
        content: `import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RuixenPricingTable() {
  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-4">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-950">
          <h3 className="text-lg font-semibold">Standard</h3>
          <p className="text-3xl font-bold my-4">$29<span className="text-sm text-neutral-400">/mo</span></p>
          <ul className="space-y-2 text-sm text-neutral-300 mb-6">
            <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> 5 Team Members</li>
            <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> 20GB Storage</li>
          </ul>
          <Button className="w-full">Select Plan</Button>
        </div>
      </div>
    </div>
  );
}`,
      },
    ],
  },

  // 5. 21st / Interactive Pricing Card (Auth Required on Install)
  {
    id: "@21st/pricing-card",
    providerId: "21st",
    providerItemId: "pricing-card",
    name: "pricing-card",
    title: "21st Glassmorphic Pricing Card",
    description: "Frosted glass pricing tier with subtle particle background and interactive CTA.",
    type: "block",
    categories: ["pricing", "cards", "glassmorphism"],
    tags: ["pricing", "card", "glass", "21st", "animated"],
    preview: {
      demoUrl: "https://21st.dev/community/pricing-card",
      image: "https://21st.dev/preview/pricing-card.png",
    },
    source: {
      homepage: "https://21st.dev",
      registryUrl: "https://21st.dev/r/pricing-card.json",
    },
    install: {
      mode: "cli",
      command: "npx @21st-dev/cli add pricing-card",
    },
    dependencies: [{ name: "motion", version: "^12.0.0", isDev: false, peer: false }],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "motion",
    },
    quality: {
      overall: 93,
      breakdown: {
        compatibility: 19,
        codeQuality: 14,
        accessibility: 13,
        maintenance: 10,
        documentation: 9,
        performance: 9,
        dependencyHealth: 9,
        popularity: 5,
        previewQuality: 5,
        reasons: ["Rich community component", "Motion animated", "Next.js compatible"],
        deductions: ["Requires 21st CLI and API key for installation"],
      },
    },
    auth: {
      required: true,
      type: "api-key",
      envVar: "API_KEY_21ST",
      promptUrl: "https://21st.dev/settings/api-keys",
      description: "21st requires an API key for component installation",
    },
    license: "MIT",
    provenance: {
      provider: "21st",
      sourceUrl: "https://21st.dev/community/pricing-card",
      license: "MIT",
    },
    files: [
      {
        path: "components/ui/21st-pricing-card.tsx",
        content: `"use client";
import React from "react";
import { motion } from "motion/react";

export function TwentyFirstPricingCard() {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white">
      <h3 className="text-2xl font-bold">21st Pro Plan</h3>
      <p className="text-4xl font-extrabold my-4">$79<span className="text-sm font-normal text-neutral-400">/mo</span></p>
      <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-medium shadow-lg hover:opacity-90">Get Started</button>
    </motion.div>
  );
}`,
      },
    ],
  },

  // 6. React Bits / Blur Text (Free)
  {
    id: "@react-bits/blur-text",
    providerId: "react-bits",
    providerItemId: "blur-text",
    name: "blur-text",
    title: "Blur Text Animation",
    description: "Smooth blur and fade reveal animation for typography, titles and hero headlines.",
    type: "component",
    categories: ["typography", "animations", "hero"],
    tags: ["text", "blur", "reveal", "motion", "headline"],
    preview: {
      demoUrl: "https://reactbits.dev/text-animations/blur-text",
      image: "https://reactbits.dev/previews/blur-text.png",
    },
    source: {
      homepage: "https://reactbits.dev",
      registryUrl: "https://reactbits.dev/r/blur-text.json",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @react-bits/blur-text",
    },
    dependencies: [{ name: "motion", version: "^12.0.0", isDev: false, peer: false }],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "motion",
    },
    quality: {
      overall: 95,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 14,
        maintenance: 10,
        documentation: 9,
        performance: 9,
        dependencyHealth: 9,
        popularity: 5,
        previewQuality: 4,
        reasons: ["Lightweight spring physics", "No API key needed (Public Free)"],
        deductions: [],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "React Bits",
      sourceUrl: "https://reactbits.dev/text-animations/blur-text",
      license: "MIT",
    },
    files: [
      {
        path: "components/ui/blur-text.tsx",
        content: `"use client";
import { motion } from "motion/react";

export function BlurText({ text = "Welcome to UIShelf", className = "" }: { text?: string; className?: string }) {
  const words = text.split(" ");
  return (
    <div className={\`flex flex-wrap gap-2 \${className}\`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 10 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}`,
      },
    ],
  },

  // 7. React Bits Pro / Hero 7 (License Key Required on Install)
  {
    id: "@reactbits-pro/hero-7",
    providerId: "react-bits",
    providerItemId: "hero-7",
    name: "hero-7",
    title: "React Bits Pro Hero 7",
    description: "Cinematic full-screen hero section with interactive 3D particle mesh and typography.",
    type: "block",
    categories: ["hero", "sections", "pro"],
    tags: ["hero", "pro", "3d", "particles", "cinematic"],
    preview: {
      demoUrl: "https://reactbits.dev/pro/hero-7",
      image: "https://reactbits.dev/previews/hero-7.png",
    },
    source: {
      homepage: "https://reactbits.dev/pro",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @reactbits-pro/hero-7",
    },
    dependencies: [{ name: "motion", version: "^12.0.0", isDev: false, peer: false }],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "motion",
    },
    quality: {
      overall: 94,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 13,
        maintenance: 10,
        documentation: 10,
        performance: 8,
        dependencyHealth: 9,
        popularity: 5,
        previewQuality: 4,
        reasons: ["Premium verified block", "High visual impact"],
        deductions: ["Requires REACTBITS_LICENSE_KEY for installation"],
      },
    },
    auth: {
      required: true,
      type: "license-key",
      envVar: "REACTBITS_LICENSE_KEY",
      promptUrl: "https://reactbits.dev/account/licenses",
      description: "React Bits Pro requires a valid license key",
    },
    license: "Commercial",
    provenance: {
      provider: "React Bits Pro",
      sourceUrl: "https://reactbits.dev/pro/hero-7",
      license: "Commercial",
    },
    files: [
      {
        path: "components/ui/hero-7.tsx",
        content: `export function HeroSeven() {
  return <div className="py-24 text-center"><h1 className="text-6xl font-black">React Bits Pro Hero</h1></div>;
}`,
      },
    ],
  },

  // 8. Cult UI / Text GIF
  {
    id: "@cult-ui/text-gif",
    providerId: "cult-ui",
    providerItemId: "text-gif",
    name: "text-gif",
    title: "Text GIF Background",
    description: "Creative typography mask rendering animated GIFs behind text characters.",
    type: "component",
    categories: ["typography", "creative", "effects"],
    tags: ["text", "gif", "mask", "creative", "cult-ui"],
    preview: {
      demoUrl: "https://cult-ui.com/components/text-gif",
    },
    source: {
      homepage: "https://cult-ui.com",
      registryUrl: "https://cult-ui.com/r/text-gif.json",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @cult-ui/text-gif",
    },
    dependencies: [],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 92,
      breakdown: {
        compatibility: 19,
        codeQuality: 14,
        accessibility: 12,
        maintenance: 9,
        documentation: 9,
        performance: 10,
        dependencyHealth: 10,
        popularity: 4,
        previewQuality: 5,
        reasons: ["Zero external dependencies", "Pure CSS mask"],
        deductions: ["Prerequisite: Tailwind background clip"],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "Cult UI",
      sourceUrl: "https://cult-ui.com/r/text-gif.json",
      license: "MIT",
    },
    files: [
      {
        path: "components/ui/text-gif.tsx",
        content: `export function TextGif({ text, gifUrl }: { text: string; gifUrl: string }) {
  return (
    <h1
      className="text-7xl font-black bg-clip-text text-transparent bg-cover bg-center"
      style={{ backgroundImage: \`url(\${gifUrl})\` }}
    >
      {text}
    </h1>
  );
}`,
      },
    ],
  },

  // 9. Animate UI / Sliding Number
  {
    id: "@animate-ui/sliding-number",
    providerId: "animate-ui",
    providerItemId: "sliding-number",
    name: "sliding-number",
    title: "Sliding Number Counter",
    description: "Smooth spring-animated odometer and rolling number counter primitive.",
    type: "primitive",
    categories: ["numbers", "primitives", "animations"],
    tags: ["counter", "odometer", "number", "spring", "stats"],
    preview: {
      demoUrl: "https://animate-ui.com/primitives/sliding-number",
    },
    source: {
      homepage: "https://animate-ui.com",
      registryUrl: "https://animate-ui.com/r/sliding-number.json",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @animate-ui/sliding-number",
    },
    dependencies: [{ name: "motion", version: "^12.0.0", isDev: false, peer: false }],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "motion",
    },
    quality: {
      overall: 95,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 14,
        maintenance: 10,
        documentation: 9,
        performance: 9,
        dependencyHealth: 9,
        popularity: 4,
        previewQuality: 5,
        reasons: ["Spring-based smooth interpolation", "A11y aria-live support"],
        deductions: [],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "Animate UI",
      sourceUrl: "https://animate-ui.com/r/sliding-number.json",
      license: "MIT",
    },
    files: [
      {
        path: "components/ui/sliding-number.tsx",
        content: `"use client";
import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export function SlidingNumber({ value }: { value: number }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span aria-live="polite">{display}</motion.span>;
}`,
      },
    ],
  },

  // 10. MUI / Button (Package-Library Adapter)
  {
    id: "mui:Button",
    providerId: "mui",
    providerItemId: "Button",
    name: "Button",
    title: "MUI Material Button",
    description: "Material Design interactive button with ripple effect, elevation and color variants.",
    type: "component",
    categories: ["buttons", "material-design"],
    tags: ["mui", "material", "button", "ripple", "package-library"],
    source: {
      homepage: "https://mui.com",
      repository: "https://github.com/mui/material-ui",
    },
    install: {
      mode: "npm",
      packageName: "@mui/material @emotion/react @emotion/styled",
      command: "npm install @mui/material @emotion/react @emotion/styled",
    },
    dependencies: [
      { name: "@mui/material", version: "^6.0.0", isDev: false, peer: false },
      { name: "@emotion/react", version: "^11.13.0", isDev: false, peer: false },
      { name: "@emotion/styled", version: "^11.13.0", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: false,
      tailwind: "none",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 93,
      breakdown: {
        compatibility: 18,
        codeQuality: 15,
        accessibility: 15,
        maintenance: 10,
        documentation: 10,
        performance: 8,
        dependencyHealth: 8,
        popularity: 5,
        previewQuality: 4,
        reasons: ["Official Google Material Design", "Robust keyboard accessibility"],
        deductions: ["Requires emotion runtime CSS-in-JS dependencies"],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "Material UI (MUI)",
      sourceUrl: "https://mui.com/material-ui/react-button/",
      license: "MIT",
    },
    files: [],
  },

  // 11. Mantine / Modal (Package-Library Adapter)
  {
    id: "mantine:Modal",
    providerId: "mantine",
    providerItemId: "Modal",
    name: "Modal",
    title: "Mantine Accessible Modal",
    description: "Accessible overlay dialog with focus trap, transition animations and custom scrollbars.",
    type: "component",
    categories: ["modals", "dialogs", "overlays"],
    tags: ["mantine", "modal", "dialog", "focus-trap", "accessible"],
    source: {
      homepage: "https://mantine.dev",
      repository: "https://github.com/mantinedev/mantine",
    },
    install: {
      mode: "npm",
      packageName: "@mantine/core @mantine/hooks",
      command: "npm install @mantine/core @mantine/hooks",
    },
    dependencies: [
      { name: "@mantine/core", version: "^7.0.0", isDev: false, peer: false },
      { name: "@mantine/hooks", version: "^7.0.0", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: false,
      tailwind: "none",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 92,
      breakdown: {
        compatibility: 18,
        codeQuality: 15,
        accessibility: 15,
        maintenance: 10,
        documentation: 10,
        performance: 8,
        dependencyHealth: 8,
        popularity: 4,
        previewQuality: 4,
        reasons: ["Focus trap and WAI-ARIA modal dialog", "Dark mode built-in"],
        deductions: ["Prerequisite: PostCSS Mantine setup"],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "Mantine",
      sourceUrl: "https://mantine.dev/core/modal/",
      license: "MIT",
    },
    files: [],
  },

  // 12. Chakra UI / Accordion (Package-Library Adapter)
  {
    id: "chakra:Accordion",
    providerId: "chakra",
    providerItemId: "Accordion",
    name: "Accordion",
    title: "Chakra UI Accordion",
    description: "Accessible collapsible accordion system with smooth height transitions.",
    type: "component",
    categories: ["accordion", "disclosure", "layout"],
    tags: ["chakra", "accordion", "collapse", "snippets"],
    source: {
      homepage: "https://chakra-ui.com",
      repository: "https://github.com/chakra-ui/chakra-ui",
    },
    install: {
      mode: "npm",
      packageName: "@chakra-ui/react @emotion/react",
      command: "npm install @chakra-ui/react @emotion/react",
    },
    dependencies: [
      { name: "@chakra-ui/react", version: "^3.0.0", isDev: false, peer: false },
      { name: "@emotion/react", version: "^11.13.0", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: false,
      tailwind: "none",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 91,
      breakdown: {
        compatibility: 17,
        codeQuality: 14,
        accessibility: 15,
        maintenance: 10,
        documentation: 10,
        performance: 8,
        dependencyHealth: 8,
        popularity: 5,
        previewQuality: 4,
        reasons: ["Full keyboard navigation", "Snippet generation supported"],
        deductions: ["Requires Node 20+"],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "Chakra UI",
      sourceUrl: "https://chakra-ui.com",
      license: "MIT",
    },
    files: [],
  },

  // 13. shadcn/ui / button
  {
    id: "@shadcn/button",
    providerId: "shadcn",
    providerItemId: "button",
    name: "button",
    title: "Button",
    description: "Displays a button or a component that looks like a button with multiple variants and sizes.",
    type: "component",
    categories: ["buttons", "primitives"],
    tags: ["button", "shadcn", "radix", "cva", "tailwind"],
    preview: {
      demoUrl: "https://ui.shadcn.com/docs/components/button",
      image: "https://ui.shadcn.com/preview/button.png",
    },
    source: {
      homepage: "https://ui.shadcn.com",
      registryUrl: "https://ui.shadcn.com/r/styles/default/button.json",
      repository: "https://github.com/shadcn-ui/ui",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add button",
    },
    dependencies: [
      { name: "@radix-ui/react-slot", version: "^1.1.0", isDev: false, peer: false },
      { name: "class-variance-authority", version: "^0.7.1", isDev: false, peer: false },
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.5", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: ["radix"],
      motion: "none",
    },
    quality: {
      overall: 99,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 15,
        maintenance: 10,
        documentation: 10,
        performance: 10,
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 4,
        reasons: ["Canonical gold standard primitive", "Slot polymorphic support", "Zero runtime overhead"],
        deductions: [],
      },
    },
    auth: { required: false, type: "none" },
    license: "MIT",
    provenance: {
      provider: "shadcn/ui",
      sourceUrl: "https://ui.shadcn.com/r/styles/default/button.json",
      license: "MIT",
    },
    files: [
      {
        path: "components/ui/button.tsx",
        content: `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };`,
      },
    ],
  },

  // 14. Magic UI / Shimmer Button
  {
    id: "@magic-ui/shimmer-button",
    provenance: { provider: "Magic UI", sourceUrl: "https://magicui.design/docs/components/shimmer-button", license: "MIT" },
    providerId: "magic-ui",
    providerItemId: "shimmer-button",
    name: "shimmer-button",
    title: "Shimmer Button",
    description: "A dynamic, high-performance button with a moving iridescent shimmer border animation.",
    type: "component",
    categories: ["buttons", "effects", "animations"],
    tags: ["button", "shimmer", "glow", "animated", "magic-ui", "tailwind"],
    preview: {
      demoUrl: "https://magicui.design/docs/components/shimmer-button",
      image: "https://magicui.design/preview/shimmer-button.png",
    },
    source: {
      homepage: "https://magicui.design",
      registryUrl: "https://magicui.design/r/shimmer-button.json",
      repository: "https://github.com/magicuidesign/magicui",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @magic-ui/shimmer-button",
    },
    dependencies: [{ name: "clsx", version: "^2.1.1", isDev: false, peer: false }, { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false }],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 97,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 15,
        maintenance: 10,
        documentation: 10,
        performance: 10,
        reasons: [
          "Pure CSS hardware accelerated keyframes",
          "Zero motion runtime dependency needed",
          "Fully typed TypeScript interface",
        ],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/shimmer-button.tsx",
        content: `import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className
        )}
        {...props}
      >
        {/* spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]"
          )}
        >
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* spark before */}
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {children}

        {/* Backdrop */}
        <div
          className={cn(
            "insert-0 absolute size-full",
            "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
          )}
        />
      </button>
    );
  }
);
ShimmerButton.displayName = "ShimmerButton";
export default ShimmerButton;`,
      },
    ],
  },

  // 15. Magic UI / Interactive Hover Button
  {
    id: "@magic-ui/interactive-hover-button",
    provenance: { provider: "Magic UI", sourceUrl: "https://magicui.design/docs/components/interactive-hover-button", license: "MIT" },
    providerId: "magic-ui",
    providerItemId: "interactive-hover-button",
    name: "interactive-hover-button",
    title: "Interactive Hover Button",
    description: "An animated button with a sliding text indicator and expanding dot transition on hover.",
    type: "component",
    categories: ["buttons", "animations", "micro-interactions"],
    tags: ["button", "hover", "interactive", "animation", "magic-ui"],
    preview: {
      demoUrl: "https://magicui.design/docs/components/interactive-hover-button",
      image: "https://magicui.design/preview/interactive-hover-button.png",
    },
    source: {
      homepage: "https://magicui.design",
      registryUrl: "https://magicui.design/r/interactive-hover-button.json",
      repository: "https://github.com/magicuidesign/magicui",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @magic-ui/interactive-hover-button",
    },
    dependencies: [
      { name: "lucide-react", version: "^0.468.0", isDev: false, peer: false },
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 95,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 14,
        maintenance: 10,
        documentation: 10,
        performance: 10,
        reasons: ["Smooth CSS transitions without external canvas", "Full keyboard accessibility"],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/interactive-hover-button.tsx",
        content: `import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center font-semibold",
        className
      )}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="size-4" />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-full bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary" />
    </button>
  );
});
InteractiveHoverButton.displayName = "InteractiveHoverButton";
export default InteractiveHoverButton;`,
      },
    ],
  },

  // 16. Magic UI / Rainbow Button
  {
    id: "@magic-ui/rainbow-button",
    provenance: { provider: "Magic UI", sourceUrl: "https://magicui.design/docs/components/rainbow-button", license: "MIT" },
    providerId: "magic-ui",
    providerItemId: "rainbow-button",
    name: "rainbow-button",
    title: "Rainbow Button",
    description: "A gorgeous animated button with an infinite cycling rainbow conic gradient border.",
    type: "component",
    categories: ["buttons", "effects", "animations"],
    tags: ["button", "rainbow", "gradient", "border", "magic-ui", "tailwind"],
    preview: {
      demoUrl: "https://magicui.design/docs/components/rainbow-button",
      image: "https://magicui.design/preview/rainbow-button.png",
    },
    source: {
      homepage: "https://magicui.design",
      registryUrl: "https://magicui.design/r/rainbow-button.json",
      repository: "https://github.com/magicuidesign/magicui",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @magic-ui/rainbow-button",
    },
    dependencies: [
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 96,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 15,
        maintenance: 10,
        documentation: 10,
        performance: 10,
        reasons: ["Conic gradient border animation", "Zero heavy JavaScript runtime"],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/rainbow-button.tsx",
        content: `import React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  RainbowButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-primary-foreground transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
        "bg-[linear-gradient(#121212,#121212),linear-gradient(#121212_50%,rgba(18,18,18,0.6)_80%,rgba(18,18,18,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        "dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(255,255,255,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
RainbowButton.displayName = "RainbowButton";
export default RainbowButton;`,
      },
    ],
  },

  // 17. Aceternity UI / Moving Border Button
  {
    id: "@aceternity/moving-border-button",
    provenance: { provider: "Aceternity UI", sourceUrl: "https://ui.aceternity.com/components/moving-border", license: "MIT" },
    providerId: "aceternity",
    providerItemId: "moving-border-button",
    name: "moving-border-button",
    title: "Moving Border Button",
    description: "A futuristic button with an animated gradient light beam seamlessly traveling along the perimeter.",
    type: "component",
    categories: ["buttons", "effects", "animations"],
    tags: ["button", "moving-border", "aceternity", "glow", "motion"],
    preview: {
      demoUrl: "https://ui.aceternity.com/components/moving-border",
      image: "https://ui.aceternity.com/images/products/thumbnails/new/moving-border.png",
    },
    source: {
      homepage: "https://ui.aceternity.com",
      registryUrl: "https://ui.aceternity.com/r/moving-border.json",
      repository: "https://github.com/aceternity/ui",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @aceternity/moving-border",
    },
    dependencies: [
      { name: "motion", version: "^12.0.0", isDev: false, peer: false },
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "motion",
    },
    quality: {
      overall: 95,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 14,
        maintenance: 10,
        documentation: 10,
        performance: 10,
        reasons: ["SVG path beam motion tracking", "Custom duration and radius controls"],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/moving-border.tsx",
        content: `"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: any) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden md:col-span-2",
        containerClassName
      )}
      style={{ borderRadius: borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: \`calc(\${borderRadius} * 0.96)\` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--cyan-500)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{ borderRadius: \`calc(\${borderRadius} * 0.96)\` }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: any) => {
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);
  const transform = useMotionTemplate\`translateX(\${x}px) translateY(\${y}px) translateX(-50%) translateY(-50%)\`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}
      >
        {children}
      </motion.div>
    </>
  );
};`,
      },
    ],
  },

  // 18. 21st / Glass Button
  {
    id: "@21st/glass-button",
    provenance: { provider: "21st", sourceUrl: "https://21st.dev/components/glass-button", license: "MIT" },
    providerId: "21st",
    providerItemId: "glass-button",
    name: "glass-button",
    title: "Glassmorphic Button",
    description: "Frosted glass acrylic button with backdrop blur, specular border highlight, and glowing hover state.",
    type: "component",
    categories: ["buttons", "effects", "glassmorphism"],
    tags: ["button", "glass", "glassmorphism", "21st", "acrylic", "tailwind"],
    preview: {
      demoUrl: "https://21st.dev/components/glass-button",
      image: "https://21st.dev/preview/glass-button.png",
    },
    source: {
      homepage: "https://21st.dev",
      registryUrl: "https://21st.dev/r/glass-button.json",
      repository: "https://github.com/21st-dev/components",
    },
    install: {
      mode: "cli",
      command: "npx 21st@latest add glass-button",
    },
    dependencies: [
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 93,
      breakdown: {
        compatibility: 20,
        codeQuality: 14,
        accessibility: 14,
        maintenance: 9,
        documentation: 9,
        performance: 10,
        reasons: ["High-spec glass acrylic shader", "Zero dependencies beyond Tailwind"],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/glass-button.tsx",
        content: `import React from "react";
import { cn } from "@/lib/utils";

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glow?: boolean;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, glow = true, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-all duration-300",
          "rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
          "hover:bg-white/20 hover:border-white/40 hover:scale-[1.02]",
          "active:scale-[0.98]",
          glow && "hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
          className
        )}
        {...props}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        {children}
      </button>
    );
  }
);
GlassButton.displayName = "GlassButton";
export default GlassButton;`,
      },
    ],
  },

  // 19. Ruixen UI / Stack-Aware Button
  {
    id: "@ruixen/button",
    provenance: { provider: "Ruixen UI", sourceUrl: "https://ruixen.com/components/button", license: "MIT" },
    providerId: "ruixen",
    providerItemId: "button",
    name: "ruixen-button",
    title: "Ruixen Multi-Stack Button",
    description: "Adaptive component supporting automatic stack switching: Tailwind 4, Tailwind 3, Radix UI or Base UI.",
    type: "component",
    categories: ["buttons", "primitives"],
    tags: ["button", "ruixen", "radix", "base-ui", "tailwind-v4", "tailwind-v3"],
    preview: {
      demoUrl: "https://ruixen.com/components/button",
      image: "https://ruixen.com/preview/button.png",
    },
    source: {
      homepage: "https://ruixen.com",
      registryUrl: "https://ruixen.com/r/button.json",
      repository: "https://github.com/ruixenui/ruixen",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add https://ruixen.com/r/button.json",
    },
    dependencies: [
      { name: "@radix-ui/react-slot", version: "^1.1.0", isDev: false, peer: false },
      { name: "class-variance-authority", version: "^0.7.1", isDev: false, peer: false },
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: ["radix", "base-ui"],
      motion: "none",
    },
    quality: {
      overall: 96,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 15,
        maintenance: 10,
        documentation: 10,
        performance: 10,
        reasons: ["Native support for Radix UI & Base UI", "Automatic Tailwind v3 and v4 variant routing"],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/ruixen-button.tsx",
        content: `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]",
        secondary: "bg-neutral-800 text-white hover:bg-neutral-700 border border-white/10",
        ghost: "hover:bg-white/10 text-neutral-300",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface RuixenButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const RuixenButton = React.forwardRef<HTMLButtonElement, RuixenButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
RuixenButton.displayName = "RuixenButton";
export default RuixenButton;`,
      },
    ],
  },

  // 20. Cult UI / Gradient Button
  {
    id: "@cult-ui/gradient-button",
    provenance: { provider: "Cult UI", sourceUrl: "https://cult-ui.com/docs/components/gradient-button", license: "MIT" },
    providerId: "cult-ui",
    providerItemId: "gradient-button",
    name: "gradient-button",
    title: "Gradient Button",
    description: "Tactile, interactive fluid gradient button with animated border lighting.",
    type: "component",
    categories: ["buttons", "effects", "animations"],
    tags: ["button", "gradient", "cult-ui", "creative", "tailwind"],
    preview: {
      demoUrl: "https://cult-ui.com/docs/components/gradient-button",
      image: "https://cult-ui.com/preview/gradient-button.png",
    },
    source: {
      homepage: "https://cult-ui.com",
      registryUrl: "https://cult-ui.com/r/gradient-button.json",
      repository: "https://github.com/cult-ui/cult-ui",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @cult-ui/gradient-button",
    },
    dependencies: [
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 92,
      breakdown: {
        compatibility: 20,
        codeQuality: 14,
        accessibility: 13,
        maintenance: 9,
        documentation: 9,
        performance: 10,
        reasons: ["Smooth reactive gradients", "Touch-friendly haptic states"],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/gradient-button.tsx",
        content: `import React from "react";
import { cn } from "@/lib/utils";

export const GradientButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative group p-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <div className="px-6 py-2.5 rounded-[14px] bg-neutral-950 text-white font-medium text-sm transition-all duration-300 group-hover:bg-transparent">
        {children}
      </div>
    </button>
  );
});
GradientButton.displayName = "GradientButton";
export default GradientButton;`,
      },
    ],
  },

  // 21. Kokonut UI / Smooth Button
  {
    id: "@kokonut/smooth-button",
    provenance: { provider: "Kokonut UI", sourceUrl: "https://kokonutui.com/docs/components/smooth-button", license: "MIT" },
    providerId: "kokonut",
    providerItemId: "smooth-button",
    name: "smooth-button",
    title: "Smooth Button",
    description: "Minimalist tactile button with spring scale feedback and subtle dark-mode ambient border.",
    type: "component",
    categories: ["buttons", "micro-interactions"],
    tags: ["button", "smooth", "kokonut", "minimal", "tailwind"],
    preview: {
      demoUrl: "https://kokonutui.com/docs/components/smooth-button",
      image: "https://kokonutui.com/preview/smooth-button.png",
    },
    source: {
      homepage: "https://kokonutui.com",
      registryUrl: "https://kokonutui.com/r/smooth-button.json",
      repository: "https://github.com/kokonut-ui/kokonut",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @kokonut/smooth-button",
    },
    dependencies: [
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "none",
    },
    quality: {
      overall: 93,
      breakdown: {
        compatibility: 20,
        codeQuality: 14,
        accessibility: 14,
        maintenance: 9,
        documentation: 9,
        performance: 10,
        reasons: ["Zero overhead tactile feedback", "Dark mode first design"],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/smooth-button.tsx",
        content: `import React from "react";
import { cn } from "@/lib/utils";

export const SmoothButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-xl border border-white/10 bg-neutral-900 text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 hover:border-white/20 active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
SmoothButton.displayName = "SmoothButton";
export default SmoothButton;`,
      },
    ],
  },

  // 22. React Bits / Magnet Button
  {
    id: "@react-bits/magnet-button",
    provenance: { provider: "React Bits", sourceUrl: "https://reactbits.dev/components/magnet", license: "MIT" },
    providerId: "react-bits",
    providerItemId: "magnet-button",
    name: "magnet-button",
    title: "Magnetic Button",
    description: "Interactive button with physical cursor magnet pull effect using smooth spring calculations.",
    type: "component",
    categories: ["buttons", "animations", "physics"],
    tags: ["button", "magnetic", "react-bits", "physics", "spring"],
    preview: {
      demoUrl: "https://reactbits.dev/components/magnet",
      image: "https://reactbits.dev/preview/magnet.png",
    },
    source: {
      homepage: "https://reactbits.dev",
      registryUrl: "https://reactbits.dev/r/magnet-button.json",
      repository: "https://github.com/DavidHDev/react-bits",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @react-bits/magnet-button",
    },
    dependencies: [
      { name: "motion", version: "^12.0.0", isDev: false, peer: false },
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "motion",
    },
    quality: {
      overall: 94,
      breakdown: {
        compatibility: 20,
        codeQuality: 14,
        accessibility: 14,
        maintenance: 10,
        documentation: 9,
        performance: 9,
        reasons: ["Real-time spring physics tracking cursor distance", "Configurable magnetic radius"],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/magnet-button.tsx",
        content: `"use client";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MagnetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
}

export const MagnetButton = ({
  children,
  className,
  strength = 30,
  ...props
}: MagnetButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm transition-colors hover:bg-neutral-200",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
export default MagnetButton;`,
      },
    ],
  },

  // 23. Magic UI / Hero Video Dialog
  {
    id: "@magic-ui/hero-video-dialog",
    provenance: { provider: "Magic UI", sourceUrl: "https://magicui.design/docs/components/hero-video-dialog", license: "MIT" },
    providerId: "magic-ui",
    providerItemId: "hero-video-dialog",
    name: "hero-video-dialog",
    title: "Hero Video Dialog",
    description: "A responsive SaaS hero video component with an interactive play button and full-screen video dialog modal.",
    type: "block",
    categories: ["hero", "video", "dialog", "media"],
    tags: ["hero", "video", "dialog", "modal", "lightbox", "magic-ui"],
    preview: {
      demoUrl: "https://magicui.design/docs/components/hero-video-dialog",
      image: "https://magicui.design/preview/hero-video-dialog.png",
    },
    source: {
      homepage: "https://magicui.design",
      registryUrl: "https://magicui.design/r/hero-video-dialog.json",
      repository: "https://github.com/magicuidesign/magicui",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @magic-ui/hero-video-dialog",
    },
    dependencies: [
      { name: "lucide-react", version: "^0.468.0", isDev: false, peer: false },
      { name: "motion", version: "^12.0.0", isDev: false, peer: false },
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "motion",
    },
    quality: {
      overall: 96,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 15,
        maintenance: 10,
        documentation: 10,
        performance: 9,
        reasons: ["Smooth backdrop blur & spring entrance", "Auto-pause video on modal dismiss"],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/hero-video-dialog.tsx",
        content: `"use client";
import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface HeroVideoDialogProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Hero Video thumbnail",
  className,
}: HeroVideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl", className)}>
      <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        <img src={thumbnailSrc} alt={thumbnailAlt} className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.6)] group-hover:scale-110 transition-transform">
            <Play className="size-7 fill-current translate-x-0.5" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative w-full max-w-4xl aspect-video bg-neutral-950 rounded-2xl overflow-hidden border border-white/20" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-10 p-2 text-white bg-neutral-800/80 rounded-full hover:bg-neutral-700 transition-colors">
                <X className="size-5" />
              </button>
              <iframe src={videoSrc} className="w-full h-full" allow="autoplay; fullscreen" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default HeroVideoDialog;`,
      },
    ],
  },

  // 24. Aceternity UI / Lamp Hero
  {
    id: "@aceternity/lamp-hero",
    provenance: { provider: "Aceternity UI", sourceUrl: "https://ui.aceternity.com/components/lamp-effect", license: "MIT" },
    providerId: "aceternity",
    providerItemId: "lamp-hero",
    name: "lamp-hero",
    title: "Lamp Hero Container",
    description: "The signature Aceternity lamp hero section with radiant light beams, glowing particles and title animations.",
    type: "block",
    categories: ["hero", "effects", "animations"],
    tags: ["hero", "lamp", "glow", "light", "aceternity", "motion"],
    preview: {
      demoUrl: "https://ui.aceternity.com/components/lamp-effect",
      image: "https://ui.aceternity.com/images/products/thumbnails/new/lamp.png",
    },
    source: {
      homepage: "https://ui.aceternity.com",
      registryUrl: "https://ui.aceternity.com/r/lamp-effect.json",
      repository: "https://github.com/aceternity/ui",
    },
    install: {
      mode: "shadcn",
      command: "npx shadcn@latest add @aceternity/lamp-effect",
    },
    dependencies: [
      { name: "motion", version: "^12.0.0", isDev: false, peer: false },
      { name: "clsx", version: "^2.1.1", isDev: false, peer: false },
      { name: "tailwind-merge", version: "^2.5.4", isDev: false, peer: false },
    ],
    registryDependencies: [],
    frameworkSupport: {
      react: "^18 || ^19",
      nextjs: true,
      vite: true,
      remix: true,
      rsc: true,
      tailwind: "any",
      primitives: [],
      motion: "motion",
    },
    quality: {
      overall: 95,
      breakdown: {
        compatibility: 20,
        codeQuality: 15,
        accessibility: 14,
        maintenance: 10,
        documentation: 10,
        performance: 9,
        reasons: ["High-impact visual hero centerpiece", "GPU accelerated conical light projections"],
        dependencyHealth: 10,
        popularity: 5,
        previewQuality: 5,
        deductions: [],
      },
    },
    license: "MIT",
    auth: { required: false, type: "none" },
    files: [
      {
        path: "components/ui/lamp.tsx",
        content: `"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-neutral-950 w-full rounded-2xl z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: \`conic-gradient(var(--conic-position), var(--tw-gradient-stops))\`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-neutral-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-neutral-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: \`conic-gradient(var(--conic-position), var(--tw-gradient-stops))\`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-neutral-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-neutral-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-neutral-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-neutral-950 "></div>
      </div>

      <div className="relative z-50 flex -translate-y-28 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
export default LampContainer;`,
      },
    ],
  },
];

