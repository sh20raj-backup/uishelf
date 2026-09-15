import React from "react";
import type { Metadata } from "next";
import { SEED_COMPONENTS } from "@uishelf/registry/seed";
import ComponentDetailClient from "./ComponentDetailClient";
import { SITE_URL, getCanonicalUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

export function generateStaticParams() {
  return SEED_COMPONENTS.map((c) => ({
    provider: c.providerId.toLowerCase(),
    slug: c.providerItemId.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provider: string; slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const comp = SEED_COMPONENTS.find(
    (c) =>
      c.providerId.toLowerCase() === resolved.provider.toLowerCase() &&
      c.providerItemId.toLowerCase() === resolved.slug.toLowerCase()
  );

  if (!comp) {
    return {
      title: "Component Details",
      description: "Inspect component compatibility, preview, and safe install plan.",
    };
  }

  const title = `${comp.title} (${comp.providerId}) — React UI Component`;
  const description = `${comp.description} Install safely via: uishelf add ${comp.id}. Compatible with Next.js, React 19, and Tailwind CSS.`;
  const canonical = getCanonicalUrl(
    `/components/${resolved.provider.toLowerCase()}/${resolved.slug.toLowerCase()}/`
  );

  return {
    title,
    description,
    keywords: [
      comp.title,
      comp.name,
      comp.providerId,
      ...(comp.tags || []),
      ...(comp.categories || []),
      "react component",
      "react ui registry",
      "uishelf",
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "UIShelf",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${comp.title} — ${comp.providerId} React Component`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
      creator: "@shaswatraj",
    },
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ provider: string; slug: string }>;
}) {
  const resolved = await params;
  const comp = SEED_COMPONENTS.find(
    (c) =>
      c.providerId.toLowerCase() === resolved.provider.toLowerCase() &&
      c.providerItemId.toLowerCase() === resolved.slug.toLowerCase()
  );

  const canonicalUrl = getCanonicalUrl(
    `/components/${resolved.provider.toLowerCase()}/${resolved.slug.toLowerCase()}/`
  );

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Components",
        "item": `${SITE_URL}/components/`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": comp ? comp.providerId : resolved.provider,
        "item": `${SITE_URL}/search/?provider=${resolved.provider}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": comp ? comp.title : resolved.slug,
        "item": canonicalUrl,
      },
    ],
  };

  const softwareJsonLd = comp
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "name": comp.title,
        "description": comp.description,
        "programmingLanguage": "TypeScript",
        "codeRepository": comp.source?.repository || comp.source?.homepage || "https://github.com/SH20RAJ/uishelf",
        "author": {
          "@type": "Organization",
          "name": comp.providerId,
        },
        "license": comp.license,
        "runtimePlatform": "React 19, Next.js, Node.js",
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      {softwareJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      )}
      <ComponentDetailClient
        provider={resolved.provider}
        slug={resolved.slug}
      />
    </>
  );
}
