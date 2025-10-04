import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto md:px-6 lg:px-8 py-8 border-x">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-sm text-fd-muted-foreground">
            <Link
              href="/docs"
              className="hover:text-fd-foreground transition-colors"
            >
              Documentation
            </Link>
            <span>•</span>
            <Link
              href="https://github.com/pyyupsk/fdu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fd-foreground transition-colors"
            >
              GitHub
            </Link>
            <span>•</span>
            <Link
              href="https://www.npmjs.com/package/@pyyupsk/fdu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fd-foreground transition-colors"
            >
              npm
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm text-fd-muted-foreground">
            <Link
              href="https://github.com/pyyupsk/fdu/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fd-foreground transition-colors"
            >
              MIT License
            </Link>
            <span>•</span>
            <span>Made with ❤️ by pyyupsk</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
