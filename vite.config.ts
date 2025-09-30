import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "fd", // global name for UMD
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `${format}/index.js`,
    },
    sourcemap: true,
    emptyOutDir: true, // clean dist automatically
  },
});
