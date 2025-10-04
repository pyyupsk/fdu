import type { LocaleConfig } from "../core/types";

/**
 * All the format tokens and how to convert them to actual values
 */

type TokenGetter = (date: Date, locale?: LocaleConfig) => string;

export const tokens = {
  // Year
  YYYY: (d) => String(d.getFullYear()),
  YY: (d) => String(d.getFullYear()).slice(-2),

  // Month
  MMMM: (d, locale) => locale?.months[d.getMonth()] ?? String(d.getMonth() + 1),
  MMM: (d, locale) =>
    locale?.monthsShort?.[d.getMonth()] ?? String(d.getMonth() + 1),
  MM: (d) => String(d.getMonth() + 1).padStart(2, "0"),
  M: (d) => String(d.getMonth() + 1),

  // Day of month
  DD: (d) => String(d.getDate()).padStart(2, "0"),
  Do: (d, locale) => {
    const day = d.getDate();
    return locale?.ordinal ? locale.ordinal(day) : `${day}`;
  },
  D: (d) => String(d.getDate()),

  // Day of week
  dddd: (d, locale) => locale?.weekdays[d.getDay()] ?? String(d.getDay()),
  ddd: (d, locale) => locale?.weekdaysShort?.[d.getDay()] ?? String(d.getDay()),
  dd: (d, locale) => locale?.weekdaysMin?.[d.getDay()] ?? String(d.getDay()),
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
 * Regex to find all format tokens in a string
 * Longest tokens come first to avoid matching "M" when we want "MMMM"
 */
export const tokenRegex =
  /YYYY|YY|MMMM|MMM|MM|M|DD|Do|D|dddd|ddd|dd|d|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g;
