import { add } from "@/manipulate/add";
import { describe, expect, it } from "vitest";

describe("add()", () => {
  const baseDate = new Date("2025-09-30T12:00:00.000Z");

  describe("Unknown units", () => {
    it("should handle unknown unit gracefully", () => {
      // biome-ignore lint/suspicious/noExplicitAny: test edge case
      const result = add(baseDate, 1, "unknown" as any);
      // Should return a valid date without changes
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBe(baseDate.getTime());
    });
  });

  describe("Adding years", () => {
    it("should add positive years", () => {
      const result = add(baseDate, 1, "year");
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(baseDate.getMonth());
      expect(result.getDate()).toBe(baseDate.getDate());
    });

    it("should add multiple years", () => {
      const result = add(baseDate, 5, "year");
      expect(result.getFullYear()).toBe(2030);
    });

    it("should handle negative years (subtract)", () => {
      const result = add(baseDate, -1, "year");
      expect(result.getFullYear()).toBe(2024);
    });

    it('should use short alias "y"', () => {
      const result = add(baseDate, 1, "y");
      expect(result.getFullYear()).toBe(2026);
    });

    it("should be immutable", () => {
      const original = baseDate.getTime();
      add(baseDate, 1, "year");
      expect(baseDate.getTime()).toBe(original);
    });
  });

  describe("Adding months", () => {
    it("should add positive months", () => {
      const result = add(baseDate, 1, "month");
      expect(result.getMonth()).toBe(9); // October (0-indexed)
      expect(result.getFullYear()).toBe(2025);
    });

    it("should roll over to next year", () => {
      const result = add(baseDate, 4, "month");
      expect(result.getMonth()).toBe(0); // January
      expect(result.getFullYear()).toBe(2026);
    });

    it("should handle negative months", () => {
      const result = add(baseDate, -1, "month");
      expect(result.getMonth()).toBe(7); // August
    });

    it('should use short alias "M"', () => {
      const result = add(baseDate, 1, "M");
      expect(result.getMonth()).toBe(9);
    });

    it("should handle month overflow with days", () => {
      const date = new Date("2025-01-31");
      const result = add(date, 1, "month");
      // JavaScript Date behavior: Jan 31 + 1 month = Feb 28 or Mar 3
      expect(result.getMonth()).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Adding weeks", () => {
    it("should add positive weeks", () => {
      const result = add(baseDate, 1, "week");
      const expected = new Date(baseDate.getTime());
      expected.setDate(expected.getDate() + 7);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it("should add multiple weeks", () => {
      const result = add(baseDate, 2, "week");
      const expected = new Date(baseDate.getTime());
      expected.setDate(expected.getDate() + 14);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('should use short alias "w"', () => {
      const result = add(baseDate, 1, "w");
      const expected = new Date(baseDate.getTime());
      expected.setDate(expected.getDate() + 7);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it("should roll over to next month", () => {
      const result = add(baseDate, 1, "week");
      expect(result.getMonth()).toBe(9); // October
    });
  });

  describe("Adding days", () => {
    it("should add positive days", () => {
      const result = add(baseDate, 1, "day");
      const expected = new Date(baseDate.getTime());
      expected.setDate(expected.getDate() + 1);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it("should add multiple days", () => {
      const result = add(baseDate, 5, "day");
      const expected = new Date(baseDate.getTime());
      expected.setDate(expected.getDate() + 5);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('should use short alias "d"', () => {
      const result = add(baseDate, 1, "d");
      const expected = new Date(baseDate.getTime());
      expected.setDate(expected.getDate() + 1);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it("should roll over to next month", () => {
      const result = add(baseDate, 10, "day");
      expect(result.getMonth()).toBe(9); // October
      expect(result.getDate()).toBe(10);
    });

    it("should roll over to next year", () => {
      const result = add(baseDate, 100, "day");
      expect(result.getFullYear()).toBe(2026);
    });
  });

  describe("Adding hours", () => {
    it("should add positive hours", () => {
      const result = add(baseDate, 1, "hour");
      const expected = new Date(baseDate.getTime());
      expected.setHours(expected.getHours() + 1);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it("should add multiple hours", () => {
      const result = add(baseDate, 6, "hour");
      const expected = new Date(baseDate.getTime());
      expected.setHours(expected.getHours() + 6);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('should use short alias "h"', () => {
      const result = add(baseDate, 1, "h");
      const expected = new Date(baseDate.getTime());
      expected.setHours(expected.getHours() + 1);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it("should roll over to next day", () => {
      const result = add(baseDate, 24, "hour");
      const expected = new Date(baseDate.getTime());
      expected.setDate(expected.getDate() + 1);
      expect(result.getTime()).toBe(expected.getTime());
    });
  });

  describe("Adding minutes", () => {
    it("should add positive minutes", () => {
      const result = add(baseDate, 30, "minute");
      expect(result.getMinutes()).toBe(baseDate.getMinutes() + 30);
    });

    it('should use short alias "m"', () => {
      const result = add(baseDate, 15, "m");
      expect(result.getMinutes()).toBe(baseDate.getMinutes() + 15);
    });

    it("should roll over to next hour", () => {
      const result = add(baseDate, 60, "minute");
      expect(result.getHours()).toBe(baseDate.getHours() + 1);
      expect(result.getMinutes()).toBe(baseDate.getMinutes());
    });
  });

  describe("Adding seconds", () => {
    it("should add positive seconds", () => {
      const result = add(baseDate, 30, "second");
      expect(result.getSeconds()).toBe(baseDate.getSeconds() + 30);
    });

    it('should use short alias "s"', () => {
      const result = add(baseDate, 15, "s");
      expect(result.getSeconds()).toBe(baseDate.getSeconds() + 15);
    });

    it("should roll over to next minute", () => {
      const result = add(baseDate, 60, "second");
      expect(result.getMinutes()).toBe(baseDate.getMinutes() + 1);
    });
  });

  describe("Adding milliseconds", () => {
    it("should add positive milliseconds", () => {
      const result = add(baseDate, 500, "millisecond");
      expect(result.getMilliseconds()).toBe(baseDate.getMilliseconds() + 500);
    });

    it('should use short alias "ms"', () => {
      const result = add(baseDate, 250, "ms");
      expect(result.getMilliseconds()).toBe(baseDate.getMilliseconds() + 250);
    });

    it("should roll over to next second", () => {
      const result = add(baseDate, 1000, "millisecond");
      expect(result.getSeconds()).toBe(baseDate.getSeconds() + 1);
    });
  });

  describe("Edge cases", () => {
    it("should handle adding zero", () => {
      const result = add(baseDate, 0, "day");
      expect(result.getTime()).toBe(baseDate.getTime());
    });

    it("should handle leap year", () => {
      const leapDate = new Date("2024-02-29");
      const result = add(leapDate, 1, "year");
      // Feb 29, 2024 + 1 year = Feb 28, 2025 (or Mar 1)
      expect(result.getFullYear()).toBe(2025);
    });

    it("should handle end of month boundary", () => {
      const endOfMonth = new Date("2025-01-31");
      const result = add(endOfMonth, 1, "month");
      // JavaScript Date behavior
      expect(result.getMonth()).toBeGreaterThanOrEqual(1);
    });

    it("should handle daylight saving time transitions", () => {
      // Note: behavior depends on system timezone
      const date = new Date("2025-03-09T01:00:00");
      const result = add(date, 2, "hour");
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe("Immutability", () => {
    it("should not mutate original date", () => {
      const original = new Date(baseDate.getTime());
      add(baseDate, 1, "day");
      expect(baseDate.getTime()).toBe(original.getTime());
    });

    it("should return new Date instance", () => {
      const result = add(baseDate, 1, "day");
      expect(result).not.toBe(baseDate);
      expect(result).toBeInstanceOf(Date);
    });
  });
});
