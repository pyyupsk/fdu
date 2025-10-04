import type { UnitType } from "../core/types";
import { add } from "./add";

/**
 * Subtracts a specified amount of time from a date.
 *
 * @param date - The date to subtract time from
 * @param value - Amount to subtract
 * @param unit - Time unit for the subtraction
 * @returns New date with the subtracted time
 *
 * @internal
 */
export function subtract(date: Date, value: number, unit: UnitType): Date {
  return add(date, -value, unit);
}
