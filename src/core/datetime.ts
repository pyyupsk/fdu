import { format as formatDate } from "../format/formatter";
import { getLocale } from "../locale/locale";
import { add as addToDate } from "../manipulate/add";
import { subtract as subtractFromDate } from "../manipulate/subtract";
import type { FdInput, FdInstance, UnitType } from "./types";
import { normalizeUnit } from "./types";

/**
 * The internal class that powers the DateTime object
 */
class DateTimeImpl implements FdInstance {
  private readonly _date: Date;
  private readonly _isValid: boolean;
  private readonly _locale: string | undefined;

  constructor(date: Date, locale?: string) {
    this._date = new Date(date.getTime());
    this._isValid = !Number.isNaN(this._date.getTime());
    this._locale = locale;
  }

  // Methods to get date/time values
  year(): number {
    return this._date.getFullYear();
  }

  month(): number {
    return this._date.getMonth();
  }

  date(): number {
    return this._date.getDate();
  }

  hour(): number {
    return this._date.getHours();
  }

  minute(): number {
    return this._date.getMinutes();
  }

  second(): number {
    return this._date.getSeconds();
  }

  millisecond(): number {
    return this._date.getMilliseconds();
  }

  day(): number {
    return this._date.getDay();
  }

  // Conversion and validation methods
  toDate(): Date {
    return new Date(this._date.getTime());
  }

  toISOString(): string {
    return this._date.toISOString();
  }

  valueOf(): number {
    return this._date.getTime();
  }

  isValid(): boolean {
    return this._isValid;
  }

  // Get or set the locale for this date instance
  locale(): string;
  locale(name: string): FdInstance;
  locale(name?: string): string | FdInstance {
    if (name === undefined) {
      return this._locale || "en";
    }
    return new DateTimeImpl(this._date, name);
  }

  // Format the date using a pattern
  format(pattern: string): string {
    const localeConfig = getLocale(this._locale || "en");
    return formatDate(this._date, pattern, localeConfig);
  }

  // Add or subtract time from date
  add(value: number, unit: UnitType): FdInstance {
    const newDate = addToDate(this._date, value, unit);
    return new DateTimeImpl(newDate, this._locale);
  }

  subtract(value: number, unit: UnitType): FdInstance {
    const newDate = subtractFromDate(this._date, value, unit);
    return new DateTimeImpl(newDate, this._locale);
  }

  // Compare date with another date
  isBefore(other: FdInstance): boolean {
    return this._date.getTime() < other.valueOf();
  }

  isAfter(other: FdInstance): boolean {
    return this._date.getTime() > other.valueOf();
  }

  isSame(other: FdInstance, unit?: UnitType): boolean {
    if (!unit) {
      return this._date.getTime() === other.valueOf();
    }

    const normalizedUnit = normalizeUnit(unit);

    // Compare by unit granularity
    const d1 = this._date;
    const d2 = other.toDate();

    switch (normalizedUnit) {
      case "year":
        return d1.getFullYear() === d2.getFullYear();
      case "month":
        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth()
        );
      case "day":
        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate()
        );
      case "hour":
        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate() &&
          d1.getHours() === d2.getHours()
        );
      case "minute":
        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate() &&
          d1.getHours() === d2.getHours() &&
          d1.getMinutes() === d2.getMinutes()
        );
      case "second":
        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate() &&
          d1.getHours() === d2.getHours() &&
          d1.getMinutes() === d2.getMinutes() &&
          d1.getSeconds() === d2.getSeconds()
        );
      default:
        return this._date.getTime() === other.valueOf();
    }
  }

  diff(other: FdInstance, unit: UnitType = "millisecond"): number {
    const normalizedUnit = normalizeUnit(unit);
    const diff = this._date.getTime() - other.valueOf();

    switch (normalizedUnit) {
      case "year":
        return this.year() - other.year();
      case "month":
        return (
          (this.year() - other.year()) * 12 + (this.month() - other.month())
        );
      case "week":
        return Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
      case "day":
        return Math.floor(diff / (24 * 60 * 60 * 1000));
      case "hour":
        return Math.floor(diff / (60 * 60 * 1000));
      case "minute":
        return Math.floor(diff / (60 * 1000));
      case "second":
        return Math.floor(diff / 1000);
      case "millisecond":
        return diff;
      default:
        return diff;
    }
  }
}

/**
 * Takes whatever date input and turns into a Date object
 */
function parseInput(input: FdInput): Date {
  if (input === undefined) {
    return new Date();
  }
  if (input instanceof Date) {
    return new Date(input.getTime());
  }
  if (typeof input === "number") {
    return new Date(input);
  }
  if (typeof input === "string") {
    return new Date(input);
  }
  // Handle DateTime objects by extracting internal Date
  if ("toDate" in input && typeof input.toDate === "function") {
    return input.toDate();
  }
  return new Date(NaN);
}

/**
 * Main factory function - creates a DateTime object from various inputs
 * Returns null if the date is invalid
 */
export function fd(input?: FdInput): FdInstance | null {
  const date = parseInput(input);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return new DateTimeImpl(date);
}

export type { FdInstance };
