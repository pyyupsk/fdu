import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "tsup";

// Get all locale files
const localeDir = resolve(__dirname, "src/locale/locales");
const localeFiles = readdirSync(localeDir)
  .filter((file) => file.endsWith(".ts"))
  .map((file) => resolve(localeDir, file));

export default defineConfig([
  // Main library build
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: "dist",
    outExtension({ format }) {
      if (format === "esm") return { js: ".js" };
      if (format === "cjs") return { js: ".cjs" };
      return { js: ".js" };
    },
  },
  // Locale files build
  {
    entry: localeFiles.reduce(
      (acc, file) => {
        const name = file.match(/\/([^/]+)\.ts$/)?.[1];
        if (name) acc[`locale/${name}`] = file;
        return acc;
      },
      {} as Record<string, string>,
    ),
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: false,
    outDir: "dist",
    outExtension({ format }) {
      if (format === "esm") return { js: ".js" };
      if (format === "cjs") return { js: ".cjs" };
      return { js: ".js" };
    },
  },
  // UMD build for main library only (browsers)
  {
    entry: { index: "src/index.ts" },
    format: ["iife"],
    globalName: "fdu",
    dts: false,
    sourcemap: true,
    clean: false,
    outDir: "dist/umd",
    minify: false,
  },
]);
