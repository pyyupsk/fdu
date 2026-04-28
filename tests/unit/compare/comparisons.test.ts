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
  it.each([
    // Milliseconds (default + alias)
    {
      group: "ms",
      name: "default unit returns ms",
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T12:00:01.000Z",
      expected: 1000,
    },
    {
      group: "ms",
      name: "negative diff",
      from: "2025-09-30T12:00:01.000Z",
      to: "2025-09-30T12:00:00.000Z",
      expected: -1000,
    },
    {
      group: "ms",
      name: "zero for same dates",
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T12:00:00.000Z",
      expected: 0,
    },
    {
      group: "ms",
      name: '"ms" alias',
      unit: "ms" as const,
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T12:00:01.000Z",
      expected: 1000,
    },

    // Seconds
    {
      group: "second",
      name: "60 seconds",
      unit: "second" as const,
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T12:01:00.000Z",
      expected: 60,
    },
    {
      group: "second",
      name: '"s" alias',
      unit: "s" as const,
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T12:00:30.000Z",
      expected: 30,
    },
    {
      group: "second",
      name: "floor fractional",
      unit: "second" as const,
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T12:00:00.999Z",
      expected: 0,
    },

    // Minutes
    {
      group: "minute",
      name: "60 minutes",
      unit: "minute" as const,
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T13:00:00.000Z",
      expected: 60,
    },
    {
      group: "minute",
      name: '"m" alias',
      unit: "m" as const,
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T12:30:00.000Z",
      expected: 30,
    },
    {
      group: "minute",
      name: "floor fractional",
      unit: "minute" as const,
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T12:00:59.000Z",
      expected: 0,
    },

    // Hours
    {
      group: "hour",
      name: "12 hours",
      unit: "hour" as const,
      from: "2025-09-30T00:00:00.000Z",
      to: "2025-09-30T12:00:00.000Z",
      expected: 12,
    },
    {
      group: "hour",
      name: '"h" alias',
      unit: "h" as const,
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T18:00:00.000Z",
      expected: 6,
    },
    {
      group: "hour",
      name: "floor fractional",
      unit: "hour" as const,
      from: "2025-09-30T12:00:00.000Z",
      to: "2025-09-30T12:59:59.000Z",
      expected: 0,
    },

    // Days
    {
      group: "day",
      name: "5 days",
      unit: "day" as const,
      from: "2025-09-30",
      to: "2025-10-05",
      expected: 5,
    },
    {
      group: "day",
      name: '"d" alias',
      unit: "d" as const,
      from: "2025-09-01",
      to: "2025-09-30",
      expected: 29,
    },
    {
      group: "day",
      name: "floor fractional",
      unit: "day" as const,
      from: "2025-09-30T00:00:00",
      to: "2025-09-30T23:59:59",
      expected: 0,
    },

    // Weeks
    {
      group: "week",
      name: "2 weeks",
      unit: "week" as const,
      from: "2025-09-01",
      to: "2025-09-15",
      expected: 2,
    },
    {
      group: "week",
      name: '"w" alias',
      unit: "w" as const,
      from: "2025-09-01",
      to: "2025-09-22",
      expected: 3,
    },
    {
      group: "week",
      name: "floor fractional",
      unit: "week" as const,
      from: "2025-09-01",
      to: "2025-09-07",
      expected: 0,
    },

    // Months
    {
      group: "month",
      name: "5 months",
      unit: "month" as const,
      from: "2025-01-01",
      to: "2025-06-01",
      expected: 5,
    },
    {
      group: "month",
      name: '"M" alias',
      unit: "M" as const,
      from: "2025-01-15",
      to: "2025-03-15",
      expected: 2,
    },
    {
      group: "month",
      name: "year boundary",
      unit: "month" as const,
      from: "2024-11-01",
      to: "2025-02-01",
      expected: 3,
    },
    {
      group: "month",
      name: "calendar months",
      unit: "month" as const,
      from: "2025-01-31",
      to: "2025-02-01",
      expected: 1,
    },

    // Years
    {
      group: "year",
      name: "5 years",
      unit: "year" as const,
      from: "2020-01-01",
      to: "2025-01-01",
      expected: 5,
    },
    {
      group: "year",
      name: '"y" alias',
      unit: "y" as const,
      from: "2023-06-15",
      to: "2025-06-15",
      expected: 2,
    },
    {
      group: "year",
      name: "calendar years",
      unit: "year" as const,
      from: "2024-12-31",
      to: "2025-01-01",
      expected: 1,
    },

    // Edge cases
    {
      group: "edge",
      name: "leap year",
      unit: "day" as const,
      from: "2024-02-29",
      to: "2024-03-01",
      expected: 1,
    },
    {
      group: "edge",
      name: "large time span",
      unit: "year" as const,
      from: "2000-01-01",
      to: "2050-01-01",
      expected: 50,
    },
  ])("$group: $name", ({ unit, from, to, expected }) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    expect(unit ? diff(toDate, fromDate, unit) : diff(toDate, fromDate)).toBe(
      expected,
    );
  });

  it("should produce a negative result when args are flipped", () => {
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
