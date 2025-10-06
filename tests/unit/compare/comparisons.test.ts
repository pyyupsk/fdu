import { describe, expect, it } from "vitest";
import { diff, isAfter, isBefore, isSame } from "@/compare/comparisons";

describe("isBefore()", () => {
  const date1 = new Date("2025-09-30T12:00:00.000Z");
  const date2 = new Date("2025-10-01T12:00:00.000Z");

  it("should return true when first date is before second", () => {
    expect(isBefore(date1, date2)).toBe(true);
  });

  it("should return false when first date is after second", () => {
    expect(isBefore(date2, date1)).toBe(false);
  });

  it("should return false when dates are equal", () => {
    const date3 = new Date(date1.getTime());
    expect(isBefore(date1, date3)).toBe(false);
  });

  it("should compare with millisecond precision", () => {
    const date3 = new Date("2025-09-30T12:00:00.001Z");
    expect(isBefore(date1, date3)).toBe(true);
  });

  it("should handle dates far apart", () => {
    const past = new Date("2000-01-01");
    const future = new Date("2050-12-31");
    expect(isBefore(past, future)).toBe(true);
    expect(isBefore(future, past)).toBe(false);
  });
});

describe("isAfter()", () => {
  const date1 = new Date("2025-09-30T12:00:00.000Z");
  const date2 = new Date("2025-10-01T12:00:00.000Z");

  it("should return true when first date is after second", () => {
    expect(isAfter(date2, date1)).toBe(true);
  });

  it("should return false when first date is before second", () => {
    expect(isAfter(date1, date2)).toBe(false);
  });

  it("should return false when dates are equal", () => {
    const date3 = new Date(date1.getTime());
    expect(isAfter(date1, date3)).toBe(false);
  });

  it("should compare with millisecond precision", () => {
    const date3 = new Date("2025-09-30T12:00:00.001Z");
    expect(isAfter(date3, date1)).toBe(true);
  });

  it("should handle dates far apart", () => {
    const past = new Date("2000-01-01");
    const future = new Date("2050-12-31");
    expect(isAfter(future, past)).toBe(true);
    expect(isAfter(past, future)).toBe(false);
  });
});

describe("isSame()", () => {
  const date1 = new Date("2025-09-30T12:00:00.000Z");
  const date2 = new Date("2025-09-30T12:00:00.000Z");

  it("should return true for identical timestamps", () => {
    expect(isSame(date1, date2)).toBe(true);
  });

  it("should return false for different timestamps", () => {
    const date3 = new Date("2025-10-01T12:00:00.000Z");
    expect(isSame(date1, date3)).toBe(false);
  });

  it("should compare with millisecond precision by default", () => {
    const date3 = new Date("2025-09-30T12:00:00.001Z");
    expect(isSame(date1, date3)).toBe(false);
  });

  it("should handle same reference", () => {
    expect(isSame(date1, date1)).toBe(true);
  });
});

