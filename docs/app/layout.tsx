import "@/app/global.css";

import { RootProvider } from "fumadocs-ui/provider/next";
import { Geist, Geist_Mono } from "next/font/google";
import { DefaultSearchDialog } from "@/components/search";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable}`}>
        <RootProvider
          search={{
            SearchDialog: DefaultSearchDialog,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
