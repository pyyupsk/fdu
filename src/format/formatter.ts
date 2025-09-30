import type { LocaleConfig } from "../core/types.js";
import { tokenRegex, tokens } from "./tokens.js";

/**
 * Takes a date and a pattern and returns a formatted string
 */
export function format(
  date: Date,
  pattern: string,
  locale?: LocaleConfig,
): string {
  return pattern.replace(tokenRegex, (token) => {
    const getter = tokens[token];
    return getter ? getter(date, locale) : token;
  });
}
