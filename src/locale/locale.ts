import type { LocaleConfig } from "../core/types";

/**
 * Stores all registered locales and tracks which one is currently active
 */
const locales = new Map<string, LocaleConfig>();
let globalLocale = "en";

/**
 * Add a new locale to the registry
 */
export function registerLocale(name: string, config: LocaleConfig): void {
  locales.set(name, config);
}

/**
 * Get the current global locale, or set a new one
 */
export function locale(): string;
export function locale(name: string): string;
export function locale(name?: string): string {
  if (name !== undefined) {
    globalLocale = name;
    return globalLocale;
  }
  return globalLocale;
}

/**
 * Look up a locale's configuration data by name
 */
export function getLocale(name: string): LocaleConfig | undefined {
  return locales.get(name);
}
