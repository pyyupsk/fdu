/**
 * Relative Time Plugin
 * Adds fromNow() and toNow() methods for human-readable time differences
 */

import type { FduInstance, Plugin, PluginAPI } from "../core/types";

export interface RelativeTimeOptions {
  /**
   * Locale for relative time strings
   * @default 'en'
   */
  locale?: string;

  /**
   * Display style
   * - 'long': "2 hours ago"
   * - 'short': "2h"
   * @default 'long'
   */
  style?: "long" | "short";
}

// Time thresholds in seconds
const THRESHOLDS = {
  SECONDS: 45,
  MINUTE: 90,
  MINUTES: 2700, // 45 minutes
  HOUR: 5400, // 90 minutes
  HOURS: 86400, // 24 hours
  DAY: 129600, // 1.5 days
  DAYS: 2592000, // 30 days
  MONTH: 3888000, // 45 days
  MONTHS: 31536000, // 365 days
  YEAR: 47304000, // 1.5 years
} as const;

// Time unit divisors (for duration-based units only)
const DIVISORS = {
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
} as const;

/**
 * Direction of time relative to now.
 *
 * @internal
 */
type TimeDirection = "past" | "future";

/**
 * Format configuration for time strings.
 *
 * @internal
 */
interface TimeFormat {
  short: string;
  long: (direction: TimeDirection) => string;
}

/**
 * Formats time string based on style and direction.
 *
 * @param format - Time format configuration
 * @param style - Display style (long/short)
 * @param direction - Time direction (past/future)
 * @returns Formatted time string
 *
 * @internal
 */
function formatTime(
  format: TimeFormat,
  style: "long" | "short",
  direction: TimeDirection,
): string {
  if (style === "short") return format.short;
  return format.long(direction);
}

/**
 * Converts seconds to human-readable relative time.
 *
 * @param seconds - Absolute seconds difference
 * @param direction - Time direction (past/future)
 * @param style - Display style (long/short)
 * @param thisDate - The current FduInstance (for calendar-based month/year calculations)
 * @param compareDate - The comparison FduInstance (for calendar-based month/year calculations)
 * @returns Formatted relative time string
 *
 * @internal
 */
function getTimeFormat(
  seconds: number,
  direction: TimeDirection,
  style: "long" | "short",
  thisDate?: FduInstance,
  compareDate?: FduInstance,
): string {
  if (seconds < THRESHOLDS.SECONDS) {
    return formatTime(
      {
        short: "now",
        long: (d) => (d === "past" ? "a few seconds ago" : "in a few seconds"),
      },
      style,
      direction,
    );
  }

  if (seconds < THRESHOLDS.MINUTE) {
    return formatTime(
      {
        short: "1m",
        long: (d) => (d === "past" ? "a minute ago" : "in a minute"),
      },
      style,
      direction,
    );
  }

  if (seconds < THRESHOLDS.MINUTES) {
    const mins = Math.floor(seconds / DIVISORS.MINUTE);
    return formatTime(
      {
        short: `${mins}m`,
        long: (d) =>
          d === "past" ? `${mins} minutes ago` : `in ${mins} minutes`,
      },
      style,
      direction,
    );
  }

  if (seconds < THRESHOLDS.HOUR) {
    return formatTime(
      {
        short: "1h",
        long: (d) => (d === "past" ? "an hour ago" : "in an hour"),
      },
      style,
      direction,
    );
  }

  if (seconds < THRESHOLDS.HOURS) {
    const hours = Math.floor(seconds / DIVISORS.HOUR);
    return formatTime(
      {
        short: `${hours}h`,
        long: (d) =>
          d === "past" ? `${hours} hours ago` : `in ${hours} hours`,
      },
      style,
      direction,
    );
  }

  if (seconds < THRESHOLDS.DAY) {
    return formatTime(
      {
        short: "1d",
        long: (d) => (d === "past" ? "a day ago" : "in a day"),
      },
      style,
      direction,
    );
  }

  if (seconds < THRESHOLDS.DAYS) {
    const days = Math.floor(seconds / DIVISORS.DAY);
    return formatTime(
      {
        short: `${days}d`,
        long: (d) => (d === "past" ? `${days} days ago` : `in ${days} days`),
      },
      style,
      direction,
    );
  }

  if (seconds < THRESHOLDS.MONTH) {
    return formatTime(
      {
        short: "1mo",
        long: (d) => (d === "past" ? "a month ago" : "in a month"),
      },
      style,
      direction,
    );
  }

  if (seconds < THRESHOLDS.MONTHS) {
    const months =
      thisDate && compareDate
        ? Math.abs(thisDate.diff(compareDate, "month"))
        : Math.floor(seconds / 2628000); // Fallback (30.4375 days)
    return formatTime(
      {
        short: `${months}mo`,
        long: (d) =>
          d === "past" ? `${months} months ago` : `in ${months} months`,
      },
      style,
      direction,
    );
  }

  if (seconds < THRESHOLDS.YEAR) {
    return formatTime(
      {
        short: "1y",
        long: (d) => (d === "past" ? "a year ago" : "in a year"),
      },
      style,
      direction,
    );
  }

  const years =
    thisDate && compareDate
      ? Math.abs(thisDate.diff(compareDate, "year"))
      : Math.floor(seconds / 31536000); // Fallback (365 days)
  return formatTime(
    {
      short: `${years}y`,
      long: (d) => (d === "past" ? `${years} years ago` : `in ${years} years`),
    },
    style,
    direction,
  );
}

