import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/icons/github";

export function Footer() {
  return (
    <footer className="border-t border-fd-border bg-fd-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-x">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="fdu logo"
                width={32}
                height={32}
                className="size-8"
              />
            </div>
            <p className="text-sm text-fd-muted-foreground mb-4">
              The 4× faster date library for JavaScript. Zero dependencies, full
              TypeScript support.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/pyyupsk/fdu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
              >
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/docs/introduction"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/api/creation"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/guides/format-tokens"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/benchmarks"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  Benchmarks
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/pyyupsk/fdu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/pyyupsk/fdu/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/pyyupsk/fdu/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  Discussions
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/pyyupsk/fdu/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  Contributing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">More</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/docs/benchmarks"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  Benchmarks
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/sponsors/pyyupsk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  Become a Sponsor
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.npmjs.com/package/@pyyupsk/fdu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  npm Package
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:contact@fasu.dev"
                  className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-fd-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-fd-muted-foreground">
              © 2025 Pongsakorn Thipayanate. Released under the{" "}
              <Link
                href="https://github.com/pyyupsk/fdu/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fd-foreground transition-colors underline underline-offset-4"
              >
                MIT License
              </Link>
              .
            </p>
            <p className="text-sm text-fd-muted-foreground">
              Built with ❤️ for the JavaScript community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
