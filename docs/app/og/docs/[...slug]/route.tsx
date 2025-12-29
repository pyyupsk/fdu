import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { generateOGImage, OG_IMAGE_SIZE } from "@/lib/og-image";
import { getPageImage, source } from "@/lib/source";

export const revalidate = false;

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    generateOGImage({
      title: page.data.title,
      description: page.data.description,
    }),
    OG_IMAGE_SIZE,
  );
}
