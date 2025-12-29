import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Generate web app manifest for PWA support
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "@pyyupsk/fdu - The 4× faster date library for JavaScript",
    short_name: "fdu",
    description:
      "Ultra-fast, zero-dependency date manipulation with full Day.js API compatibility. Built for performance-critical applications with TypeScript-first design.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FF7717",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
