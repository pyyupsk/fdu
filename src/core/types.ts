/**
 * Core type definitions for the fd date-time library
 */

// FdInstance interface with all available methods
export type FdInstance = {
  format(pattern: string): string;
  add(value: number, unit: UnitType): FdInstance;
  subtract(value: number, unit: UnitType): FdInstance;
  isBefore(other: FdInstance): boolean;
  isAfter(other: FdInstance): boolean;
  isSame(other: FdInstance, unit?: UnitType): boolean;
  diff(other: FdInstance, unit?: UnitType): number;
  year(): number;
  month(): number;
  date(): number;
  hour(): number;
  minute(): number;
  second(): number;
  millisecond(): number;
  day(): number;
  locale(): string;
  locale(name: string): FdInstance;
  toDate(): Date;
  toISOString(): string;
  valueOf(): number;
  isValid(): boolean;
};

/**
 * All the different types can pass in to create a date
 */
export type FdInput = Date | string | number | FdInstance | undefined;

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
 * Locale configuration for translating month names, weekdays, etc.
 */
export type LocaleConfig = {
  name: string;
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
  monthsShort: readonly [
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
  weekdays: readonly [string, string, string, string, string, string, string];
  weekdaysShort: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  weekdaysMin: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  formats?: Record<string, string>;
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
