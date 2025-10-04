export { fdu, fdu as default } from "./core/datetime";

import { registerLocale } from "./locale/locale";
import { en } from "./locale/locales/en";

registerLocale("en", en);
