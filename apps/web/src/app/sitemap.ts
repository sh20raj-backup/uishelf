import { MetadataRoute } from "next";
import { SEED_COMPONENTS } from "@uishelf/registry/seed";
import { getCanonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    {
      url: getCanonicalUrl("/"),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: getCanonicalUrl("/search/"),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: getCanonicalUrl("/components/"),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: getCanonicalUrl("/libraries/"),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: getCanonicalUrl("/compare/"),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: getCanonicalUrl("/mcp/"),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: getCanonicalUrl("/cli/"),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: getCanonicalUrl("/docs/"),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  const componentPages = SEED_COMPONENTS.map((comp) => ({
    url: getCanonicalUrl(
      `/components/${comp.providerId.toLowerCase()}/${comp.providerItemId.toLowerCase()}/`
    ),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...componentPages];
}
