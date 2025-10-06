"use client";

import { fdu } from "@pyyupsk/fdu";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { ChevronRight } from "fumadocs-ui/internal/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { features } from "@/constants/features";
import { cn } from "@/lib/cn";

export default function HomePage() {
  const [today, setToday] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const now = fdu().toISOString();
    setToday(now);
    setFormattedDate(fdu(now).format("dddd [at] HH:mm"));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-32 md:pt-32 md:pb-48 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center container border-x md:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Ultra-fast date-time library
            </h1>
            <p className="text-xl md:text-2xl text-fd-muted-foreground text-pretty">
              Zero dependencies. 4× faster than Day.js. TypeScript-first.
              Immutable API with comprehensive i18n support.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/introduction"
              className={buttonVariants({ variant: "primary" })}
            >
              Get Started
              <ChevronRight className="ml-2 size-4" />
            </Link>
            <Link
              href="https://github.com/pyyupsk/fdu"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "secondary" })}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="mr-2 size-4"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              View on GitHub
            </Link>
          </div>
        </div>
        <DynamicCodeBlock
          lang="ts"
          code={
            today
              ? `import { fdu } from "@pyyupsk/fdu";\n\nconst date = fdu("${today}");\n\ndate.format("dddd [at] HH:mm");\n\n// → "${formattedDate}"`
              : `import { fdu } from "@pyyupsk/fdu";\n\nconst date = fdu("loading...");\n\ndate.format("dddd [at] HH:mm");\n\n// → "loading..."`
          }
          wrapInSuspense
        />
      </section>

      {/* Features Section */}
      <section className="border-y md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container border-x">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                "py-12 px-6",
                "lg:[&:nth-child(-n+3)]:border-r",
                "md:max-lg:[&:nth-child(odd)]:border-r md:max-lg:[&:nth-child(-n+2)]:border-b",
                "max-md:[&:not(:last-child)]:border-b",
              )}
            >
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-fd-foreground font-mono">
                  {feature.metric}
                </div>
                <div className="space-y-1">
                  <div className="text-base font-medium text-fd-foreground">
                    {feature.title}
                  </div>
                  <div className="text-sm text-fd-muted-foreground">
                    {feature.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 container border-x md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-xl text-fd-muted-foreground">
              Install{" "}
              <code className="bg-fd-accent text-fd-accent-foreground p-1 rounded-md">
                @pyyupsk/fdu
              </code>{" "}
              in your project and start building with modern date utilities.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs/introduction"
              className={buttonVariants({ variant: "primary" })}
            >
              Read Documentation
              <ChevronRight className="ml-2 size-4" />
            </Link>
            <Link
              href="https://github.com/pyyupsk/fdu"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "secondary" })}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="mr-2 size-4"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Star on GitHub
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
