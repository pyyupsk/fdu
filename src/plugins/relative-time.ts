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

// Time unit divisors
const DIVISORS = {
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
  MONTH: 2592000,
  YEAR: 31536000,
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
 * @returns Formatted relative time string
 *
 * @internal
 */
function getTimeFormat(
  seconds: number,
  direction: TimeDirection,
  style: "long" | "short",
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
    const mins = Math.round(seconds / DIVISORS.MINUTE);
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
    const hours = Math.round(seconds / DIVISORS.HOUR);
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
    const days = Math.round(seconds / DIVISORS.DAY);
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
    const months = Math.round(seconds / DIVISORS.MONTH);
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

  const years = Math.round(seconds / DIVISORS.YEAR);
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
 * @example
 * ```ts
 * import { fdu } from '@pyyupsk/fdu';
 * import { relativeTime } from '@pyyupsk/fdu/plugins/relative-time';
 *
 * fdu.extend(relativeTime, { style: 'long' });
 *
 * const past = fdu('2025-10-01');
 * console.log(past.fromNow()); // "4 days ago"
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

      return getTimeFormat(seconds, direction, style);
    });

    // Add toNow() method - "in X time" (inverse of fromNow)
    api.extendPrototype("toNow", function (this: FduInstance) {
      const now = api.createInstance(new Date());
      const thisDate = this.getInternalDate();
      const diff = thisDate.getTime() - now.getInternalDate().getTime();
      const seconds = Math.abs(diff) / 1000;
      const direction: TimeDirection = diff > 0 ? "future" : "past";

      return getTimeFormat(seconds, direction, style);
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
    fromNow?(): string;

    /**
     * Get relative time to now (inverse of fromNow)
     * Requires relativeTime plugin to be registered
     * @returns Human-readable relative time string
     */
    toNow?(): string;
  }
}
