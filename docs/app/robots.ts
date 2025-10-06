import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Generates robots.txt for the documentation site
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://fdu.fasu.dev/sitemap.xml",
  };
}
