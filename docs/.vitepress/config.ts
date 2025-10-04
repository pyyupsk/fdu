import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "fdu",
  description: "Ultra-fast, zero-dependency JavaScript date-time library",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "en" }],
    ["meta", { name: "og:site_name", content: "fdu" }],
  ],
  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Documentation", link: "/docs/getting-started" },
      {
        text: "v0.0.0-beta.1",
        items: [
          {
            text: "Changelog",
            link: "https://github.com/pyyupsk/fdu/blob/main/CHANGELOG.md",
          },
          {
            text: "Contributing",
            link: "https://github.com/pyyupsk/fdu/blob/main/CONTRIBUTING.md",
          },
        ],
      },
    ],

    sidebar: {
      "/docs/": [
        {
          text: "Getting Started",
          items: [
            { text: "Installation", link: "/docs/installation" },
            { text: "Quick Start", link: "/docs/getting-started" },
          ],
        },
        {
          text: "Guides",
          items: [
            { text: "Formatting", link: "/docs/formatting" },
            { text: "Localization", link: "/docs/localization" },
          ],
        },
        {
          text: "API Reference",
          items: [
            {
              text: "Creation",
              collapsed: false,
              items: [
                { text: "fdu()", link: "/docs/api-reference/creation/fdu" },
              ],
            },
            {
              text: "Formatting",
              collapsed: false,
              items: [
                {
                  text: "format()",
                  link: "/docs/api-reference/formatting/format",
                },
              ],
            },
            {
              text: "Manipulation",
              collapsed: false,
              items: [
                { text: "add()", link: "/docs/api-reference/manipulation/add" },
                {
                  text: "subtract()",
                  link: "/docs/api-reference/manipulation/subtract",
                },
              ],
            },
            {
              text: "Comparison",
              collapsed: false,
              items: [
                {
                  text: "isBefore()",
                  link: "/docs/api-reference/comparison/is-before",
                },
                {
                  text: "isAfter()",
                  link: "/docs/api-reference/comparison/is-after",
                },
                {
                  text: "isSame()",
                  link: "/docs/api-reference/comparison/is-same",
                },
                { text: "diff()", link: "/docs/api-reference/comparison/diff" },
              ],
            },
            {
              text: "Query",
              collapsed: false,
              items: [
                {
                  text: "Get Components",
                  link: "/docs/api-reference/query/get",
                },
              ],
            },
            {
              text: "Conversion",
              collapsed: false,
              items: [
                {
                  text: "toDate()",
                  link: "/docs/api-reference/conversion/to-date",
                },
                {
                  text: "toISOString()",
                  link: "/docs/api-reference/conversion/to-iso-string",
                },
                {
                  text: "valueOf()",
                  link: "/docs/api-reference/conversion/value-of",
                },
                {
                  text: "isValid()",
                  link: "/docs/api-reference/conversion/is-valid",
                },
              ],
            },
            {
              text: "Locale",
              collapsed: false,
              items: [
                { text: "locale()", link: "/docs/api-reference/locale/locale" },
                {
                  text: "registerLocale()",
                  link: "/docs/api-reference/locale/register-locale",
                },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/pyyupsk/fdu" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 Pongsakorn Thipayanate",
    },

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/pyyupsk/fdu/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});
