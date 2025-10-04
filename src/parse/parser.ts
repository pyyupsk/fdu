/**
 * Date parsing - use JavaScript's built-in Date parser to keep things simple
 */

/**
 * Converts strings, numbers, or Date objects into a Date
 * Returns an invalid Date if the input is invalid
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
