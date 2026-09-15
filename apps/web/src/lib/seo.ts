export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.DEPLOY_TARGET === "gh-pages" || process.env.GITHUB_ACTIONS === "true"
    ? "https://sh20raj.github.io/uishelf"
    : "https://uishelf.dev");

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.jpg`;
export const DEFAULT_LOGO_IMAGE = `${SITE_URL}/logo.jpg`;

export function getCanonicalUrl(path: string = ""): string {
  if (!path || path === "/") {
    return `${SITE_URL}/`;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const withTrailing = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
  return `${SITE_URL}${withTrailing}`;
}

export const SEO_KEYWORDS = [
  "React UI components",
  "React components registry",
  "shadcn ui registry",
  "Magic UI components",
  "Aceternity UI",
  "21st dev components",
  "Tailwind CSS components",
  "Tailwind v4 UI",
  "React 19 components",
  "UI components search engine",
  "MCP server React UI",
  "Model Context Protocol UI discovery",
  "UI library comparison",
  "MUI Material Button",
  "Mantine UI components",
  "Chakra UI components",
  "Cult UI",
  "Ruixen UI",
  "ReUI",
  "Kokonut UI",
  "React Bits",
  "Animate UI",
  "shadcn alternative",
  "universal UI installer",
  "copy paste UI components",
  "modern React UI",
];
