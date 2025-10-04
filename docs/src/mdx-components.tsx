import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";

const themeComponents = getThemeComponents();

const components: MDXComponents = {
  ...themeComponents,
};

export function useMDXComponents() {
  return components;
}
