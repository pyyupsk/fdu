import type { LocaleConfig } from "../core/types";

/**
 * @internal
 */
type TokenGetter = (date: Date, locale?: LocaleConfig) => string;

/**
 * Format token definitions and their corresponding getter functions.
 *
 * Tokens:
 * - YYYY/YY: Year (4-digit/2-digit)
 * - MMMM/MMM/MM/M: Month (full/short/padded/numeric)
 * - DD/Do/D: Date (padded/ordinal/numeric)
 * - dddd/ddd/dd/d: Weekday (full/short/min/numeric)
 * - HH/H: Hour 24-hour (padded/numeric)
 * - hh/h: Hour 12-hour (padded/numeric)
 * - mm/m: Minute (padded/numeric)
 * - ss/s: Second (padded/numeric)
 * - SSS: Millisecond (3-digit)
 * - A/a: AM/PM indicator (uppercase/lowercase)
 *
 * @internal
 */
export const tokens = {
  YYYY: (d) => String(d.getFullYear()),
  YY: (d) => String(d.getFullYear()).slice(-2),

  MMMM: (d, locale) => locale?.months[d.getMonth()] ?? String(d.getMonth() + 1),
  MMM: (d, locale) =>
    locale?.monthsShort?.[d.getMonth()] ?? String(d.getMonth() + 1),
  MM: (d) => String(d.getMonth() + 1).padStart(2, "0"),
  M: (d) => String(d.getMonth() + 1),

  DD: (d) => String(d.getDate()).padStart(2, "0"),
  Do: (d, locale) => {
    const day = d.getDate();
    return locale?.ordinal ? locale.ordinal(day) : `${day}`;
  },
  D: (d) => String(d.getDate()),

  dddd: (d, locale) => locale?.weekdays[d.getDay()] ?? String(d.getDay()),
  ddd: (d, locale) => locale?.weekdaysShort?.[d.getDay()] ?? String(d.getDay()),
  dd: (d, locale) => locale?.weekdaysMin?.[d.getDay()] ?? String(d.getDay()),
  d: (d) => String(d.getDay()),

  HH: (d) => String(d.getHours()).padStart(2, "0"),
  H: (d) => String(d.getHours()),

  hh: (d) => {
    const hour = d.getHours() % 12 || 12;
    return String(hour).padStart(2, "0");
  },
  h: (d) => {
    const hour = d.getHours() % 12 || 12;
    return String(hour);
  },

  mm: (d) => String(d.getMinutes()).padStart(2, "0"),
  m: (d) => String(d.getMinutes()),

  ss: (d) => String(d.getSeconds()).padStart(2, "0"),
  s: (d) => String(d.getSeconds()),

  SSS: (d) => String(d.getMilliseconds()).padStart(3, "0"),

  A: (d, locale) => {
    const hour = d.getHours();
    const minute = d.getMinutes();
    let meridiem = "PM";
    if (locale?.meridiem) {
      meridiem = locale.meridiem(hour, minute, false);
    } else if (hour < 12) {
      meridiem = "AM";
    }
    return meridiem;
  },
  a: (d, locale) => {
    const hour = d.getHours();
    const minute = d.getMinutes();
    let meridiem = "pm";
    if (locale?.meridiem) {
      meridiem = locale.meridiem(hour, minute, true);
    } else if (hour < 12) {
      meridiem = "am";
    }
    return meridiem;
  },
} satisfies Record<string, TokenGetter>;

/**
 * Regular expression to match all format tokens.
 * Longest tokens come first to avoid partial matches.
 *
 * @internal
 */
export const tokenRegex =
  /YYYY|MMMM|MMM|MM|YY|Do|DD|dddd|ddd|dd|HH|hh|mm|ss|SSS|[MdDHhmsAa]/g;
