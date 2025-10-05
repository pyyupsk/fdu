/**
 * Advanced Format Plugin
 * Adds utility methods for quarters, week numbers, and day of year
 */

import type { FduInstance, Plugin, PluginAPI } from "../core/types";

/**
 * Advanced format plugin providing additional date utility methods
 *
 * @example
 * ```ts
 * import { fdu } from '@pyyupsk/fdu';
 * import { advancedFormat } from '@pyyupsk/fdu/plugins/advanced-format';
 *
 * fdu.extend(advancedFormat);
 *
 * const date = fdu('2025-10-05');
 * console.log(date.quarter());    // 4
 * console.log(date.weekOfYear()); // 40
 * console.log(date.dayOfYear());  // 278
 * ```
 */
export const advancedFormat: Plugin = {
  name: "advanced-format",
  version: "1.0.0",
  install(api: PluginAPI) {
    // Add quarter() method - returns 1-4
    api.extendPrototype("quarter", function (this: FduInstance) {
      const month = this.month();
      return Math.floor(month / 3) + 1;
    });

    // Add weekOfYear() method - returns 1-53
    api.extendPrototype("weekOfYear", function (this: FduInstance) {
      const date = this.getInternalDate();
      const yearStart = new Date(date.getFullYear(), 0, 1);
      const dayOfYear =
        Math.floor((date.getTime() - yearStart.getTime()) / 86400000) + 1;

      // Get day of week for Jan 1st (0 = Sunday)
      const jan1DayOfWeek = yearStart.getDay();

      // Calculate week number (ISO 8601 standard)
      // Week 1 is the first week with a Thursday
      const weekNumber = Math.ceil((dayOfYear + jan1DayOfWeek) / 7);

      return weekNumber;
    });

    // Add dayOfYear() method - returns 1-366
    api.extendPrototype("dayOfYear", function (this: FduInstance) {
      const date = this.getInternalDate();
      const yearStart = new Date(date.getFullYear(), 0, 1);
      const dayOfYear =
        Math.floor((date.getTime() - yearStart.getTime()) / 86400000) + 1;

      return dayOfYear;
    });
  },
};

// TypeScript declaration merging for type safety
declare module "../core/types" {
  interface FduInstance {
    /**
     * Get the quarter of the year (1-4)
     * Requires advancedFormat plugin to be registered
     * @returns Quarter number (1 = Q1, 2 = Q2, 3 = Q3, 4 = Q4)
     */
    quarter?(): number;

    /**
     * Get the week number of the year (1-53)
     * Uses ISO 8601 standard: week 1 is the first week with a Thursday
     * Requires advancedFormat plugin to be registered
     * @returns Week number of the year
     */
    weekOfYear?(): number;

    /**
     * Get the day number of the year (1-366)
     * Requires advancedFormat plugin to be registered
     * @returns Day number (1 = Jan 1, 365/366 = Dec 31)
     */
    dayOfYear?(): number;
  }
}
