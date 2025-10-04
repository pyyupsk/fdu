import type { FduInput } from "../core/types";

/**
 * Parses various input types into a Date object.
 *
 * @param input - Date, timestamp, or date string
 * @returns Parsed Date object (may be invalid if input is invalid)
 *
 * @internal
 */
export function parse(input: string | number | Date): Date {
  if (input instanceof Date) {
    return new Date(input.getTime());
  }
  if (typeof input === "number" || typeof input === "string") {
    return new Date(input);
  }
  return new Date(NaN);
}

/**
 * Parses FduInput (includes FduInstance) into a Date object.
 *
 * @param input - Various input types accepted by fdu()
 * @returns Parsed Date object (may be invalid if input is invalid)
 *
 * @internal
 */
export function parseInput(input: FduInput): Date {
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
