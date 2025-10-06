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
        replacement: resolve(__dirname, "./dist/types.js"),
      },
      // Locales
      {
        find: /^@pyyupsk\/fdu\/locale\/(.+)$/,
        replacement: `${resolve(__dirname, "./dist/locale")}/$1.js`,
      },
      // Plugins
      {
        find: /^@pyyupsk\/fdu\/plugins\/(.+)$/,
        replacement: `${resolve(__dirname, "./dist/plugins")}/$1.js`,
      },
      // Main entry (must be last)
      {
        find: "@pyyupsk/fdu",
        replacement: resolve(__dirname, "./dist/index.js"),
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
      include: ["src/**/*.ts", "dist/**/*.js"],
      exclude: ["dist/**/*.d.ts", "dist/**/*.d.cts", "dist/umd/**/*"],
      thresholds: {
        lines: 99,
        functions: 100,
        branches: 96,
        statements: 99,
      },
    },
  },
});
