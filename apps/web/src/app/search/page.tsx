import React, { Suspense } from "react";
import type { Metadata } from "next";
import SearchClient from "./SearchClient";
import { getCanonicalUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Discover 340+ React UI Registries & Components",
  description:
    "Search, filter, and inspect React UI components across shadcn/ui, Magic UI, Aceternity UI, 21st.dev, Cult UI, Ruixen, and NPM libraries with real-time compatibility resolution.",
  keywords: [
    "react ui search",
    "search shadcn components",
    "magic ui search",
    "aceternity components",
    "21st dev components",
    "discover react ui",
    "uishelf search",
    "tailwind component search",
  ],
  alternates: {
    canonical: getCanonicalUrl("/search/"),
  },
  openGraph: {
    title: "Discover 340+ React UI Registries & Components | UIShelf",
    description:
      "Search, filter, and inspect React UI components across shadcn/ui, Magic UI, Aceternity, 21st.dev, and NPM libraries with real-time compatibility resolution.",
    url: getCanonicalUrl("/search/"),
    siteName: "UIShelf",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "UIShelf Component Discovery Engine",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover 340+ React UI Registries & Components | UIShelf",
    description:
      "Search, filter, and inspect React UI components across shadcn/ui, Magic UI, Aceternity, 21st.dev, and NPM libraries.",
    images: [DEFAULT_OG_IMAGE],
    creator: "@shaswatraj",
  },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-neutral-500 font-mono text-sm">
          Loading UIShelf Discovery Engine...
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
