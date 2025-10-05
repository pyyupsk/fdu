/**
 * Object input parser for date construction
 */

import type { ObjectInput } from "../core/types";

/**
 * Type guard to check if input is an ObjectInput
 *
 * @param input - Value to check
 * @returns True if input is an object with a year property
 *
 * @internal
 */
export function isObjectInput(input: unknown): input is ObjectInput {
  return (
    typeof input === "object" &&
    input !== null &&
    "year" in input &&
    typeof (input as Record<string, unknown>).year === "number"
  );
}

/**
 * Parse ObjectInput and create a Date object
 * Applies defaults for optional fields and delegates validation to Date constructor
 *
 * @param input - ObjectInput with year (required) and optional date/time components
 * @returns Date object (may be invalid if components are impossible)
 *
 * @internal
 *
 * @example
 * ```ts
 * // Minimal
 * parseObjectInput({ year: 2025 }) // Jan 1, 2025 00:00:00
 *
 * // Full
 * parseObjectInput({
 *   year: 2025, month: 9, day: 30,
 *   hour: 14, minute: 30, second: 15, millisecond: 500
 * })
 *
 * // Invalid (Feb 30)
 * parseObjectInput({ year: 2025, month: 1, day: 30 }) // Invalid Date
 * ```
 */
export function parseObjectInput(input: ObjectInput): Date {
  const {
    year,
    month = 0,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  } = input;

  // Use native Date constructor for validation
  // Invalid combinations (Feb 30, month 13, etc.) will create invalid Date
  return new Date(year, month, day, hour, minute, second, millisecond);
}

/**
 * Parse ObjectInput in UTC mode
 * Similar to parseObjectInput but interprets all components as UTC
 *
 * @param input - ObjectInput with date/time components
 * @returns Date object in UTC (may be invalid if components are impossible)
 *
 * @internal
 */
export function parseObjectInputUTC(input: ObjectInput): Date {
  const {
    year,
    month = 0,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  } = input;

  // Use Date.UTC for UTC mode
  return new Date(
    Date.UTC(year, month, day, hour, minute, second, millisecond),
  );
}
