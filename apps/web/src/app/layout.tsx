import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "UIShelf — Universal React UI Registry, Discovery Engine & MCP Platform",
  description:
    "The resolution layer between developers and the React UI ecosystem. Search 340+ registries, inspect compatibility, resolve dependencies, and safely install UI components.",
  metadataBase: new URL("https://uishelf.dev"),
  openGraph: {
    title: "UIShelf — Universal React UI Registry & Discovery Engine",
    description:
      "Search every great UI source, understand compatibility, preview, and install safely. Built-in CLI & MCP platform.",
    url: "https://uishelf.dev",
    siteName: "UIShelf",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "UIShelf Social Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UIShelf — Universal React UI Registry, CLI & MCP Platform",
    description: "The resolution layer between developers and the React UI ecosystem.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#09090b] text-neutral-100 antialiased selection:bg-cyan-500 selection:text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
