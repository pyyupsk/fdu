/**
 * Object representation of a date with all its components.
 *
 * @example
 * ```ts
 * const obj = fdu('2025-10-05T14:30:15.500Z').toObject();
 * // {
 * //   years: 2025,
 * //   months: 9,      // 0-indexed
 * //   date: 5,
 * //   hours: 14,
 * //   minutes: 30,
 * //   seconds: 15,
 * //   milliseconds: 500
 * // }
 * ```
 */
export interface DateObject {
  /** Four-digit year */
  years: number;
  /** Month (0-11, where 0 = January) */
  months: number;
  /** Day of month (1-31) */
  date: number;
  /** Hour (0-23) */
  hours: number;
  /** Minute (0-59) */
  minutes: number;
  /** Second (0-59) */
  seconds: number;
  /** Millisecond (0-999) */
  milliseconds: number;
}

/**
 * The main date-time instance interface with all available methods.
 */
export interface FduInstance {
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
   * Checks if this date is the same as or before another date.
   *
   * @param other - Date to compare with
   * @param unit - Optional unit for granularity ('year', 'month', 'day', etc.)
   * @returns True if this date is the same as or before the other date
   *
   * @example
   * ```ts
   * fdu('2025-10-05').isSameOrBefore(fdu('2025-10-05')); // true
   * fdu('2025-10-04').isSameOrBefore(fdu('2025-10-05')); // true
   * fdu('2025-10-06').isSameOrBefore(fdu('2025-10-05')); // false
   * ```
   */
  isSameOrBefore(other: FduInstance, unit?: UnitType): boolean;

  /**
   * Checks if this date is the same as or after another date.
   *
   * @param other - Date to compare with
   * @param unit - Optional unit for granularity ('year', 'month', 'day', etc.)
   * @returns True if this date is the same as or after the other date
   *
   * @example
   * ```ts
   * fdu('2025-10-05').isSameOrAfter(fdu('2025-10-05')); // true
   * fdu('2025-10-06').isSameOrAfter(fdu('2025-10-05')); // true
   * fdu('2025-10-04').isSameOrAfter(fdu('2025-10-05')); // false
   * ```
   */
  isSameOrAfter(other: FduInstance, unit?: UnitType): boolean;

  /**
   * Checks if the year of this date is a leap year.
   *
   * @returns True if the year is a leap year
   *
   * @example
   * ```ts
   * fdu('2024-01-01').isLeapYear(); // true
   * fdu('2025-01-01').isLeapYear(); // false
   * fdu('2000-01-01').isLeapYear(); // true
   * fdu('1900-01-01').isLeapYear(); // false
   * ```
   */
  isLeapYear(): boolean;

  /**
   * Checks if this date is today.
   *
   * @returns True if the date is today (same year, month, and day)
   *
   * @example
   * ```ts
   * fdu().isToday(); // true
   * fdu('2025-10-05').isToday(); // depends on current date
   * ```
   */
  isToday(): boolean;

  /**
   * Checks if this date is tomorrow.
   *
   * @returns True if the date is tomorrow (same year, month, and day as tomorrow)
   *
   * @example
   * ```ts
   * fdu().add(1, 'day').isTomorrow(); // true
   * fdu('2025-10-06').isTomorrow(); // depends on current date
   * ```
   */
  isTomorrow(): boolean;

  /**
   * Checks if this date is yesterday.
   *
   * @returns True if the date is yesterday (same year, month, and day as yesterday)
   *
   * @example
   * ```ts
   * fdu().subtract(1, 'day').isYesterday(); // true
   * fdu('2025-10-04').isYesterday(); // depends on current date
   * ```
   */
  isYesterday(): boolean;

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

  /**
   * Sets the day of the week.
   * @param value - Day of week (0-6, where 0 = Sunday)
   * @returns New FduInstance with the updated day
   */
  day(value: number): FduInstance;

  /** Gets the locale-aware day of the week (0-6, where 0 = first day of week in locale) */
  weekday(): number;

  /**
   * Sets the locale-aware day of the week.
   * @param value - Day of week (0-6, where 0 = first day of week in locale)
   * @returns New FduInstance with the updated day
   */
  weekday(value: number): FduInstance;

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

  /** Converts to an object with date components */
  toObject(): DateObject;

  /** Gets the Unix timestamp in milliseconds */
  valueOf(): number;

  /** Checks if the date is valid */
  isValid(): boolean;

  /** Gets the UTC offset in minutes */
  utcOffset(): number;

  /**
   * Sets the UTC offset in minutes.
   * @param offset - UTC offset in minutes
   * @returns New FduInstance with the specified UTC offset
   */
  utcOffset(offset: number): FduInstance;

