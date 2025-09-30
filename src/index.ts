// Main date-time factory and core types
export { fd } from "./core/datetime.js";
export type { DateInput, DateTime, LocaleConfig, Unit } from "./core/types.js";

// Locale configuration and registration
export { locale, registerLocale } from "./locale/locale.js";

// Set up English as the default locale
import { registerLocale } from "./locale/locale.js";
import { en } from "./locale/locales/en.js";

registerLocale("en", en);

// Utility functions (tree-shakable)
export { diff, isAfter, isBefore, isSame } from "./compare/comparisons.js";
export { format } from "./format/formatter.js";
export { add } from "./manipulate/add.js";
export { subtract } from "./manipulate/subtract.js";
export { parse } from "./parse/parser.js";
