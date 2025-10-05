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

      const isPast = diff > 0;

      if (seconds < 45) {
        return style === "short"
          ? "now"
          : isPast
            ? "a few seconds ago"
            : "in a few seconds";
      }

      if (seconds < 90) {
        return style === "short"
          ? "1m"
          : isPast
            ? "a minute ago"
            : "in a minute";
      }

      if (seconds < 2700) {
        // 45 minutes
        const mins = Math.round(seconds / 60);
        return style === "short"
          ? `${mins}m`
          : isPast
            ? `${mins} minutes ago`
            : `in ${mins} minutes`;
      }

      if (seconds < 5400) {
        // 90 minutes
        return style === "short" ? "1h" : isPast ? "an hour ago" : "in an hour";
      }

      if (seconds < 86400) {
        // 24 hours
        const hours = Math.round(seconds / 3600);
        return style === "short"
          ? `${hours}h`
          : isPast
            ? `${hours} hours ago`
            : `in ${hours} hours`;
      }

      if (seconds < 129600) {
        // 1.5 days
        return style === "short" ? "1d" : isPast ? "a day ago" : "in a day";
      }

      if (seconds < 2592000) {
        // 30 days
        const days = Math.round(seconds / 86400);
        return style === "short"
          ? `${days}d`
          : isPast
            ? `${days} days ago`
            : `in ${days} days`;
      }

      if (seconds < 3888000) {
        // 45 days
        return style === "short"
          ? "1mo"
          : isPast
            ? "a month ago"
            : "in a month";
      }

      if (seconds < 31536000) {
        // 365 days
        const months = Math.round(seconds / 2592000);
        return style === "short"
          ? `${months}mo`
          : isPast
            ? `${months} months ago`
            : `in ${months} months`;
      }

      if (seconds < 47304000) {
        // 1.5 years
        return style === "short" ? "1y" : isPast ? "a year ago" : "in a year";
      }

      const years = Math.round(seconds / 31536000);
      return style === "short"
        ? `${years}y`
        : isPast
          ? `${years} years ago`
          : `in ${years} years`;
    });

    // Add toNow() method - "in X time" (inverse of fromNow)
    api.extendPrototype("toNow", function (this: FduInstance) {
      const now = api.createInstance(new Date());
      const thisDate = this.getInternalDate();
      const diff = thisDate.getTime() - now.getInternalDate().getTime();
      const seconds = Math.abs(diff) / 1000;

      const isFuture = diff > 0;

      if (seconds < 45) {
        return style === "short"
          ? "now"
          : isFuture
            ? "in a few seconds"
            : "a few seconds ago";
      }

      if (seconds < 90) {
        return style === "short"
          ? "1m"
          : isFuture
            ? "in a minute"
            : "a minute ago";
      }

      if (seconds < 2700) {
        const mins = Math.round(seconds / 60);
        return style === "short"
          ? `${mins}m`
          : isFuture
            ? `in ${mins} minutes`
            : `${mins} minutes ago`;
      }

      if (seconds < 5400) {
        return style === "short"
          ? "1h"
          : isFuture
            ? "in an hour"
            : "an hour ago";
      }

      if (seconds < 86400) {
        const hours = Math.round(seconds / 3600);
        return style === "short"
          ? `${hours}h`
          : isFuture
            ? `in ${hours} hours`
            : `${hours} hours ago`;
      }

      if (seconds < 129600) {
        return style === "short" ? "1d" : isFuture ? "in a day" : "a day ago";
      }

      if (seconds < 2592000) {
        const days = Math.round(seconds / 86400);
        return style === "short"
          ? `${days}d`
          : isFuture
            ? `in ${days} days`
            : `${days} days ago`;
      }

      if (seconds < 3888000) {
        return style === "short"
          ? "1mo"
          : isFuture
            ? "in a month"
            : "a month ago";
      }

      if (seconds < 31536000) {
        const months = Math.round(seconds / 2592000);
        return style === "short"
          ? `${months}mo`
          : isFuture
            ? `in ${months} months`
            : `${months} months ago`;
      }

      if (seconds < 47304000) {
        return style === "short" ? "1y" : isFuture ? "in a year" : "a year ago";
      }

      const years = Math.round(seconds / 31536000);
      return style === "short"
        ? `${years}y`
        : isFuture
          ? `in ${years} years`
          : `${years} years ago`;
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
