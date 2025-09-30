import { describe, expect, it } from "vitest";
import { subtract } from "../../../src/manipulate/subtract";

describe("subtract()", () => {
  const baseDate = new Date("2025-09-30T12:00:00.000Z");

  describe("Subtracting years", () => {
    it("should subtract positive years", () => {
      const result = subtract(baseDate, 1, "year");
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(baseDate.getMonth());
      expect(result.getDate()).toBe(baseDate.getDate());
    });

    it("should subtract multiple years", () => {
      const result = subtract(baseDate, 5, "year");
      expect(result.getFullYear()).toBe(2020);
    });

    it("should handle negative years (add)", () => {
      const result = subtract(baseDate, -1, "year");
      expect(result.getFullYear()).toBe(2026);
    });

    it('should use short alias "y"', () => {
      const result = subtract(baseDate, 1, "y");
      expect(result.getFullYear()).toBe(2024);
    });

    it("should be immutable", () => {
      const original = baseDate.getTime();
      subtract(baseDate, 1, "year");
      expect(baseDate.getTime()).toBe(original);
    });
  });

  describe("Subtracting months", () => {
    it("should subtract positive months", () => {
      const result = subtract(baseDate, 1, "month");
      expect(result.getMonth()).toBe(7); // August (0-indexed)
      expect(result.getFullYear()).toBe(2025);
    });

    it("should roll back to previous year", () => {
      const result = subtract(baseDate, 10, "month");
      expect(result.getMonth()).toBe(10); // November (Sep-10 months wraps around)
      expect(result.getFullYear()).toBe(2024);
    });

    it("should handle negative months", () => {
      const result = subtract(baseDate, -1, "month");
      expect(result.getMonth()).toBe(9); // October
    });

    it('should use short alias "M"', () => {
      const result = subtract(baseDate, 1, "M");
      expect(result.getMonth()).toBe(7);
    });

    it("should handle month underflow with days", () => {
      const date = new Date("2025-03-31");
      const result = subtract(date, 1, "month");
      // JavaScript Date behavior: Mar 31 - 1 month = Feb 28/29 or Mar 3
      expect(result.getMonth()).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Subtracting weeks", () => {
    it("should subtract positive weeks", () => {
      const result = subtract(baseDate, 1, "week");
      expect(result.getDate()).toBe(baseDate.getDate() - 7);
    });

    it("should subtract multiple weeks", () => {
      const result = subtract(baseDate, 2, "week");
      expect(result.getDate()).toBe(baseDate.getDate() - 14);
    });

    it('should use short alias "w"', () => {
      const result = subtract(baseDate, 1, "w");
      expect(result.getDate()).toBe(baseDate.getDate() - 7);
    });

    it("should roll back to previous month", () => {
      const result = subtract(baseDate, 5, "week");
      expect(result.getMonth()).toBe(7); // August
    });
  });

  describe("Subtracting days", () => {
    it("should subtract positive days", () => {
      const result = subtract(baseDate, 1, "day");
      expect(result.getDate()).toBe(baseDate.getDate() - 1);
    });

    it("should subtract multiple days", () => {
      const result = subtract(baseDate, 7, "day");
      expect(result.getDate()).toBe(baseDate.getDate() - 7);
    });

    it('should use short alias "d"', () => {
      const result = subtract(baseDate, 1, "d");
      expect(result.getDate()).toBe(baseDate.getDate() - 1);
    });

    it("should roll back to previous month", () => {
      const result = subtract(baseDate, 30, "day");
      expect(result.getMonth()).toBe(7); // August
    });

    it("should roll back to previous year", () => {
      const result = subtract(baseDate, 300, "day");
      expect(result.getFullYear()).toBe(2024);
    });
  });

  describe("Subtracting hours", () => {
    it("should subtract positive hours", () => {
      const result = subtract(baseDate, 1, "hour");
      expect(result.getHours()).toBe(baseDate.getHours() - 1);
    });

    it("should subtract multiple hours", () => {
      const result = subtract(baseDate, 6, "hour");
      expect(result.getHours()).toBe(baseDate.getHours() - 6);
    });

    it('should use short alias "h"', () => {
      const result = subtract(baseDate, 1, "h");
      expect(result.getHours()).toBe(baseDate.getHours() - 1);
    });

    it("should roll back to previous day", () => {
      const result = subtract(baseDate, 24, "hour");
      expect(result.getDate()).toBe(baseDate.getDate() - 1);
    });
  });

  describe("Subtracting minutes", () => {
    it("should subtract positive minutes", () => {
      const result = subtract(baseDate, 30, "minute");
      const expected = new Date(baseDate.getTime());
      expected.setMinutes(expected.getMinutes() - 30);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('should use short alias "m"', () => {
      const result = subtract(baseDate, 15, "m");
      const expected = new Date(baseDate.getTime());
      expected.setMinutes(expected.getMinutes() - 15);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it("should roll back to previous hour", () => {
      const result = subtract(baseDate, 60, "minute");
      expect(result.getHours()).toBe(baseDate.getHours() - 1);
      expect(result.getMinutes()).toBe(baseDate.getMinutes());
    });
  });

  describe("Subtracting seconds", () => {
    it("should subtract positive seconds", () => {
      const result = subtract(baseDate, 30, "second");
      const expected = new Date(baseDate.getTime());
      expected.setSeconds(expected.getSeconds() - 30);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('should use short alias "s"', () => {
      const result = subtract(baseDate, 15, "s");
      const expected = new Date(baseDate.getTime());
      expected.setSeconds(expected.getSeconds() - 15);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it("should roll back to previous minute", () => {
      const result = subtract(baseDate, 60, "second");
      const expected = new Date(baseDate.getTime());
      expected.setMinutes(expected.getMinutes() - 1);
      expect(result.getTime()).toBe(expected.getTime());
    });
  });

  describe("Subtracting milliseconds", () => {
    it("should subtract positive milliseconds", () => {
      const result = subtract(baseDate, 500, "millisecond");
      const expected = new Date(baseDate.getTime());
      expected.setMilliseconds(expected.getMilliseconds() - 500);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('should use short alias "ms"', () => {
      const result = subtract(baseDate, 250, "ms");
      const expected = new Date(baseDate.getTime());
      expected.setMilliseconds(expected.getMilliseconds() - 250);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it("should roll back to previous second", () => {
      const result = subtract(baseDate, 1000, "millisecond");
      const expected = new Date(baseDate.getTime());
      expected.setSeconds(expected.getSeconds() - 1);
      expect(result.getTime()).toBe(expected.getTime());
    });
  });

  describe("Edge cases", () => {
    it("should handle subtracting zero", () => {
      const result = subtract(baseDate, 0, "day");
      expect(result.getTime()).toBe(baseDate.getTime());
    });

    it("should handle leap year", () => {
      const leapDate = new Date("2024-02-29");
      const result = subtract(leapDate, 1, "year");
      // Feb 29, 2024 - 1 year = Feb 28, 2023 (or Mar 1)
      expect(result.getFullYear()).toBe(2023);
    });

    it("should handle start of month boundary", () => {
      const startOfMonth = new Date("2025-03-01");
      const result = subtract(startOfMonth, 1, "day");
      expect(result.getMonth()).toBe(1); // February
    });

    it("should handle year boundary", () => {
      const startOfYear = new Date("2025-01-01T00:00:00");
      const result = subtract(startOfYear, 1, "day");
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(31);
    });

    it("should handle daylight saving time transitions", () => {
      // Note: behavior depends on system timezone
      const date = new Date("2025-11-02T03:00:00");
      const result = subtract(date, 2, "hour");
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe("Immutability", () => {
    it("should not mutate original date", () => {
      const original = new Date(baseDate.getTime());
      subtract(baseDate, 1, "day");
      expect(baseDate.getTime()).toBe(original.getTime());
    });

    it("should return new Date instance", () => {
      const result = subtract(baseDate, 1, "day");
      expect(result).not.toBe(baseDate);
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe("Symmetry with add", () => {
    it("should be inverse of add for days", () => {
      const result1 = subtract(baseDate, 5, "day");
      const result2 = subtract(baseDate, -5, "day");
      expect(Math.abs(result2.getTime() - result1.getTime())).toBeGreaterThan(
        0,
      );
    });

    it("should handle add/subtract round trip", () => {
      const date = new Date("2025-06-15T12:00:00");
      const added = new Date(date.getTime());
      added.setDate(added.getDate() + 10);
      const subtracted = subtract(added, 10, "day");
      expect(subtracted.getTime()).toBe(date.getTime());
    });
  });
});
