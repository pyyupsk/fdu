import type { LocaleConfig } from "../core/types.js";

/**
 * All the format tokens and how to convert them to actual values
 */

export type TokenGetter = (date: Date, locale?: LocaleConfig) => string;

export const tokens: Record<string, TokenGetter> = {
  // Year
  YYYY: (d) => String(d.getFullYear()),
  YY: (d) => String(d.getFullYear()).slice(-2),

  // Month
  MMMM: (d, locale) => locale?.months[d.getMonth()] ?? String(d.getMonth() + 1),
  MMM: (d, locale) =>
    locale?.monthsShort[d.getMonth()] ?? String(d.getMonth() + 1),
  MM: (d) => String(d.getMonth() + 1).padStart(2, "0"),
  M: (d) => String(d.getMonth() + 1),

  // Day of month
  DD: (d) => String(d.getDate()).padStart(2, "0"),
  D: (d) => String(d.getDate()),

  // Day of week
  dddd: (d, locale) => locale?.weekdays[d.getDay()] ?? String(d.getDay()),
  ddd: (d, locale) => locale?.weekdaysShort[d.getDay()] ?? String(d.getDay()),
  dd: (d, locale) => locale?.weekdaysMin[d.getDay()] ?? String(d.getDay()),
  d: (d) => String(d.getDay()),

  // Hour (24-hour)
  HH: (d) => String(d.getHours()).padStart(2, "0"),
  H: (d) => String(d.getHours()),

  // Hour (12-hour)
  hh: (d) => {
    const hour = d.getHours() % 12 || 12;
    return String(hour).padStart(2, "0");
  },
  h: (d) => {
    const hour = d.getHours() % 12 || 12;
    return String(hour);
  },

  // Minute
  mm: (d) => String(d.getMinutes()).padStart(2, "0"),
  m: (d) => String(d.getMinutes()),

  // Second
  ss: (d) => String(d.getSeconds()).padStart(2, "0"),
  s: (d) => String(d.getSeconds()),

  // Millisecond
  SSS: (d) => String(d.getMilliseconds()).padStart(3, "0"),

  // AM/PM
  A: (d) => (d.getHours() < 12 ? "AM" : "PM"),
  a: (d) => (d.getHours() < 12 ? "am" : "pm"),
};

/**
 * Regex to find all format tokens in a string
 * Longest tokens come first to avoid matching "M" when we want "MMMM"
 */
export const tokenRegex =
  /YYYY|YY|MMMM|MMM|MM|dddd|ddd|dd|HH|hh|mm|ss|SSS|[MDdHhmsAa]/g;
