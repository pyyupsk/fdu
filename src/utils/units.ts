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
