import type { LocaleConfig } from "../core/types";

const locales = new Map<string, LocaleConfig>();
let globalLocale = "en";

export function registerLocale(name: string, config: LocaleConfig): void {
  locales.set(name, config);
}

export function locale(): string;
export function locale(name: string): string;
export function locale(name?: string): string {
  if (name !== undefined) {
    globalLocale = name;
    return globalLocale;
  }
  return globalLocale;
}

export function getLocale(name: string): LocaleConfig | undefined {
  return locales.get(name);
}
