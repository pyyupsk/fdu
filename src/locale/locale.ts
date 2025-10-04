import type { LocaleConfig } from "../core/types";

const locales = new Map<string, LocaleConfig>();
let globalLocale = "en";

/**
 * Registers a locale configuration for use throughout the library.
 *
 * @param name - Locale identifier (e.g., "en", "es", "zh-cn")
 * @param config - Complete locale configuration object
 *
 * @example
 * ```ts
 * import { registerLocale } from 'fdu/locale';
 * import { es } from 'fdu/locale/es';
 *
 * registerLocale('es', es);
 * ```
 */
export function registerLocale(name: string, config: LocaleConfig): void {
  locales.set(name, config);
}

/**
 * Gets or sets the global locale used by default for all date instances.
 *
 * @param name - Optional locale name to set as global
 * @returns The current global locale name
 *
 * @example
 * ```ts
 * import { locale } from 'fdu/locale';
 *
 * // Get current locale
 * locale(); // 'en'
 *
 * // Set global locale
 * locale('es'); // 'es'
 * ```
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
 * Retrieves a registered locale configuration by name.
 *
 * @param name - Locale identifier
 * @returns The locale configuration or undefined if not registered
 *
 * @internal
 */
export function getLocale(name: string): LocaleConfig | undefined {
  return locales.get(name);
}

/**
 * Resolves the effective locale for a date instance.
 * Falls back to the global locale if instance locale is undefined,
 * and to English if the locale is not registered.
 *
 * @param instanceLocale - Optional instance-specific locale name
 * @returns Resolved locale configuration
 *
 * @internal
 */
export function resolveLocale(
  instanceLocale: string | undefined,
): LocaleConfig {
  const localeName = instanceLocale || locale();
  const config = getLocale(localeName);

  if (!config) {
    console.warn(`Locale "${localeName}" not registered, falling back to "en"`);
    return getLocale("en") as LocaleConfig;
  }

  return config;
}
