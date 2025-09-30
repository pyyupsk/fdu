// Main date-time factory and core types
export { fd } from "./core/datetime";
export type { DateInput, DateTime, LocaleConfig, Unit } from "./core/types";

// Locale configuration and registration
export { locale, registerLocale } from "./locale/locale";

// Set up English as the default locale
import { registerLocale } from "./locale/locale";
import { en } from "./locale/locales/en";

registerLocale("en", en);

// Utility functions (tree-shakable)
export { diff, isAfter, isBefore, isSame } from "./compare/comparisons";
export { format } from "./format/formatter";
export { add } from "./manipulate/add";
export { subtract } from "./manipulate/subtract";
export { parse } from "./parse/parser";
