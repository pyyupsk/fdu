/**
 * Checks if the first date is before the second date.
 *
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if date1 is before date2
 *
 * @internal
 */
export function isBefore(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime();
}

/**
 * Checks if the first date is after the second date.
 *
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if date1 is after date2
 *
 * @internal
 */
export function isAfter(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

/**
 * Checks if two dates are the same (exact millisecond match).
 *
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if dates are exactly the same
 *
 * @internal
 */
export function isSame(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime();
}

/**
 * Calculates the difference between two dates in the specified unit.
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @param unit - Unit for the difference (default: 'millisecond')
 * @returns Numeric difference in the specified unit
 *
 * @internal
 */
export function diff(
  date1: Date,
  date2: Date,
  unit: string = "millisecond",
): number {
  const millisDiff = date1.getTime() - date2.getTime();

  switch (unit) {
    case "year":
    case "y":
      return date1.getFullYear() - date2.getFullYear();
    case "month":
    case "M":
      return (
        (date1.getFullYear() - date2.getFullYear()) * 12 +
        (date1.getMonth() - date2.getMonth())
      );
    case "week":
    case "w":
      return Math.floor(millisDiff / (7 * 24 * 60 * 60 * 1000));
    case "day":
    case "d":
      return Math.floor(millisDiff / (24 * 60 * 60 * 1000));
    case "hour":
    case "h":
      return Math.floor(millisDiff / (60 * 60 * 1000));
    case "minute":
    case "m":
      return Math.floor(millisDiff / (60 * 1000));
    case "second":
    case "s":
      return Math.floor(millisDiff / 1000);
    default:
      return millisDiff;
  }
}
