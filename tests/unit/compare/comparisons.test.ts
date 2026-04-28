import { describe, expect, it } from "vitest";
import { diff, isAfter, isBefore, isSame } from "@/compare/comparisons";

describe("isBefore()", () => {
  const earlier = new Date("2025-09-30T12:00:00.000Z");
  const later = new Date("2025-10-01T12:00:00.000Z");

  it("should return true when first date is before second", () => {
    expect(isBefore(earlier, later)).toBe(true);
  });

  it("should return false when first date is after second", () => {
    expect(isBefore(later, earlier)).toBe(false);
  });

  it("should return false when dates are equal", () => {
    const same = new Date(earlier);
    expect(isBefore(earlier, same)).toBe(false);
  });

  it("should compare with millisecond precision", () => {
    const oneMsLater = new Date("2025-09-30T12:00:00.001Z");
    expect(isBefore(earlier, oneMsLater)).toBe(true);
  });

  it("should handle dates far apart", () => {
    const past = new Date("2000-01-01");
    const future = new Date("2050-12-31");
    expect(isBefore(past, future)).toBe(true);
    expect(isBefore(future, past)).toBe(false);
  });
});

describe("isAfter()", () => {
  const earlier = new Date("2025-09-30T12:00:00.000Z");
  const later = new Date("2025-10-01T12:00:00.000Z");

  it("should return true when first date is after second", () => {
    expect(isAfter(later, earlier)).toBe(true);
  });

  it("should return false when first date is before second", () => {
    expect(isAfter(earlier, later)).toBe(false);
  });

  it("should return false when dates are equal", () => {
    const same = new Date(earlier);
    expect(isAfter(earlier, same)).toBe(false);
  });

  it("should compare with millisecond precision", () => {
    const oneMsLater = new Date("2025-09-30T12:00:00.001Z");
    expect(isAfter(oneMsLater, earlier)).toBe(true);
  });

  it("should handle dates far apart", () => {
    const past = new Date("2000-01-01");
    const future = new Date("2050-12-31");
    expect(isAfter(future, past)).toBe(true);
    expect(isAfter(past, future)).toBe(false);
  });
});

describe("isSame()", () => {
  const a = new Date("2025-09-30T12:00:00.000Z");
  const b = new Date("2025-09-30T12:00:00.000Z");

  it("should return true for identical timestamps", () => {
    expect(isSame(a, b)).toBe(true);
  });

  it("should return false for different timestamps", () => {
    const other = new Date("2025-10-01T12:00:00.000Z");
    expect(isSame(a, other)).toBe(false);
  });

  it("should compare with millisecond precision by default", () => {
    const oneMsLater = new Date("2025-09-30T12:00:00.001Z");
    expect(isSame(a, oneMsLater)).toBe(false);
  });

  it("should handle same reference", () => {
    expect(isSame(a, a)).toBe(true);
  });
});