  /**
   * Converts the instance to local time (if it was in UTC mode).
   * @returns New FduInstance in local time
   */
  local(): FduInstance;

  /**
   * Get the internal Date object (for plugin use)
   *
   * @internal
   */
  getInternalDate(): Date;
}

/**
 * Object-based date input for improved readability and type safety.
 *
 * @example
 * ```ts
 * import { fdu } from '@pyyupsk/fdu';
 *
 * // Minimal (year only, defaults applied)
 * const date1 = fdu({ year: 2025 }); // Jan 1, 2025 00:00:00
 *
 * // Full date-time
 * const date2 = fdu({
 *   year: 2025,
 *   month: 9,    // October (0-indexed: 0=Jan, 11=Dec)
 *   day: 30,
 *   hour: 14,
 *   minute: 30,
 *   second: 15
 * });
 * ```
 */
export interface ObjectInput {
  /** Four-digit year (required) */
  year: number;

  /**
   * Month (0-11, where 0 = January, 11 = December)
   * @default 0 (January)
   */
  month?: number;

  /**
   * Day of month (1-31)
   * @default 1
   */
  day?: number;

  /**
   * Hour (0-23)
   * @default 0
   */
  hour?: number;

  /**
   * Minute (0-59)
   * @default 0
   */
  minute?: number;

  /**
   * Second (0-59)
   * @default 0
   */
  second?: number;

  /**
   * Millisecond (0-999)
   * @default 0
   */
  millisecond?: number;
}

/**
 * Plugin interface for extending FdInstance functionality.
 *
 * @template T - Plugin options type
 *
 * @example
 * ```ts
 * import { fdu, type Plugin, type PluginAPI } from '@pyyupsk/fdu';
 *
 * const myPlugin: Plugin = {
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   install(api: PluginAPI) {
 *     api.extendPrototype('myMethod', function() {
 *       return this.format('YYYY-MM-DD');
 *     });
 *   }
 * };
 *
 * fdu.extend(myPlugin);
 * ```
 */
export interface Plugin<T = unknown> {
  /**
   * Optional plugin name (used for deduplication and debugging)
   */
  name?: string;

  /**
   * Plugin installation callback
   * Called when plugin is registered via fdu.extend()
   *
   * @param api - PluginAPI interface for safe prototype extension
   * @param options - Optional plugin configuration
   */
  install(api: PluginAPI, options?: T): void;

  /**
   * Optional plugin version (semantic versioning recommended)
   */
  version?: string;
}

/**
 * Plugin API interface passed to plugins during installation.
 * Provides safe access to FdInstance prototype and core functionality.
 *
 * @example
 * ```ts
 * const plugin: Plugin = {
 *   install(api: PluginAPI) {
 *     // Add method to prototype
 *     api.extendPrototype('tomorrow', function() {
 *       const date = this.getInternalDate();
 *       date.setDate(date.getDate() + 1);
 *       return api.createInstance(date);
 *     });
 *   }
 * };
 * ```
 */
export interface PluginAPI {
  /**
   * Add a method to FdInstance prototype
   *
   * @param methodName - Name of the method to add
   * @param fn - Method implementation (receives 'this' as FdInstance)
   * @throws CoreMethodOverrideError if methodName is a core method
   */
  extendPrototype(
    methodName: string,
    fn: (this: FduInstance, ...args: unknown[]) => unknown,
  ): void;

  /**
   * Access the underlying Date object (read-only)
   * Called as this.getInternalDate() within plugin methods
   *
   * @this FdInstance
   * @returns Underlying Date object
   *
   * @internal - For plugin development only
   */
  getInternalDate(this: FduInstance): Date;

  /**
   * Factory method for creating new FdInstance objects
   * Preserves immutability - plugins should not mutate, only create new
   *
   * @param date - Date value to wrap
   * @returns New immutable FdInstance
   */
  createInstance(date: Date | number | string): FduInstance;

  /**
   * Core library version (e.g., "1.5.0")
   * Used by plugins for compatibility checks
   */
  readonly version: string;
}

/**
 * Accepted input types for creating a date-time instance.
 */
export type FduInput =
  | Date
  | string
  | number
  | ObjectInput
  | FduInstance
  | undefined;

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
export interface LocaleFormats {
  LT?: string;
  LTS?: string;
  L?: string;
  LL?: string;
  LLL?: string;
  LLLL?: string;
}

/**
 * Relative time expressions configuration for locales.
 * Used for formatting relative time strings (e.g., "2 hours ago", "in 3 days").
 */
export interface RelativeTimeConfig {
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
}

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
export interface LocaleConfig {
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
}
