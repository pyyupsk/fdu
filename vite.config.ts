import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "fd",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        if (format === "es") return "esm/index.js";
        if (format === "cjs") return "cjs/index.js";
        if (format === "umd") return "umd/index.js";
        return `index.${format}.js`;
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDirs: "dist/esm",
    }),
  ],
});
