import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [
      // Source access for internal tests
      {
        find: /^@\/(.+)$/,
        replacement: `${resolve(__dirname, "./src")}/$1.ts`,
      },
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
      // Types
      {
        find: "@pyyupsk/fdu/types",
        replacement: resolve(__dirname, "./src/core/types.ts"),
      },
      // Locales
      {
        find: /^@pyyupsk\/fdu\/locale\/(.+)$/,
        replacement: `${resolve(__dirname, "./src/locale/locales")}/$1.ts`,
      },
      // Plugins
      {
        find: /^@pyyupsk\/fdu\/plugins\/(.+)$/,
        replacement: `${resolve(__dirname, "./src/plugins")}/$1.ts`,
      },
      // Main entry (must be last)
      {
        find: "@pyyupsk/fdu",
        replacement: resolve(__dirname, "./src/index.ts"),
      },
    ],
  },
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.ts"],
      exclude: ["**/types.ts"],
      thresholds: {
        lines: 99,
        functions: 100,
        branches: 95,
        statements: 99,
      },
    },
  },
});
