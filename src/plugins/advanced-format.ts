/**
 * Advanced Format Plugin
 * Adds utility methods for quarters, week numbers, and day of year
 */

import type { FduInstance, Plugin, PluginAPI } from "../core/types";

/**
 * Advanced format plugin providing additional date utility methods
 *
 * Provides methods for:
 * - Day calculations: dayOfYear(), isoWeekday()
 * - Week calculations: weekOfYear(), isoWeek()
 * - Year calculations: weekYear(), isoWeekYear(), isoWeeksInYear()
 * - Quarter calculations: quarter()
 *
 * @example
 * ```ts
 * import { fdu } from '@pyyupsk/fdu';
 * import { advancedFormat } from '@pyyupsk/fdu/plugins/advanced-format';
 *
 * fdu.extend(advancedFormat);
 *
 * const date = fdu('2025-10-05');
 *
 * // Day methods
 * console.log(date.dayOfYear());   // 278
 * console.log(date.isoWeekday());  // 7 (Sunday)
 *
 * // Week methods
 * console.log(date.weekOfYear());  // 40
 * console.log(date.isoWeek());     // 40
 *
 * // Year methods
 * console.log(date.weekYear());    // 2025
 * console.log(date.isoWeekYear()); // 2025
 * console.log(date.isoWeeksInYear()); // 52
 *
 * // Quarter method
 * console.log(date.quarter());     // 4
 * ```
 */
export const advancedFormat: Plugin = {
  name: "advanced-format",
  version: "1.0.0",
  install(api: PluginAPI) {
    // === Day Methods ===

    // Add dayOfYear() method - returns 1-366
    api.extendPrototype("dayOfYear", function (this: FduInstance) {
      const date = this.getInternalDate();
      const yearStart = new Date(date.getFullYear(), 0, 1);
      const dayOfYear =
        Math.floor((date.getTime() - yearStart.getTime()) / 86400000) + 1;

      return dayOfYear;
    });

    // Add isoWeekday() method - returns 1-7 (Monday=1, Sunday=7)
    api.extendPrototype("isoWeekday", function (this: FduInstance) {
      const date = this.getInternalDate();
      const day = date.getDay();
      // Convert Sunday (0) to 7, keep Monday (1) to Saturday (6) as is
      return day === 0 ? 7 : day;
    });

    // === Week Methods ===

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

    // Add isoWeek() method - returns ISO week number 1-53
    api.extendPrototype("isoWeek", function (this: FduInstance) {
      const date = this.getInternalDate();
      const target = new Date(date.valueOf());
      const dayNr = (date.getDay() + 6) % 7;
      target.setDate(target.getDate() - dayNr + 3);
      const firstThursday = target.valueOf();
      target.setMonth(0, 1);
      if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
      }
      return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    });

    // === Year Methods ===

    // Add weekYear() method - returns the year that the week belongs to
    api.extendPrototype("weekYear", function (this: FduInstance) {
      const date = this.getInternalDate();
      const year = date.getFullYear();
      const weekNum = this.weekOfYear?.() ?? 1;

      // If week is 1 and we're in December, year is next year
      if (weekNum === 1 && date.getMonth() === 11) {
        return year + 1;
      }
      // If week is 52/53 and we're in January, year is previous year
      if (weekNum >= 52 && date.getMonth() === 0) {
        return year - 1;
      }
      return year;
    });

    // Add isoWeekYear() method - returns ISO week-numbering year
    api.extendPrototype("isoWeekYear", function (this: FduInstance) {
      const date = this.getInternalDate();
      const year = date.getFullYear();
      const isoWeek = this.isoWeek?.() ?? 1;

      // If ISO week is 1 and we're in December, year is next year
      if (isoWeek === 1 && date.getMonth() === 11) {
        return year + 1;
      }
      // If ISO week is 52/53 and we're in January, year is previous year
      if (isoWeek >= 52 && date.getMonth() === 0) {
        return year - 1;
      }
      return year;
    });

    // Add isoWeeksInYear() method - returns number of ISO weeks in the year
    api.extendPrototype("isoWeeksInYear", function (this: FduInstance) {
      const year = this.isoWeekYear?.() ?? new Date().getFullYear();
      const lastDay = new Date(year, 11, 31);
      const lastDayInstance = api.createInstance(lastDay);
      const lastWeek = lastDayInstance.isoWeek?.() ?? 52;

      // If last week is 1, then we have 52 weeks (week 1 belongs to next year)
      return lastWeek === 1 ? 52 : lastWeek;
    });

    // === Quarter Methods ===

    // Add quarter() method - returns 1-4
    api.extendPrototype("quarter", function (this: FduInstance) {
      const month = this.month();
      return Math.floor(month / 3) + 1;
    });
  },
};

// TypeScript declaration merging for type safety
declare module "../core/types" {
  interface FduInstance {
    /**
     * Get the day number of the year (1-366)
     * Requires advancedFormat plugin to be registered
     * @returns Day number (1 = Jan 1, 365/366 = Dec 31)
     */
    dayOfYear(): number;

    /**
     * Get ISO day of week (1-7, Monday=1, Sunday=7)
     * Requires advancedFormat plugin to be registered
     * @returns ISO day of week number
     */
    isoWeekday(): number;

    /**
     * Get the week number of the year (1-53)
     * Uses ISO 8601 standard: week 1 is the first week with a Thursday
     * Requires advancedFormat plugin to be registered
     * @returns Week number of the year
     */
    weekOfYear(): number;

    /**
     * Get ISO week number of the year (1-53)
     * Uses ISO 8601 week date system
     * Requires advancedFormat plugin to be registered
     * @returns ISO week number
     */
    isoWeek(): number;

    /**
     * Get the year that the week belongs to
     * Requires advancedFormat plugin to be registered
     * @returns Week year
     */
    weekYear(): number;

    /**
     * Get ISO week-numbering year
     * Requires advancedFormat plugin to be registered
     * @returns ISO week year
     */
    isoWeekYear(): number;

    /**
     * Get number of ISO weeks in the year (52 or 53)
     * Requires advancedFormat plugin to be registered
     * @returns Number of ISO weeks in year
     */
    isoWeeksInYear(): number;

    /**
     * Get the quarter of the year (1-4)
     * Requires advancedFormat plugin to be registered
     * @returns Quarter number (1 = Q1, 2 = Q2, 3 = Q3, 4 = Q4)
     */
    quarter(): number;
  }
}
