import React from "react";
import { SEED_COMPONENTS } from "@uishelf/registry/seed";
import ComponentDetailClient from "./ComponentDetailClient";

export function generateStaticParams() {
  return SEED_COMPONENTS.map((c) => ({
    provider: c.providerId.toLowerCase(),
    slug: c.providerItemId.toLowerCase(),
  }));
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ provider: string; slug: string }>;
}) {
  const resolved = await params;
  return (
    <ComponentDetailClient
      provider={resolved.provider}
      slug={resolved.slug}
    />
  );
}
