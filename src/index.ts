/**
 * Main factory function for creating date-time instances.
 *
 * @example
 * ```ts
 * import fdu from 'fdu';
 *
 * // Current date/time
 * const now = fdu();
 *
 * // From various inputs
 * const fromDate = fdu(new Date());
 * const fromString = fdu('2024-01-01');
 * const fromTimestamp = fdu(1609459200000);
 * ```
 */
export { fdu, fdu as default } from "./core/datetime";
export { locale, registerLocale } from "./locale/locale";

import { registerLocale } from "./locale/locale";
import { en } from "./locale/locales/en";

registerLocale("en", en);
