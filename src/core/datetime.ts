import { format as formatDate } from "../format/formatter";
import { locale as getGlobalLocale, resolveLocale } from "../locale/locale";
import { add as addToDate } from "../manipulate/add";
import { subtract as subtractFromDate } from "../manipulate/subtract";
import { parseInput } from "../parse/parser";
import { normalizeUnit } from "../utils/units";
import { PluginRegistry } from "./plugin-registry";
import type { FduInput, FduInstance, Plugin, UnitType } from "./types";

/**
 * Creates a date-time instance from various input types.
 *
 * @param input - Date input (Date, string, number, FduInstance, or undefined for current time)
 * @returns An FduInstance with methods for manipulation, formatting, and comparison
 *
 * @example
 * ```ts
 * // Current date/time
 * fdu()
 *
 * // From Date object
 * fdu(new Date())
 *
 * // From ISO string
 * fdu('2024-01-01T12:00:00Z')
 *
 * // From timestamp
 * fdu(1609459200000)
 *
 * // From another FduInstance
 * fdu(existingInstance)
 * ```
 */
export function fdu(input?: FduInput): FduInstance {
  const date = parseInput(input);
  return new DateTimeImpl(date, getGlobalLocale()) as unknown as FduInstance;
}

/**
 * Set the default FduInstance creation function
 */
PluginRegistry.setFduFunction(fdu);

/**
 * Register a plugin to extend FdInstance functionality
 *
 * @param plugin - Plugin object with install method
 * @param options - Optional plugin configuration
 *
 * @example
 * ```ts
 * import { fdu, type Plugin } from '@pyyupsk/fdu';
 *
 * const myPlugin: Plugin = {
 *   name: 'my-plugin',
 *   install(api) {
 *     api.extendPrototype('myMethod', function() {
 *       return this.format('YYYY-MM-DD');
 *     });
 *   }
 * };
 *
 * fdu.extend(myPlugin);
 * ```
 */
fdu.extend = <T>(plugin: Plugin<T>, options?: T): void => {
  const registry = PluginRegistry.getInstance();
  registry.register(plugin, options);
};

class DateTimeImpl {
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

  day(): number;
  day(value: number): FduInstance;
  day(value?: number): number | FduInstance {
    if (value === undefined) {
      return this._date.getDay();
    }
    const currentDay = this._date.getDay();
    const diff = value - currentDay;
    const newDate = new Date(this._date.getTime());
    newDate.setDate(newDate.getDate() + diff);
    return new DateTimeImpl(newDate, this._locale) as unknown as FduInstance;
  }

  weekday(): number;
  weekday(value: number): FduInstance;
  weekday(value?: number): number | FduInstance {
    const localeConfig = resolveLocale(this._locale);
    const weekStart = localeConfig.weekStart ?? 0;

    if (value === undefined) {
      const day = this._date.getDay();
      return (day - weekStart + 7) % 7;
    }

    const targetDay = (value + weekStart) % 7;
    const currentDay = this._date.getDay();
    const diff = targetDay - currentDay;
    const newDate = new Date(this._date.getTime());
    newDate.setDate(newDate.getDate() + diff);
    return new DateTimeImpl(newDate, this._locale) as unknown as FduInstance;
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
    return new DateTimeImpl(this._date, name) as unknown as FduInstance;
  }

  format(pattern: string): string {
    const localeConfig = resolveLocale(this._locale);
    return formatDate(this._date, pattern, localeConfig);
  }

  add(value: number, unit: UnitType): FduInstance {
    const newDate = addToDate(this._date, value, unit);
    return new DateTimeImpl(newDate, this._locale) as unknown as FduInstance;
  }

  subtract(value: number, unit: UnitType): FduInstance {
    const newDate = subtractFromDate(this._date, value, unit);
    return new DateTimeImpl(newDate, this._locale) as unknown as FduInstance;
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

  /**
   * Get the internal Date object (for plugin use)
   *
   * @internal
   */
  getInternalDate(): Date {
    return this._date;
  }
}
