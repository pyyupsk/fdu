import type { UnitType } from "../core/types";
import { normalizeUnit } from "../core/types";

export function add(date: Date, value: number, unit: UnitType): Date {
  const result = new Date(date.getTime());
  const normalizedUnit = normalizeUnit(unit);

  switch (normalizedUnit) {
    case "year":
      result.setFullYear(result.getFullYear() + value);
      break;
    case "month":
      result.setMonth(result.getMonth() + value);
      break;
    case "week":
      result.setDate(result.getDate() + value * 7);
      break;
    case "day":
      result.setDate(result.getDate() + value);
      break;
    case "hour":
      result.setHours(result.getHours() + value);
      break;
    case "minute":
      result.setMinutes(result.getMinutes() + value);
      break;
    case "second":
      result.setSeconds(result.getSeconds() + value);
      break;
    case "millisecond":
      result.setMilliseconds(result.getMilliseconds() + value);
      break;
    default:
      break;
  }

  return result;
}
