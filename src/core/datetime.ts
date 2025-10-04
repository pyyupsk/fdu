import { format as formatDate } from "../format/formatter";
import { locale as getGlobalLocale, getLocale } from "../locale/locale";
import { add as addToDate } from "../manipulate/add";
import { subtract as subtractFromDate } from "../manipulate/subtract";
import type { FduInput, FduInstance, LocaleConfig, UnitType } from "./types";
import { normalizeUnit } from "./types";

function resolveLocale(instanceLocale: string | undefined): LocaleConfig {
  const localeName = instanceLocale || getGlobalLocale();
  const config = getLocale(localeName);

  if (!config) {
    console.warn(`Locale "${localeName}" not registered, falling back to "en"`);
    return getLocale("en") as LocaleConfig;
  }

  return config;
}

class DateTimeImpl implements FduInstance {
  private readonly _date: Date;
  private readonly _isValid: boolean;
  private readonly _locale: string | undefined;

  constructor(date: Date, locale?: string) {
    this._date = new Date(date.getTime());
    this._isValid = !Number.isNaN(this._date.getTime());
    this._locale = locale;
  }

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

  locale(): string;
  locale(name: string): FduInstance;
  locale(name?: string): string | FduInstance {
    if (name === undefined) {
      return this._locale || getGlobalLocale();
    }
    return new DateTimeImpl(this._date, name);
  }

  format(pattern: string): string {
    const localeConfig = resolveLocale(this._locale);
    return formatDate(this._date, pattern, localeConfig);
  }

  add(value: number, unit: UnitType): FduInstance {
    const newDate = addToDate(this._date, value, unit);
    return new DateTimeImpl(newDate, this._locale);
  }

  subtract(value: number, unit: UnitType): FduInstance {
    const newDate = subtractFromDate(this._date, value, unit);
    return new DateTimeImpl(newDate, this._locale);
  }

  isBefore(other: FduInstance): boolean {
    return this._date.getTime() < other.valueOf();
  }

  isAfter(other: FduInstance): boolean {
    return this._date.getTime() > other.valueOf();
  }

  isSame(other: FduInstance, unit?: UnitType): boolean {
    if (!unit) {
      return this._date.getTime() === other.valueOf();
    }

    const normalizedUnit = normalizeUnit(unit);
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

  diff(other: FduInstance, unit: UnitType = "millisecond"): number {
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

function parseInput(input: FduInput): Date {
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
  if ("toDate" in input && typeof input.toDate === "function") {
    return input.toDate();
  }
  return new Date(NaN);
}

export function fdu(input?: FduInput): FduInstance {
  const date = parseInput(input);
  return new DateTimeImpl(date, getGlobalLocale());
}
