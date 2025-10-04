// Main export - the fdu factory function
export { fdu, fdu as default } from "./core/datetime";

// Set up English as the default locale
import { registerLocale } from "./locale/locale";
import { en } from "./locale/locales/en";

registerLocale("en", en);
