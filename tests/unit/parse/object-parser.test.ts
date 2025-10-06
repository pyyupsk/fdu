import {
  isObjectInput,
  parseObjectInput,
  parseObjectInputUTC,
} from "@/parse/object-parser";
import type { ObjectInput } from "@pyyupsk/fdu/types";
import { describe, expect, it } from "vitest";

describe("Object Parser", () => {
  describe("isObjectInput", () => {
    it("should return true for valid ObjectInput", () => {
      expect(isObjectInput({ year: 2025 })).toBe(true);
      expect(isObjectInput({ year: 2025, month: 9 })).toBe(true);
      expect(
        isObjectInput({
          year: 2025,
          month: 9,
          day: 30,
          hour: 14,
          minute: 30,
          second: 15,
          millisecond: 500,
        }),
      ).toBe(true);
    });

    it("should return false for non-object inputs", () => {
      expect(isObjectInput(null)).toBe(false);
      expect(isObjectInput(undefined)).toBe(false);
      expect(isObjectInput(42)).toBe(false);
      expect(isObjectInput("2025")).toBe(false);
      expect(isObjectInput([])).toBe(false);
    });

    it("should return false for objects without year", () => {
      expect(isObjectInput({})).toBe(false);
      expect(isObjectInput({ month: 9 })).toBe(false);
      expect(isObjectInput({ day: 30 })).toBe(false);
    });

    it("should return false for objects with non-number year", () => {
      expect(isObjectInput({ year: "2025" })).toBe(false);
      expect(isObjectInput({ year: null })).toBe(false);
      expect(isObjectInput({ year: undefined })).toBe(false);
    });
  });

  describe("parseObjectInput", () => {
    it("should parse minimal input with defaults", () => {
      const input: ObjectInput = { year: 2025 };
      const result = parseObjectInput(input);

      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should parse full input", () => {
      const input: ObjectInput = {
        year: 2025,
        month: 9,
        day: 30,
        hour: 14,
        minute: 30,
        second: 15,
        millisecond: 500,
      };
      const result = parseObjectInput(input);

      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(9); // October
      expect(result.getDate()).toBe(30);
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(15);
      expect(result.getMilliseconds()).toBe(500);
    });

    it("should parse partial inputs with defaults", () => {
      const input: ObjectInput = {
        year: 2025,
        month: 5,
        day: 15,
      };
      const result = parseObjectInput(input);

      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should normalize impossible dates", () => {
      const input: ObjectInput = {
        year: 2025,
        month: 1,
        day: 30, // Feb 30 doesn't exist, JavaScript normalizes to March 2
      };
      const result = parseObjectInput(input);

      // JavaScript Date constructor normalizes Feb 30 to March 2
      expect(result.getMonth()).toBe(2); // March
      expect(result.getDate()).toBe(2);
    });

    it("should create invalid date for out-of-range month", () => {
      const input: ObjectInput = {
        year: 2025,
        month: 13, // Invalid month
        day: 1,
      };
      const result = parseObjectInput(input);

      // Date constructor normalizes this
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(1); // February of next year
    });

    it("should handle edge cases", () => {
      // Leap year
      const leapYear: ObjectInput = {
        year: 2024,
        month: 1,
        day: 29,
      };
      const leapResult = parseObjectInput(leapYear);
      expect(leapResult.getFullYear()).toBe(2024);
      expect(leapResult.getMonth()).toBe(1);
      expect(leapResult.getDate()).toBe(29);

      // End of month
      const endOfMonth: ObjectInput = {
        year: 2025,
        month: 11,
        day: 31,
      };
      const endResult = parseObjectInput(endOfMonth);
      expect(endResult.getDate()).toBe(31);
    });

    it("should handle time-only inputs", () => {
      const input: ObjectInput = {
        year: 2025,
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 999,
      };
      const result = parseObjectInput(input);

      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe("parseObjectInputUTC", () => {
    it("should parse minimal input with defaults in UTC", () => {
      const input: ObjectInput = { year: 2025 };
      const result = parseObjectInputUTC(input);

      expect(result.getUTCFullYear()).toBe(2025);
      expect(result.getUTCMonth()).toBe(0);
      expect(result.getUTCDate()).toBe(1);
      expect(result.getUTCHours()).toBe(0);
      expect(result.getUTCMinutes()).toBe(0);
      expect(result.getUTCSeconds()).toBe(0);
      expect(result.getUTCMilliseconds()).toBe(0);
    });

    it("should parse full input in UTC", () => {
      const input: ObjectInput = {
        year: 2025,
        month: 9,
        day: 30,
        hour: 14,
        minute: 30,
        second: 15,
        millisecond: 500,
      };
      const result = parseObjectInputUTC(input);

      expect(result.getUTCFullYear()).toBe(2025);
      expect(result.getUTCMonth()).toBe(9);
      expect(result.getUTCDate()).toBe(30);
      expect(result.getUTCHours()).toBe(14);
      expect(result.getUTCMinutes()).toBe(30);
      expect(result.getUTCSeconds()).toBe(15);
      expect(result.getUTCMilliseconds()).toBe(500);
    });

    it("should parse partial inputs with defaults in UTC", () => {
      const input: ObjectInput = {
        year: 2025,
        month: 5,
        day: 15,
      };
      const result = parseObjectInputUTC(input);

      expect(result.getUTCFullYear()).toBe(2025);
      expect(result.getUTCMonth()).toBe(5);
      expect(result.getUTCDate()).toBe(15);
      expect(result.getUTCHours()).toBe(0);
      expect(result.getUTCMinutes()).toBe(0);
      expect(result.getUTCSeconds()).toBe(0);
    });

    it("should create invalid date for impossible dates in UTC", () => {
      const input: ObjectInput = {
        year: 2025,
        month: 1,
        day: 30, // Feb 30 doesn't exist
      };
      const result = parseObjectInputUTC(input);

      // Date.UTC normalizes this to March 2
      expect(result.getUTCMonth()).toBe(2);
      expect(result.getUTCDate()).toBe(2);
    });

    it("should handle leap year in UTC", () => {
      const input: ObjectInput = {
        year: 2024,
        month: 1,
        day: 29,
      };
      const result = parseObjectInputUTC(input);

      expect(result.getUTCFullYear()).toBe(2024);
      expect(result.getUTCMonth()).toBe(1);
      expect(result.getUTCDate()).toBe(29);
    });

    it("should create UTC date correctly", () => {
      const input: ObjectInput = {
        year: 2025,
        month: 0,
        day: 1,
        hour: 12,
      };

      const utcResult = parseObjectInputUTC(input);

      // Verify UTC components are set correctly
      expect(utcResult.getUTCFullYear()).toBe(2025);
      expect(utcResult.getUTCMonth()).toBe(0);
      expect(utcResult.getUTCDate()).toBe(1);
      expect(utcResult.getUTCHours()).toBe(12);
    });
  });
});
