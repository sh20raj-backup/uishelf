/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS === "true" || process.env.DEPLOY_TARGET === "gh-pages";
const basePath = isGithubPages ? "/uishelf" : "";

const nextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "@uishelf/core",
    "@uishelf/schema",
    "@uishelf/registry",
    "@uishelf/search",
    "@uishelf/ranking",
    "@uishelf/resolver",
    "@uishelf/providers",
    "@uishelf/security",
    "@uishelf/cache",
    "@uishelf/config",
    "@uishelf/credentials",
    "@uishelf/installer",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        os: false,
        path: false,
        crypto: false,
        child_process: false,
        readline: false,
      };
    }
    return config;
  },
};

export default nextConfig;
