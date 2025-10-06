import { ImageResponse } from "next/og";
import { generateOGImage, OG_IMAGE_SIZE } from "@/lib/og-image";

export const dynamic = "force-static";

export const alt = "@pyyupsk/fdu - The 4× faster date library for JavaScript";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

/**
 * Generate OpenGraph image for homepage
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
 */
export default async function Image() {
  return new ImageResponse(
    generateOGImage({
      title: "The 4× faster date library for JavaScript.",
      description:
        "Ultra-fast, zero-dependency date manipulation with full Day.js API compatibility. Built for performance-critical applications with TypeScript-first design.",
      tags: ["4× Faster", "Zero Dependencies", "TypeScript"],
    }),
    OG_IMAGE_SIZE,
  );
}
