import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="fdu logo"
            width={40}
            height={40}
            className="size-10"
          />
          <span className="sr-only">
            @pyyupsk/fdu - Faster Date-Time Utility
          </span>
        </div>
      ),
    },
    githubUrl: "https://github.com/pyyupsk/fdu",
  };
}
