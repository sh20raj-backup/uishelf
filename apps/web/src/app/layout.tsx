import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE_URL, DEFAULT_OG_IMAGE, DEFAULT_LOGO_IMAGE, SEO_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UIShelf — Universal React UI Registry, Discovery Engine & MCP Platform",
    template: "%s | UIShelf",
  },
  description:
    "The open-source resolution layer for the modern React UI ecosystem. Search 340+ registries, inspect compatibility, resolve dependencies, and safely install UI components across shadcn/ui, Magic UI, Aceternity, 21st.dev, and NPM libraries.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Shaswat Raj", url: "https://github.com/SH20RAJ" }],
  creator: "Shaswat Raj",
  publisher: "UIShelf",
  category: "technology",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "UIShelf — Universal React UI Registry & Discovery Engine",
    description:
      "Search 340+ React UI registries, understand compatibility, preview live components, and install safely. Built-in CLI & Model Context Protocol (MCP) platform.",
    url: `${SITE_URL}/`,
    siteName: "UIShelf",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "UIShelf — Universal React UI Registry & Discovery Engine",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UIShelf — Universal React UI Registry, CLI & MCP Platform",
    description:
      "The resolution layer between developers and the React UI ecosystem. Search 340+ registries with compatibility scoring.",
    images: [DEFAULT_OG_IMAGE],
    creator: "@shaswatraj",
  },
  icons: {
    icon: [{ url: `${SITE_URL}/logo.jpg`, type: "image/jpeg" }],
    apple: [{ url: `${SITE_URL}/logo.jpg`, type: "image/jpeg" }],
  },
  manifest: `${SITE_URL}/manifest.json`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": `${SITE_URL}/`,
        "name": "UIShelf",
        "description": "Universal React UI Registry, Discovery Engine & MCP Platform",
        "publisher": {
          "@id": `${SITE_URL}/#organization`,
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SITE_URL}/search/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "UIShelf",
        "url": `${SITE_URL}/`,
        "logo": DEFAULT_LOGO_IMAGE,
        "sameAs": [
          "https://github.com/SH20RAJ/uishelf",
          "https://www.npmjs.com/package/uishelf",
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#application`,
        "name": "UIShelf",
        "operatingSystem": "All",
        "applicationCategory": "DeveloperApplication",
        "description":
          "Universal React UI Registry, Discovery Engine, Compatibility Resolver, Installer & MCP Platform.",
        "url": `${SITE_URL}/`,
        "softwareVersion": "0.1.0",
        "author": {
          "@type": "Person",
          "name": "Shaswat Raj",
          "url": "https://github.com/SH20RAJ",
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#09090b] text-neutral-100 antialiased selection:bg-cyan-500 selection:text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

