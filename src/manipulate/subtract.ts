import type { UnitType } from "../core/types";
import { add } from "./add";

export function subtract(date: Date, value: number, unit: UnitType): Date {
  return add(date, -value, unit);
}
