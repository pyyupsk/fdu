/**
 * Core type definitions for the fdu date-time library
 */

// FduInstance interface with all available methods
export type FduInstance = {
  format(pattern: string): string;
  add(value: number, unit: UnitType): FduInstance;
  subtract(value: number, unit: UnitType): FduInstance;
  isBefore(other: FduInstance): boolean;
  isAfter(other: FduInstance): boolean;
  isSame(other: FduInstance, unit?: UnitType): boolean;
  diff(other: FduInstance, unit?: UnitType): number;
  year(): number;
  month(): number;
  date(): number;
  hour(): number;
  minute(): number;
  second(): number;
  millisecond(): number;
  day(): number;
  locale(): string;
  locale(name: string): FduInstance;
  toDate(): Date;
  toISOString(): string;
  valueOf(): number;
  isValid(): boolean;
};

/**
 * All the different types can pass in to create a date
 */
export type FduInput = Date | string | number | FduInstance | undefined;

/**
 * Time units for adding, subtracting, and comparing dates
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
 * Date/time format patterns for common scenarios
 */
export type LocaleFormats = {
  /** Time format (e.g., "HH:mm") */
  LT?: string;
  /** Time with seconds format (e.g., "HH:mm:ss") */
  LTS?: string;
  /** Short date format (e.g., "DD/MM/YYYY") */
  L?: string;
  /** Long date format (e.g., "D MMMM YYYY") */
  LL?: string;
  /** Long date with time (e.g., "D MMMM YYYY HH:mm") */
  LLL?: string;
  /** Full date with weekday and time (e.g., "dddd, D MMMM YYYY HH:mm") */
  LLLL?: string;
};

/**
 * Relative time expressions configuration
 */
export type RelativeTimeConfig = {
  /** Future time format (e.g., "in %s") */
  future?: string;
  /** Past time format (e.g., "%s ago") */
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
 * Locale configuration for translating month names, weekdays, etc.
 */
export type LocaleConfig = {
  /** Locale identifier (e.g., "en", "es", "zh-cn") */
  name: string;
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
  /** Abbreviated month names (optional) */
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
  /** Abbreviated weekday names (optional) */
  weekdaysShort?: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  /** Minimal weekday names (optional) */
  weekdaysMin?: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  /** First day of week: 0=Sunday, 1=Monday, 6=Saturday */
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Date/time format patterns */
  formats?: LocaleFormats;
  /** Relative time expressions */
  relativeTime?: RelativeTimeConfig;
  /** Ordinal number formatter (e.g., 1 => "1st", 2 => "2nd") */
  ordinal?: (n: number, period?: string) => string;
  /** AM/PM or time-of-day indicator */
  meridiem?: (hour: number, minute: number, isLower?: boolean) => string;
};

/**
 * Normalize unit aliases to standard unit names
 */
export function normalizeUnit(unit: UnitType): UnitType {
  const unitMap: Record<string, UnitType> = {
    y: "year",
    M: "month",
    w: "week",
    d: "day",
    h: "hour",
    m: "minute",
    s: "second",
    ms: "millisecond",
  };
  return unitMap[unit] || unit;
}
