import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@uishelf/schema": path.resolve(__dirname, "./packages/schema/src/index.ts"),
      "@uishelf/project": path.resolve(__dirname, "./packages/project/src/index.ts"),
      "@uishelf/cache": path.resolve(__dirname, "./packages/cache/src/index.ts"),
      "@uishelf/security": path.resolve(__dirname, "./packages/security/src/index.ts"),
      "@uishelf/credentials": path.resolve(__dirname, "./packages/credentials/src/index.ts"),
      "@uishelf/config": path.resolve(__dirname, "./packages/config/src/index.ts"),
      "@uishelf/ranking": path.resolve(__dirname, "./packages/ranking/src/index.ts"),
      "@uishelf/registry": path.resolve(__dirname, "./packages/registry/src/index.ts"),
      "@uishelf/resolver": path.resolve(__dirname, "./packages/resolver/src/index.ts"),
      "@uishelf/providers": path.resolve(__dirname, "./packages/providers/src/index.ts"),
      "@uishelf/installer": path.resolve(__dirname, "./packages/installer/src/index.ts"),
      "@uishelf/search": path.resolve(__dirname, "./packages/search/src/index.ts"),
      "@uishelf/core": path.resolve(__dirname, "./packages/core/src/index.ts"),
      "@uishelf/mcp": path.resolve(__dirname, "./packages/mcp/src/index.ts"),
    },
  },
});