describe("diff()", () => {
  describe("Milliseconds (default)", () => {
    it("should calculate diff in milliseconds", () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T12:00:01.000Z");
      expect(diff(later, earlier)).toBe(1000);
    });

    it("should handle negative diff", () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T12:00:01.000Z");
      expect(diff(earlier, later)).toBe(-1000);
    });

    it("should return zero for same dates", () => {
      const a = new Date("2025-09-30T12:00:00.000Z");
      const b = new Date("2025-09-30T12:00:00.000Z");
      expect(diff(a, b)).toBe(0);
    });

    it('should use "ms" alias', () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T12:00:01.000Z");
      expect(diff(later, earlier, "ms")).toBe(1000);
    });
  });

  describe("Seconds", () => {
    it("should calculate diff in seconds", () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T12:01:00.000Z");
      expect(diff(later, earlier, "second")).toBe(60);
    });

    it('should use "s" alias', () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T12:00:30.000Z");
      expect(diff(later, earlier, "s")).toBe(30);
    });

    it("should floor fractional seconds", () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T12:00:00.999Z");
      expect(diff(later, earlier, "second")).toBe(0);
    });
  });

  describe("Minutes", () => {
    it("should calculate diff in minutes", () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T13:00:00.000Z");
      expect(diff(later, earlier, "minute")).toBe(60);
    });

    it('should use "m" alias', () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T12:30:00.000Z");
      expect(diff(later, earlier, "m")).toBe(30);
    });

    it("should floor fractional minutes", () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T12:00:59.000Z");
      expect(diff(later, earlier, "minute")).toBe(0);
    });
  });

  describe("Hours", () => {
    it("should calculate diff in hours", () => {
      const earlier = new Date("2025-09-30T00:00:00.000Z");
      const later = new Date("2025-09-30T12:00:00.000Z");
      expect(diff(later, earlier, "hour")).toBe(12);
    });

    it('should use "h" alias', () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T18:00:00.000Z");
      expect(diff(later, earlier, "h")).toBe(6);
    });

    it("should floor fractional hours", () => {
      const earlier = new Date("2025-09-30T12:00:00.000Z");
      const later = new Date("2025-09-30T12:59:59.000Z");
      expect(diff(later, earlier, "hour")).toBe(0);
    });
  });

  describe("Days", () => {
    it("should calculate diff in days", () => {
      const earlier = new Date("2025-09-30");
      const later = new Date("2025-10-05");
      expect(diff(later, earlier, "day")).toBe(5);
    });

    it('should use "d" alias', () => {
      const earlier = new Date("2025-09-01");
      const later = new Date("2025-09-30");
      expect(diff(later, earlier, "d")).toBe(29);
    });

    it("should floor fractional days", () => {
      const earlier = new Date("2025-09-30T00:00:00");
      const later = new Date("2025-09-30T23:59:59");
      expect(diff(later, earlier, "day")).toBe(0);
    });
  });

  describe("Weeks", () => {
    it("should calculate diff in weeks", () => {
      const earlier = new Date("2025-09-01");
      const later = new Date("2025-09-15");
      expect(diff(later, earlier, "week")).toBe(2);
    });

    it('should use "w" alias', () => {
      const earlier = new Date("2025-09-01");
      const later = new Date("2025-09-22");
      expect(diff(later, earlier, "w")).toBe(3);
    });

    it("should floor fractional weeks", () => {
      const earlier = new Date("2025-09-01");
      const later = new Date("2025-09-07");
      expect(diff(later, earlier, "week")).toBe(0);
    });
  });

  describe("Months", () => {
    it("should calculate diff in months", () => {
      const earlier = new Date("2025-01-01");
      const later = new Date("2025-06-01");
      expect(diff(later, earlier, "month")).toBe(5);
    });

    it('should use "M" alias', () => {
      const earlier = new Date("2025-01-15");
      const later = new Date("2025-03-15");
      expect(diff(later, earlier, "M")).toBe(2);
    });

    it("should handle year boundary", () => {
      const earlier = new Date("2024-11-01");
      const later = new Date("2025-02-01");
      expect(diff(later, earlier, "month")).toBe(3);
    });

    it("should calculate calendar months", () => {
      const earlier = new Date("2025-01-31");
      const later = new Date("2025-02-01");
      expect(diff(later, earlier, "month")).toBe(1);
    });
  });

  describe("Years", () => {
    it("should calculate diff in years", () => {
      const earlier = new Date("2020-01-01");
      const later = new Date("2025-01-01");
      expect(diff(later, earlier, "year")).toBe(5);
    });

    it('should use "y" alias', () => {
      const earlier = new Date("2023-06-15");
      const later = new Date("2025-06-15");
      expect(diff(later, earlier, "y")).toBe(2);
    });

    it("should calculate calendar years", () => {
      const earlier = new Date("2024-12-31");
      const later = new Date("2025-01-01");
      expect(diff(later, earlier, "year")).toBe(1);
    });
  });

  describe("Edge cases", () => {
    it("should handle leap year correctly", () => {
      const earlier = new Date("2024-02-29");
      const later = new Date("2024-03-01");
      expect(diff(later, earlier, "day")).toBe(1);
    });

    it("should handle large time spans", () => {
      const earlier = new Date("2000-01-01");
      const later = new Date("2050-01-01");
      expect(diff(later, earlier, "year")).toBe(50);
    });

    it("should handle negative diffs", () => {
      const earlier = new Date("2025-01-01");
      const later = new Date("2025-12-31");
      expect(diff(earlier, later, "day")).toBeLessThan(0);
    });

    it("should handle daylight saving time transitions", () => {
      // Note: behavior depends on system timezone
      const earlier = new Date("2025-03-09T00:00:00");
      const later = new Date("2025-03-10T00:00:00");
      const hoursDiff = diff(later, earlier, "hour");
      expect(Math.abs(hoursDiff)).toBeGreaterThanOrEqual(23);
      expect(Math.abs(hoursDiff)).toBeLessThanOrEqual(25);
    });
  });
});
