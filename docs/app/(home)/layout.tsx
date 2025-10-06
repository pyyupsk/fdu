import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { baseOptions } from "@/lib/layout.shared";

export const metadata: Metadata = {
  title: {
    default: "@pyyupsk/fdu - Lightweight Date Utility Library for TypeScript",
    template: "%s | @pyyupsk/fdu",
  },
  description:
    "A zero-dependency, immutable, and type-safe date manipulation library for TypeScript and JavaScript. Features include date formatting, parsing, manipulation, comparison, and internationalization support for 40+ locales.",
  keywords: [
    "date",
    "time",
    "datetime",
    "date library",
    "typescript",
    "javascript",
    "date manipulation",
    "date formatting",
    "date parsing",
    "immutable",
    "zero dependencies",
    "i18n",
    "internationalization",
    "locale",
    "date utilities",
    "moment alternative",
    "dayjs alternative",
  ],
  authors: [{ name: "pyyupsk" }],
  creator: "pyyupsk",
  alternates: {
    canonical: "https://fdu.fasu.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fdu.fasu.dev",
    title: "@pyyupsk/fdu - Lightweight Date Utility Library for TypeScript",
    description:
      "A zero-dependency, immutable, and type-safe date manipulation library for TypeScript and JavaScript with full internationalization support.",
    siteName: "@pyyupsk/fdu",
    images: [
      {
        url: "https://fdu.fasu.dev/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "@pyyupsk/fdu - The 4× faster date library for JavaScript",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "@pyyupsk/fdu - Lightweight Date Utility Library",
    description:
      "Zero-dependency, immutable date library for TypeScript with i18n support",
    creator: "@pyyupsk",
    images: ["https://fdu.fasu.dev/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex-1">{children}</main>
      <Footer />
    </HomeLayout>
  );
}
