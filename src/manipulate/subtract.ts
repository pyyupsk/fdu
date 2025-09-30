import type { Unit } from "../core/types.js";
import { add } from "./add.js";

/**
 * Subtracts time from a date - with a negative value
 */
export function subtract(date: Date, value: number, unit: Unit): Date {
  return add(date, -value, unit);
}
