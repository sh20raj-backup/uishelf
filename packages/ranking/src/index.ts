import {
  type UIShelfComponent,
  type ProjectContext,
  type QualityScore,
  type QualityScoreBreakdown,
} from "@uishelf/schema";

export interface CalculateScoreOptions {
  component: UIShelfComponent;
  project?: ProjectContext | null;
}

export function calculateQualityScore(options: CalculateScoreOptions): QualityScore {
  const { component, project } = options;

  let compatibility = 18;
  let codeQuality = 14;
  let accessibility = 14;
  let maintenance = 9;
  let documentation = 9;
  let performance = 9;
  let dependencyHealth = 9;
  let popularity = 4;
  let previewQuality = 4;

  const reasons: string[] = [];
  const deductions: string[] = [];

  // 1. Compatibility scoring (max 20)
  if (project) {
    // React check
    if (project.reactVersion) {
      if (component.frameworkSupport.react.includes(project.reactVersion)) {
        compatibility += 1;
        reasons.push(`Compatible with React ${project.reactVersion}`);
      } else {
        compatibility -= 3;
        deductions.push(`Target React version ${project.reactVersion} mismatch`);
      }
    }

    // Framework check (Next.js / Vite / etc.)
    if (project.framework === "next" && component.frameworkSupport.nextjs) {
      compatibility += 1;
      reasons.push("Full Next.js support");
    }
    if (project.framework === "vite" && component.frameworkSupport.vite) {
      compatibility += 1;
      reasons.push("Vite compatible");
    }

    // Tailwind check
    if (project.tailwindVersion) {
      if (
        component.frameworkSupport.tailwind === project.tailwindVersion ||
        component.frameworkSupport.tailwind === "any"
      ) {
        compatibility += 1;
        reasons.push(`Tailwind v${project.tailwindVersion} ready`);
      } else if (component.frameworkSupport.tailwind !== "none") {
        compatibility -= 5;
        deductions.push(
          `Tailwind mismatch: component expects v${component.frameworkSupport.tailwind}, project has v${project.tailwindVersion}`
        );
      }
    }

    // Motion check
    const compNeedsMotion =
      component.frameworkSupport.motion !== "none" ||
      component.dependencies.some((d) => d.name === "motion" || d.name === "framer-motion");
    if (compNeedsMotion) {
      if (project.motionEngine) {
        compatibility += 1;
        reasons.push(`${project.motionEngine} already installed in project`);
      } else {
        deductions.push("Requires motion library to be installed");
      }
    }

    // Styling primitives check (Radix vs Base UI)
    for (const prim of component.frameworkSupport.primitives) {
      if (project.stylingPrimitives.includes(prim)) {
        compatibility += 1;
        reasons.push(`Matches existing ${prim} styling primitives`);
      }
    }
  } else {
    reasons.push("Default compatibility baseline (no active project context)");
  }

  // 2. Code Quality (max 15)
  if (component.files && component.files.length > 0) {
    const hasTs = component.files.some((f) => f.path.endsWith(".tsx") || f.path.endsWith(".ts"));
    if (hasTs) {
      codeQuality += 1;
      reasons.push("First-class TypeScript typing");
    }
  }

  // 3. Accessibility (max 15)
  if (
    component.tags.includes("accessible") ||
    component.tags.includes("a11y") ||
    component.frameworkSupport.primitives.includes("radix") ||
    component.frameworkSupport.primitives.includes("base-ui") ||
    component.frameworkSupport.primitives.includes("react-aria")
  ) {
    accessibility += 1;
    reasons.push("Built on WAI-ARIA accessible primitives");
  }

  // 4. Preview Quality (max 5)
  if (component.preview?.image || component.preview?.demoUrl || component.preview?.video) {
    previewQuality = 5;
    reasons.push("Verified visual preview available");
  } else {
    previewQuality = 3;
    deductions.push("No live visual preview demo available");
  }

  // 5. Documentation (max 10)
  if (component.description && component.description.length > 50) {
    documentation = 10;
  } else {
    documentation = 7;
  }

  // 6. Clamp values
  compatibility = Math.max(0, Math.min(20, compatibility));
  codeQuality = Math.max(0, Math.min(15, codeQuality));
  accessibility = Math.max(0, Math.min(15, accessibility));
  maintenance = Math.max(0, Math.min(10, maintenance));
  documentation = Math.max(0, Math.min(10, documentation));
  performance = Math.max(0, Math.min(10, performance));
  dependencyHealth = Math.max(0, Math.min(10, dependencyHealth));
  popularity = Math.max(0, Math.min(5, popularity));
  previewQuality = Math.max(0, Math.min(5, previewQuality));

  const total =
    compatibility +
    codeQuality +
    accessibility +
    maintenance +
    documentation +
    performance +
    dependencyHealth +
    popularity +
    previewQuality;

  const breakdown: QualityScoreBreakdown = {
    compatibility,
    codeQuality,
    accessibility,
    maintenance,
    documentation,
    performance,
    dependencyHealth,
    popularity,
    previewQuality,
    reasons,
    deductions,
  };

  return {
    overall: Math.round(total),
    breakdown,
  };
}