describe("diff()", () => {
  describe("Milliseconds (default)", () => {
    it("should calculate diff in milliseconds", () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T12:00:01.000Z");
      expect(diff(date2, date1)).toBe(1000);
    });

    it("should handle negative diff", () => {
      const date1 = new Date("2025-09-30T12:00:01.000Z");
      const date2 = new Date("2025-09-30T12:00:00.000Z");
      expect(diff(date2, date1)).toBe(-1000);
    });

    it("should return zero for same dates", () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T12:00:00.000Z");
      expect(diff(date1, date2)).toBe(0);
    });

    it('should use "ms" alias', () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T12:00:01.000Z");
      expect(diff(date2, date1, "ms")).toBe(1000);
    });
  });

  describe("Seconds", () => {
    it("should calculate diff in seconds", () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T12:01:00.000Z");
      expect(diff(date2, date1, "second")).toBe(60);
    });

    it('should use "s" alias', () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T12:00:30.000Z");
      expect(diff(date2, date1, "s")).toBe(30);
    });

    it("should floor fractional seconds", () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T12:00:00.999Z");
      expect(diff(date2, date1, "second")).toBe(0);
    });
  });

  describe("Minutes", () => {
    it("should calculate diff in minutes", () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T13:00:00.000Z");
      expect(diff(date2, date1, "minute")).toBe(60);
    });

    it('should use "m" alias', () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T12:30:00.000Z");
      expect(diff(date2, date1, "m")).toBe(30);
    });

    it("should floor fractional minutes", () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T12:00:59.000Z");
      expect(diff(date2, date1, "minute")).toBe(0);
    });
  });

  describe("Hours", () => {
    it("should calculate diff in hours", () => {
      const date1 = new Date("2025-09-30T00:00:00.000Z");
      const date2 = new Date("2025-09-30T12:00:00.000Z");
      expect(diff(date2, date1, "hour")).toBe(12);
    });

    it('should use "h" alias', () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T18:00:00.000Z");
      expect(diff(date2, date1, "h")).toBe(6);
    });

    it("should floor fractional hours", () => {
      const date1 = new Date("2025-09-30T12:00:00.000Z");
      const date2 = new Date("2025-09-30T12:59:59.000Z");
      expect(diff(date2, date1, "hour")).toBe(0);
    });
  });

  describe("Days", () => {
    it("should calculate diff in days", () => {
      const date1 = new Date("2025-09-30");
      const date2 = new Date("2025-10-05");
      expect(diff(date2, date1, "day")).toBe(5);
    });

    it('should use "d" alias', () => {
      const date1 = new Date("2025-09-01");
      const date2 = new Date("2025-09-30");
      expect(diff(date2, date1, "d")).toBe(29);
    });

    it("should floor fractional days", () => {
      const date1 = new Date("2025-09-30T00:00:00");
      const date2 = new Date("2025-09-30T23:59:59");
      expect(diff(date2, date1, "day")).toBe(0);
    });
  });

  describe("Weeks", () => {
    it("should calculate diff in weeks", () => {
      const date1 = new Date("2025-09-01");
      const date2 = new Date("2025-09-15");
      expect(diff(date2, date1, "week")).toBe(2);
    });

    it('should use "w" alias', () => {
      const date1 = new Date("2025-09-01");
      const date2 = new Date("2025-09-22");
      expect(diff(date2, date1, "w")).toBe(3);
    });

    it("should floor fractional weeks", () => {
      const date1 = new Date("2025-09-01");
      const date2 = new Date("2025-09-07");
      expect(diff(date2, date1, "week")).toBe(0);
    });
  });

  describe("Months", () => {
    it("should calculate diff in months", () => {
      const date1 = new Date("2025-01-01");
      const date2 = new Date("2025-06-01");
      expect(diff(date2, date1, "month")).toBe(5);
    });

    it('should use "M" alias', () => {
      const date1 = new Date("2025-01-15");
      const date2 = new Date("2025-03-15");
      expect(diff(date2, date1, "M")).toBe(2);
    });

    it("should handle year boundary", () => {
      const date1 = new Date("2024-11-01");
      const date2 = new Date("2025-02-01");
      expect(diff(date2, date1, "month")).toBe(3);
    });

    it("should calculate calendar months", () => {
      const date1 = new Date("2025-01-31");
      const date2 = new Date("2025-02-01");
      expect(diff(date2, date1, "month")).toBe(1);
    });
  });

  describe("Years", () => {
    it("should calculate diff in years", () => {
      const date1 = new Date("2020-01-01");
      const date2 = new Date("2025-01-01");
      expect(diff(date2, date1, "year")).toBe(5);
    });

    it('should use "y" alias', () => {
      const date1 = new Date("2023-06-15");
      const date2 = new Date("2025-06-15");
      expect(diff(date2, date1, "y")).toBe(2);
    });

    it("should calculate calendar years", () => {
      const date1 = new Date("2024-12-31");
      const date2 = new Date("2025-01-01");
      expect(diff(date2, date1, "year")).toBe(1);
    });
  });

  describe("Edge cases", () => {
    it("should handle leap year correctly", () => {
      const date1 = new Date("2024-02-29");
      const date2 = new Date("2024-03-01");
      expect(diff(date2, date1, "day")).toBe(1);
    });

    it("should handle large time spans", () => {
      const date1 = new Date("2000-01-01");
      const date2 = new Date("2050-01-01");
      expect(diff(date2, date1, "year")).toBe(50);
    });

    it("should handle negative diffs", () => {
      const date1 = new Date("2025-12-31");
      const date2 = new Date("2025-01-01");
      expect(diff(date2, date1, "day")).toBeLessThan(0);
    });

    it("should handle daylight saving time transitions", () => {
      // Note: behavior depends on system timezone
      const date1 = new Date("2025-03-09T00:00:00");
      const date2 = new Date("2025-03-10T00:00:00");
      const hoursDiff = diff(date2, date1, "hour");
      expect(Math.abs(hoursDiff)).toBeGreaterThanOrEqual(23);
      expect(Math.abs(hoursDiff)).toBeLessThanOrEqual(25);
    });
  });
});
