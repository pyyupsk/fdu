/**
 * The main date-time instance interface with all available methods.
 */
export type FduInstance = {
  /**
   * Formats the date according to the specified pattern.
   * @param pattern - Format string (e.g., 'YYYY-MM-DD HH:mm:ss')
   * @returns Formatted date string
   */
  format(pattern: string): string;

  /**
   * Adds the specified amount of time to the date.
   * @param value - Amount to add
   * @param unit - Time unit ('year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond')
   * @returns New FduInstance with the added time
   */
  add(value: number, unit: UnitType): FduInstance;

  /**
   * Subtracts the specified amount of time from the date.
   * @param value - Amount to subtract
   * @param unit - Time unit
   * @returns New FduInstance with the subtracted time
   */
  subtract(value: number, unit: UnitType): FduInstance;

  /**
   * Checks if this date is before another date.
   * @param other - Date to compare with
   * @returns True if this date is before the other date
   */
  isBefore(other: FduInstance): boolean;

  /**
   * Checks if this date is after another date.
   * @param other - Date to compare with
   * @returns True if this date is after the other date
   */
  isAfter(other: FduInstance): boolean;

  /**
   * Checks if this date is the same as another date.
   * @param other - Date to compare with
   * @param unit - Optional unit for granularity ('year', 'month', 'day', etc.)
   * @returns True if dates are the same (at the specified granularity)
   */
  isSame(other: FduInstance, unit?: UnitType): boolean;

  /**
   * Calculates the difference between this date and another date.
   * @param other - Date to compare with
   * @param unit - Unit for the difference (default: 'millisecond')
   * @returns Numeric difference in the specified unit
   */
  diff(other: FduInstance, unit?: UnitType): number;

  /** Gets the year (e.g., 2024) */
  year(): number;

  /** Gets the month (0-11, where 0 = January) */
  month(): number;

  /** Gets the day of the month (1-31) */
  date(): number;

  /** Gets the hour (0-23) */
  hour(): number;

  /** Gets the minute (0-59) */
  minute(): number;

  /** Gets the second (0-59) */
  second(): number;

  /** Gets the millisecond (0-999) */
  millisecond(): number;

  /** Gets the day of the week (0-6, where 0 = Sunday) */
  day(): number;

  /** Gets the current locale name */
  locale(): string;

  /**
   * Sets the locale for this instance.
   * @param name - Locale name (e.g., 'en', 'es', 'zh-cn')
   * @returns New FduInstance with the specified locale
   */
  locale(name: string): FduInstance;

  /** Converts to a native JavaScript Date object */
  toDate(): Date;

  /** Converts to ISO 8601 string format */
  toISOString(): string;

  /** Gets the Unix timestamp in milliseconds */
  valueOf(): number;

  /** Checks if the date is valid */
  isValid(): boolean;
};

/**
 * Accepted input types for creating a date-time instance.
 */
export type FduInput = Date | string | number | FduInstance | undefined;

/**
 * Time unit types for date manipulation and comparison.
 * Supports both full names and abbreviations.
 */
export type UnitType =
  | "year"
  | "y"
  | "month"
  | "M"
  | "week"
  | "w"
  | "day"
  | "d"
  | "hour"
  | "h"
  | "minute"
  | "m"
  | "second"
  | "s"
  | "millisecond"
  | "ms";

/**
 * Common date/time format patterns used in locales.
 *
 * @property LT - Time format (e.g., "HH:mm")
 * @property LTS - Time with seconds (e.g., "HH:mm:ss")
 * @property L - Short date (e.g., "DD/MM/YYYY")
 * @property LL - Long date (e.g., "D MMMM YYYY")
 * @property LLL - Long date with time (e.g., "D MMMM YYYY HH:mm")
 * @property LLLL - Full date with weekday (e.g., "dddd, D MMMM YYYY HH:mm")
 */
export type LocaleFormats = {
  LT?: string;
  LTS?: string;
  L?: string;
  LL?: string;
  LLL?: string;
  LLLL?: string;
};

/**
 * Relative time expressions configuration for locales.
 * Used for formatting relative time strings (e.g., "2 hours ago", "in 3 days").
 */
export type RelativeTimeConfig = {
  /** Future time format template (e.g., "in %s") */
  future?: string;
  /** Past time format template (e.g., "%s ago") */
  past?: string;
  /** Few seconds (e.g., "a few seconds") */
  s?: string;
  /** A minute (e.g., "a minute") */
  m?: string;
  /** Minutes plural (e.g., "%d minutes") */
  mm?: string;
  /** An hour (e.g., "an hour") */
  h?: string;
  /** Hours plural (e.g., "%d hours") */
  hh?: string;
  /** A day (e.g., "a day") */
  d?: string;
  /** Days plural (e.g., "%d days") */
  dd?: string;
  /** A month (e.g., "a month") */
  M?: string;
  /** Months plural (e.g., "%d months") */
  MM?: string;
  /** A year (e.g., "a year") */
  y?: string;
  /** Years plural (e.g., "%d years") */
  yy?: string;
};

/**
 * Complete locale configuration for internationalization.
 *
 * @example
 * ```ts
 * import { registerLocale } from 'fdu/locale';
 *
 * const myLocale: LocaleConfig = {
 *   name: 'en',
 *   months: ['January', 'February', ...],
 *   weekdays: ['Sunday', 'Monday', ...],
 *   formats: {
 *     LT: 'HH:mm',
 *     L: 'DD/MM/YYYY'
 *   }
 * };
 *
 * registerLocale('en', myLocale);
 * ```
 */
export type LocaleConfig = {
  /** Locale identifier (e.g., "en", "es", "zh-cn") */
  name: string;

  /** Year offset for alternative calendar systems (e.g., 543 for Thai Buddhist Era) */
  yearOffset?: number;

  /** Full month names [January...December] */
  months: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];

  /** Abbreviated month names (e.g., ["Jan", "Feb", ...]) */
  monthsShort?: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];

  /** Full weekday names [Sunday...Saturday] */
  weekdays: readonly [string, string, string, string, string, string, string];

  /** Abbreviated weekday names (e.g., ["Sun", "Mon", ...]) */
  weekdaysShort?: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];

  /** Minimal weekday names (e.g., ["Su", "Mo", ...]) */
  weekdaysMin?: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];

  /** First day of week (0=Sunday, 1=Monday, ..., 6=Saturday) */
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /** Common date/time format patterns */
  formats?: LocaleFormats;

  /** Relative time expressions */
  relativeTime?: RelativeTimeConfig;

  /** Ordinal number formatter (e.g., 1 => "1st", 2 => "2nd") */
  ordinal?: (n: number, period?: string) => string;

  /** AM/PM or time-of-day indicator formatter */
  meridiem?: (hour: number, minute: number, isLower?: boolean) => string;
};
