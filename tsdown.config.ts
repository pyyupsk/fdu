import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { globSync } from "glob";
import { defineConfig } from "tsdown";

export default defineConfig([
  // Main library - Only the fdu factory function
  {
    entry: "src/index.ts",
    format: ["esm", "cjs"],
    platform: "neutral",
    minify: true,
    hooks(hooks) {
      hooks.hook("build:done", async () => {
        // Inject package version into built files
        const packageJson = JSON.parse(
          readFileSync(join(process.cwd(), "package.json"), "utf-8"),
        );
        const version = packageJson.version;

        console.log(`\nInjecting version: ${version}`);

        const files = globSync("dist/**/*.{js,cjs,mjs}", {
          ignore: ["**/node_modules/**"],
        });

        let filesUpdated = 0;

        for (const file of files) {
          const content = readFileSync(file, "utf-8");

          if (content.includes("__VERSION__")) {
            const updated = content.replace(/__VERSION__/g, version);
            writeFileSync(file, updated, "utf-8");
            filesUpdated++;
            console.log(`  ✓ ${file}`);
          }
        }

        console.log(`\nUpdated ${filesUpdated} file(s)`);
      });
    },
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
