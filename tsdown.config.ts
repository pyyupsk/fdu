import { defineConfig } from "tsdown";

export default defineConfig([
  // Main library - Only the fdu factory function
  {
    entry: "src/index.ts",
    format: ["esm", "cjs"],
    platform: "neutral",
    minify: true,
  },

  // Types entry - TypeScript types only
  {
    entry: "src/types.ts",
    format: ["esm", "cjs"],
    platform: "neutral",
    minify: true,
    clean: false,
  },

  // Locale files - Tree-shakeable language data
  {
    entry: "src/locale/locales/*.ts",
    outDir: "dist/locale",
    format: ["esm", "cjs"],
    platform: "neutral",
    minify: true,
    clean: false,
  },

  // Plugin files - Tree-shakeable optional plugins
  {
    entry: "src/plugins/*.ts",
    outDir: "dist/plugins",
    format: ["esm", "cjs"],
    platform: "neutral",
    minify: true,
    clean: false,
  },

  // Browser/CDN build - Single file for script tags
  {
    entry: "src/index.ts",
    outDir: "dist/umd",
    format: "iife",
    platform: "browser",
    globalName: "fdu",
    minify: true,
    dts: false,
    clean: false,
  },
]);
