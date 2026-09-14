import {
  type UIShelfComponent,
  type ProjectContext,
  type SearchQuery,
  type SearchResponse,
  type SearchResultItem,
} from "@uishelf/schema";
import { calculateQualityScore } from "@uishelf/ranking";

export interface EmbeddingProvider {
  embed(text: string): Promise<number[]>;
}

export class LocalSemanticEmbeddingProvider implements EmbeddingProvider {
  // Deterministic local feature hashing vector (zero API key needed)
  async embed(text: string): Promise<number[]> {
    const vector = new Array(32).fill(0);
    const tokens = tokenize(text);
    for (const token of tokens) {
      let hash = 0;
      for (let i = 0; i < token.length; i++) {
        hash = (hash << 5) - hash + token.charCodeAt(i);
        hash |= 0;
      }
      const idx = Math.abs(hash) % 32;
      vector[idx] += 1;
    }
    const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0)) || 1;
    return vector.map((v) => v / norm);
  }
}

export interface SearchOptions {
  query: SearchQuery;
  catalog: UIShelfComponent[];
  project?: ProjectContext | null;
  embeddingProvider?: EmbeddingProvider;
}

export async function searchComponents(options: SearchOptions): Promise<SearchResponse> {
  const start = Date.now();
  const { query, catalog, project } = options;

  const rawQuery = (query.query || "").trim();
  const queryTokens = tokenize(rawQuery);

  // 1. Filter phase
  const filtered = catalog.filter((comp) => {
    // Provider filter
    if (query.providers && query.providers.length > 0) {
      const match = query.providers.some(
        (p) => comp.providerId.toLowerCase() === p.toLowerCase()
      );
      if (!match) return false;
    }

    // Exclude provider filter
    if (query.excludeProviders && query.excludeProviders.length > 0) {
      const excluded = query.excludeProviders.some(
        (p) => comp.providerId.toLowerCase() === p.toLowerCase()
      );
      if (excluded) return false;
    }

    // Category filter
    if (query.categories && query.categories.length > 0) {
      const catMatch = query.categories.some((c) =>
        comp.categories.map((x) => x.toLowerCase()).includes(c.toLowerCase())
      );
      if (!catMatch) return false;
    }

    // Framework filter
    if (query.framework) {
      const fw = query.framework.toLowerCase();
      if (fw === "next" && !comp.frameworkSupport.nextjs) return false;
      if (fw === "vite" && !comp.frameworkSupport.vite) return false;
      if (fw === "remix" && !comp.frameworkSupport.remix) return false;
    }

    // Tailwind filter
    if (query.tailwind) {
      if (
        comp.frameworkSupport.tailwind !== "any" &&
        comp.frameworkSupport.tailwind !== query.tailwind
      ) {
        return false;
      }
    }

    // Motion filter
    if (query.motion !== undefined) {
      const hasMotion =
        comp.frameworkSupport.motion !== "none" ||
        comp.dependencies.some((d) => d.name === "motion" || d.name === "framer-motion");
      if (query.motion !== hasMotion) return false;
    }

    // Auth required filter
    if (query.authRequired !== undefined) {
      if (comp.auth.required !== query.authRequired) return false;
    }

    return true;
  });

  // 2. Score & Rank Phase
  const scoredItems: SearchResultItem[] = [];

  for (const comp of filtered) {
    // Calculate lexical/fuzzy relevance
    const lexicalScore = calculateLexicalRelevance(comp, queryTokens, rawQuery);

    // If there is a search term and no relevance, skip
    if (queryTokens.length > 0 && lexicalScore <= 0) {
      continue;
    }

    // Calculate quality score and project compatibility
    const quality = calculateQualityScore({ component: comp, project });

    if (query.minScore && quality.overall < query.minScore) {
      continue;
    }

    const highlights: string[] = [];
    const compatibilityMatches: string[] = [];
    const compatibilityWarnings: string[] = [];

    // Extract match reasons
    if (project) {
      if (project.framework === "next" && comp.frameworkSupport.nextjs) {
        compatibilityMatches.push("Next.js ✓");
      }
      if (project.reactVersion && comp.frameworkSupport.react.includes(project.reactVersion)) {
        compatibilityMatches.push(`React ${project.reactVersion} ✓`);
      }
      if (project.tailwindVersion) {
        if (
          comp.frameworkSupport.tailwind === "any" ||
          comp.frameworkSupport.tailwind === project.tailwindVersion
        ) {
          compatibilityMatches.push(`Tailwind ${project.tailwindVersion} ✓`);
        } else {
          compatibilityWarnings.push(
            `Tailwind ${comp.frameworkSupport.tailwind} vs project ${project.tailwindVersion}`
          );
        }
      }
      if (project.hasShadcn && comp.install.mode === "shadcn") {
        compatibilityMatches.push("shadcn compatible ✓");
      }
      if (project.motionEngine && comp.frameworkSupport.motion !== "none") {
        compatibilityMatches.push(`${project.motionEngine} ready ✓`);
      }
    }

    if (lexicalScore > 0.8) {
      highlights.push("Exact semantic match");
    }

    // Blended final score:
    // Base quality (0-100) + Lexical boost (0-30)
    const finalScore = queryTokens.length === 0
      ? quality.overall
      : Math.min(100, Math.round(quality.overall * 0.7 + lexicalScore * 30));

    scoredItems.push({
      component: comp,
      score: finalScore,
      scoreBreakdown: quality.breakdown,
      highlights,
      compatibilityMatches,
      compatibilityWarnings,
    });
  }

  // 3. Sort by final score descending
  scoredItems.sort((a, b) => b.score - a.score);

  // 4. Pagination
  const limit = query.limit || 20;
  const offset = query.offset || 0;
  const pagedItems = scoredItems.slice(offset, offset + limit);

  return {
    query: rawQuery,
    total: scoredItems.length,
    items: pagedItems,
    tookMs: Date.now() - start,
  };
}

