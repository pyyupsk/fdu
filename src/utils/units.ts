import type { UnitType } from "../core/types";

/**
 * Normalizes unit aliases to their full names.
 *
 * @param unit - Time unit (full name or abbreviation)
 * @returns Normalized unit name
 *
 * @example
 * ```ts
 * normalizeUnit('y') // 'year'
 * normalizeUnit('M') // 'month'
 * normalizeUnit('day') // 'day'
 * ```
 *
 * @internal
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

/**
 * Truncates a date to the start of the specified unit and returns a comparable timestamp.
 * Used for unit-aware date comparisons.
 *
 * @param date - The date to truncate
 * @param unit - The normalized unit to truncate to
 * @returns A timestamp representing the truncated date for comparison
 *
 * @example
 * ```ts
 * truncateToUnit(new Date('2025-06-15T14:30:45'), 'month')
 * // Returns timestamp for 2025-06-01T00:00:00
 * ```
 *
 * @internal
 */
export function truncateToUnit(date: Date, unit: string): number {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const h = date.getHours();
  const min = date.getMinutes();
  const s = date.getSeconds();

  switch (unit) {
    case "year":
      return new Date(y, 0, 1).getTime();
    case "month":
      return new Date(y, m, 1).getTime();
    case "day":
      return new Date(y, m, d).getTime();
    case "hour":
      return new Date(y, m, d, h).getTime();
    case "minute":
      return new Date(y, m, d, h, min).getTime();
    case "second":
      return new Date(y, m, d, h, min, s).getTime();
    default:
      return date.getTime();
  }
}