/**
 * Relative time plugin for human-readable time differences
 *
 * Provides methods for:
 * - fromNow(): Time from the current moment (e.g., "2 hours ago", "in 3 days")
 * - toNow(): Time to the current moment (inverse of fromNow)
 * - from(date): Time from a specific date
 * - to(date): Time to a specific date
 *
 * Supports two display styles:
 * - 'long': Full text format ("2 hours ago", "in 3 days")
 * - 'short': Abbreviated format ("2h", "3d")
 *
 * @example
 * ```ts
 * import { fdu } from '@pyyupsk/fdu';
 * import { relativeTime } from '@pyyupsk/fdu/plugins/relative-time';
 *
 * // Long format (default)
 * fdu.extend(relativeTime, { style: 'long' });
 * const past = fdu('2025-10-01');
 * console.log(past.fromNow()); // "4 days ago"
 *
 * const future = fdu('2025-10-10');
 * console.log(future.toNow());  // "in 5 days"
 *
 * // Relative to specific dates
 * const date1 = fdu('2025-10-01');
 * const date2 = fdu('2025-10-05');
 * console.log(date1.from(date2)); // "4 days ago"
 * console.log(date1.to(date2));   // "in 4 days"
 *
 * // Short format
 * fdu.extend(relativeTime, { style: 'short' });
 * console.log(past.fromNow());   // "4d"
 * console.log(future.toNow());   // "5d"
 * ```
 */
export const relativeTime: Plugin<RelativeTimeOptions> = {
  name: "relative-time",
  version: "1.0.0",
  install(api: PluginAPI, options?: RelativeTimeOptions) {
    const style = options?.style ?? "long";

    // Add fromNow() method - "X time ago"
    api.extendPrototype("fromNow", function (this: FduInstance) {
      const now = api.createInstance(new Date());
      const thisDate = this.getInternalDate();
      const diff = now.getInternalDate().getTime() - thisDate.getTime();
      const seconds = Math.abs(diff) / 1000;
      const direction: TimeDirection = diff > 0 ? "past" : "future";

      return getTimeFormat(seconds, direction, style, this, now);
    });

    // Add toNow() method - "in X time" (inverse of fromNow)
    api.extendPrototype("toNow", function (this: FduInstance) {
      const now = api.createInstance(new Date());
      const thisDate = this.getInternalDate();
      const diff = thisDate.getTime() - now.getInternalDate().getTime();
      const seconds = Math.abs(diff) / 1000;
      const direction: TimeDirection = diff > 0 ? "future" : "past";

      return getTimeFormat(seconds, direction, style, this, now);
    });

    // Add from() method - "X time ago" relative to a specific date
    api.extendPrototype(
      "from",
      function (this: FduInstance, ...args: unknown[]) {
        const compared = args[0] as FduInstance;
        const comparedDate = compared.getInternalDate();
        const thisDate = this.getInternalDate();
        const diff = comparedDate.getTime() - thisDate.getTime();
        const seconds = Math.abs(diff) / 1000;
        const direction: TimeDirection = diff > 0 ? "past" : "future";

        return getTimeFormat(seconds, direction, style, this, compared);
      },
    );

    // Add to() method - "in X time" relative to a specific date (inverse of from)
    api.extendPrototype("to", function (this: FduInstance, ...args: unknown[]) {
      const compared = args[0] as FduInstance;
      const comparedDate = compared.getInternalDate();
      const thisDate = this.getInternalDate();
      const diff = thisDate.getTime() - comparedDate.getTime();
      const seconds = Math.abs(diff) / 1000;
      const direction: TimeDirection = diff > 0 ? "future" : "past";

      return getTimeFormat(seconds, direction, style, this, compared);
    });
  },
};

// TypeScript declaration merging for type safety
declare module "../core/types" {
  interface FduInstance {
    /**
     * Get relative time from now (e.g., "2 hours ago", "in 3 days")
     * Requires relativeTime plugin to be registered
     * @returns Human-readable relative time string
     */
    fromNow(): string;

    /**
     * Get relative time to now (inverse of fromNow)
     * Requires relativeTime plugin to be registered
     * @returns Human-readable relative time string
     */
    toNow(): string;

    /**
     * Get relative time from a specific date
     * Requires relativeTime plugin to be registered
     * @param compared - The date to compare against
     * @returns Human-readable relative time string
     */
    from(compared: FduInstance): string;

    /**
     * Get relative time to a specific date (inverse of from)
     * Requires relativeTime plugin to be registered
     * @param compared - The date to compare against
     * @returns Human-readable relative time string
     */
    to(compared: FduInstance): string;
  }
}