function calculateLexicalRelevance(
  comp: UIShelfComponent,
  queryTokens: string[],
  rawQuery: string
): number {
  if (queryTokens.length === 0) return 1.0;

  const lowQuery = rawQuery.toLowerCase();
  const title = comp.title.toLowerCase();
  const name = comp.name.toLowerCase();
  const desc = comp.description.toLowerCase();
  const id = comp.id.toLowerCase();
  const provider = comp.providerId.toLowerCase();
  const tags = comp.tags.map((t) => t.toLowerCase()).join(" ");
  const categories = comp.categories.map((c) => c.toLowerCase()).join(" ");

  // Exact full query match in ID or name
  if (id === lowQuery || name === lowQuery || `@${provider}/${name}` === lowQuery) {
    return 1.0;
  }

  // Exact phrase match in title
  if (title.includes(lowQuery)) {
    return 0.95;
  }

  // Token-based matching
  let matchedTokens = 0;
  let weight = 0;

  for (const token of queryTokens) {
    let tokenMatch = false;

    if (name.includes(token) || title.includes(token)) {
      weight += 0.4;
      tokenMatch = true;
    } else if (tags.includes(token) || categories.includes(token)) {
      weight += 0.25;
      tokenMatch = true;
    } else if (desc.includes(token)) {
      weight += 0.15;
      tokenMatch = true;
    } else if (provider.includes(token)) {
      weight += 0.2;
      tokenMatch = true;
    }

    if (tokenMatch) {
      matchedTokens++;
    }
  }

  if (matchedTokens === 0) return 0;

  // Fraction of query matched
  const coverage = matchedTokens / queryTokens.length;
  return Math.min(1.0, coverage * 0.5 + weight);
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-_@]/g, " ")
    .split(/[\s-_]+/)
    .filter((t) => t.length > 1);
}
