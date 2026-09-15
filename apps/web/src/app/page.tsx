import React from "react";
import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getCanonicalUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "UIShelf — Universal React UI Registry, Discovery Engine & MCP Platform",
  description:
    "The open-source resolution layer for the modern React UI ecosystem. Search 340+ registries, inspect compatibility, resolve dependencies, and safely install UI components across shadcn/ui, Magic UI, Aceternity, 21st.dev, and NPM libraries.",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  openGraph: {
    title: "UIShelf — Universal React UI Registry, Discovery Engine & MCP Platform",
    description:
      "Search 340+ registries, understand compatibility, preview, and install safely. Built-in CLI & MCP platform.",
    url: getCanonicalUrl("/"),
    siteName: "UIShelf",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "UIShelf Open Source UI Discovery",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UIShelf — Universal React UI Registry, Discovery Engine & MCP Platform",
    description:
      "Search 340+ registries, understand compatibility, preview, and install safely.",
    images: [DEFAULT_OG_IMAGE],
    creator: "@shaswatraj",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
