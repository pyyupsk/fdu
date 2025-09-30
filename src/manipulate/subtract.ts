import type { UnitType } from "../core/types";
import { add } from "./add";

/**
 * Subtracts time from a date - with a negative value
 */
export function subtract(date: Date, value: number, unit: UnitType): Date {
  return add(date, -value, unit);
}
