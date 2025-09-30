import { describe, expect, it } from "vitest";
import { fd } from "../../../src/core/datetime";

describe("fd() factory function", () => {
  it("should create DateTime from undefined (current date)", () => {
    const date = fd();
    expect(date).not.toBeNull();
    expect(date?.isValid()).toBe(true);
  });

  it("should create DateTime from Date object", () => {
    const input = new Date("2025-09-30");
    const date = fd(input);
    expect(date?.format("YYYY-MM-DD")).toBe("2025-09-30");
  });

  it("should create DateTime from ISO string", () => {
    const date = fd("2025-09-30T12:00:00.000Z");
    expect(date?.isValid()).toBe(true);
  });

  it("should create DateTime from timestamp number", () => {
    const timestamp = Date.parse("2025-09-30");
    const date = fd(timestamp);
    expect(date?.format("YYYY-MM-DD")).toBe("2025-09-30");
  });

  it("should return null for invalid date strings", () => {
    const date = fd("invalid-date");
    expect(date).toBeNull();
  });

  it("should return null for NaN input", () => {
    const date = fd(NaN);
    expect(date).toBeNull();
  });

  it("should handle DateTime input (copy)", () => {
    const date1 = fd("2025-09-30");
    // biome-ignore lint/style/noNonNullAssertion: test assertion
    const date2 = fd(date1!);
    expect(date2?.format("YYYY-MM-DD")).toBe("2025-09-30");
  });
});

describe("DateTime query methods", () => {
  const date = fd("2025-09-30T14:35:45.123Z");

  it("should get year", () => {
    expect(date?.year()).toBe(2025);
  });

  it("should get month (0-indexed)", () => {
    expect(date?.month()).toBeGreaterThanOrEqual(0);
    expect(date?.month()).toBeLessThan(12);
  });

  it("should get date", () => {
    expect(date?.date()).toBeGreaterThan(0);
    expect(date?.date()).toBeLessThanOrEqual(31);
  });

  it("should get hour", () => {
    expect(date?.hour()).toBeGreaterThanOrEqual(0);
    expect(date?.hour()).toBeLessThan(24);
  });

  it("should get minute", () => {
    expect(date?.minute()).toBeGreaterThanOrEqual(0);
    expect(date?.minute()).toBeLessThan(60);
  });

  it("should get second", () => {
    expect(date?.second()).toBeGreaterThanOrEqual(0);
    expect(date?.second()).toBeLessThan(60);
  });

  it("should get millisecond", () => {
    expect(date?.millisecond()).toBeGreaterThanOrEqual(0);
    expect(date?.millisecond()).toBeLessThan(1000);
  });

  it("should get day (0=Sunday)", () => {
    expect(date?.day()).toBeGreaterThanOrEqual(0);
    expect(date?.day()).toBeLessThan(7);
  });
});

describe("DateTime utility methods", () => {
  const date = fd("2025-09-30T12:00:00.000Z");

  it("should convert to Date object", () => {
    const jsDate = date?.toDate();
    expect(jsDate).toBeInstanceOf(Date);
  });

  it("should convert to ISO string", () => {
    const iso = date?.toISOString();
    expect(iso).toBe("2025-09-30T12:00:00.000Z");
  });

  it("should convert to timestamp (valueOf)", () => {
    const timestamp = date?.valueOf();
    expect(typeof timestamp).toBe("number");
    expect(timestamp).toBe(Date.parse("2025-09-30T12:00:00.000Z"));
  });

  it("should report valid status", () => {
    expect(date?.isValid()).toBe(true);
  });
});

describe("DateTime locale methods", () => {
  const date = fd("2025-09-30");

  it('should get current locale (default "en")', () => {
    expect(date?.locale()).toBe("en");
  });

  it("should set locale (immutable)", () => {
    const frDate = date?.locale("fr");
    expect(frDate?.locale()).toBe("fr");
    expect(date?.locale()).toBe("en"); // Original unchanged
  });
});

describe("DateTime format method", () => {
  const date = fd("2025-09-30T14:35:45.123Z");

  it("should format with YYYY-MM-DD", () => {
    expect(date?.format("YYYY-MM-DD")).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it("should format with various tokens", () => {
    const formatted = date?.format("YYYY/MM/DD HH:mm:ss");
    expect(formatted).toMatch(/\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/);
  });
});

describe("DateTime manipulation methods", () => {
  const date = fd("2025-09-30");

  describe("add", () => {
    it("should add years", () => {
      const result = date?.add(1, "year");
      expect(result?.year()).toBe(2026);
    });

    it("should add months", () => {
      const result = date?.add(3, "month");
      expect(result?.month()).toBe(((date?.month() || 0) + 3) % 12);
    });

    it("should add days", () => {
      const result = date?.add(5, "day");
      expect(result?.format("YYYY-MM-DD")).toBe("2025-10-05");
    });

    it("should be immutable", () => {
      const original = date?.format("YYYY-MM-DD");
      date?.add(1, "day");
      expect(date?.format("YYYY-MM-DD")).toBe(original);
    });
  });

  describe("subtract", () => {
    it("should subtract years", () => {
      const result = date?.subtract(1, "year");
      expect(result?.year()).toBe(2024);
    });

    it("should subtract months", () => {
      const result = date?.subtract(3, "month");
      expect(result?.month()).toBe(((date?.month() || 0) - 3 + 12) % 12);
    });

    it("should subtract days", () => {
      const result = date?.subtract(7, "day");
      expect(result?.format("YYYY-MM-DD")).toBe("2025-09-23");
    });

    it("should be immutable", () => {
      const original = date?.format("YYYY-MM-DD");
      date?.subtract(1, "day");
      expect(date?.format("YYYY-MM-DD")).toBe(original);
    });
  });
});

describe("DateTime comparison methods", () => {
  const date1 = fd("2025-09-30");
  const date2 = fd("2025-10-01");
  const date3 = fd("2025-09-30");

  describe("isBefore", () => {
    it("should return true when before", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(date1?.isBefore(date2!)).toBe(true);
    });

    it("should return false when after", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(date2?.isBefore(date1!)).toBe(false);
    });

    it("should return false when same", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(date1?.isBefore(date3!)).toBe(false);
    });
  });

  describe("isAfter", () => {
    it("should return true when after", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(date2?.isAfter(date1!)).toBe(true);
    });

    it("should return false when before", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(date1?.isAfter(date2!)).toBe(false);
    });

    it("should return false when same", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(date1?.isAfter(date3!)).toBe(false);
    });
  });

  describe("isSame", () => {
    it("should return true for exact same timestamp", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(date1?.isSame(date3!)).toBe(true);
    });

    it("should return false for different timestamps", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(date1?.isSame(date2!)).toBe(false);
    });

    it("should compare by year unit", () => {
      const d1 = fd("2025-01-01");
      const d2 = fd("2025-12-31");
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(d1?.isSame(d2!, "year")).toBe(true);
    });

    it("should compare by month unit", () => {
      const d1 = fd("2025-09-01");
      const d2 = fd("2025-09-30");
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(d1?.isSame(d2!, "month")).toBe(true);
    });

    it("should compare by day unit", () => {
      const d1 = fd("2025-09-30T00:00:00");
      const d2 = fd("2025-09-30T23:59:59");
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      expect(d1?.isSame(d2!, "day")).toBe(true);
    });
  });

  describe("diff", () => {
    it("should calculate diff in milliseconds (default)", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      const diff = date2?.diff(date1!);
      expect(diff).toBe(24 * 60 * 60 * 1000); // 1 day
    });

    it("should calculate diff in days", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      const diff = date2?.diff(date1!, "day");
      expect(diff).toBe(1);
    });

    it("should calculate diff in years", () => {
      const d1 = fd("2024-09-30");
      const d2 = fd("2025-09-30");
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      const diff = d2?.diff(d1!, "year");
      expect(diff).toBe(1);
    });

    it("should calculate diff in months", () => {
      const d1 = fd("2025-06-30");
      const d2 = fd("2025-09-30");
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      const diff = d2?.diff(d1!, "month");
      expect(diff).toBe(3);
    });

    it("should handle negative diff", () => {
      // biome-ignore lint/style/noNonNullAssertion: test assertion
      const diff = date1?.diff(date2!);
      expect(diff).toBe(-24 * 60 * 60 * 1000); // -1 day
    });
  });
});

describe("DateTime edge cases", () => {
  it("should handle leap year", () => {
    const date = fd("2024-02-29");
    expect(date?.isValid()).toBe(true);
    expect(date?.format("YYYY-MM-DD")).toBe("2024-02-29");
  });

  it("should handle month overflow when adding", () => {
    const date = fd("2025-01-31");
    const result = date?.add(1, "month");
    // JavaScript Date behavior: Jan 31 + 1 month = Feb 28/29 or Mar 3
    expect(result?.isValid()).toBe(true);
  });

  it("should handle year boundary", () => {
    const date = fd("2025-12-31T23:59:59.999Z");
    const result = date?.add(1, "millisecond");
    expect(result?.year()).toBe(2026);
  });

  it("should handle DST transitions", () => {
    // Note: behavior depends on system timezone
    const date = fd("2025-03-09T02:00:00");
    expect(date?.isValid()).toBe(true);
  });

  it("should handle isSame with week unit (fallback to timestamp)", () => {
    const date1 = fd("2025-09-29T12:00:00.000Z");
    const date2 = fd("2025-09-29T12:00:00.000Z");
    // Week unit should fall through to default case (timestamp comparison)
    // biome-ignore lint/style/noNonNullAssertion: test assertion
    // biome-ignore lint/suspicious/noExplicitAny: test edge case
    expect(date1?.isSame(date2!, "week" as any)).toBe(true);
  });

  it("should handle isSame with millisecond unit explicitly", () => {
    const date1 = fd("2025-09-30T12:00:00.000Z");
    const date2 = fd("2025-09-30T12:00:00.001Z");
    // Millisecond comparison hits default case
    // biome-ignore lint/style/noNonNullAssertion: test assertion
    expect(date1?.isSame(date2!, "millisecond")).toBe(false);
  });

  it("should handle diff with unknown unit", () => {
    const date1 = fd("2025-09-30");
    const date2 = fd("2025-10-01");
    // Unknown unit should fall back to milliseconds
    // biome-ignore lint/style/noNonNullAssertion: test assertion
    // biome-ignore lint/suspicious/noExplicitAny: test edge case
    const result = date1?.diff(date2!, "unknown" as any);
    expect(typeof result).toBe("number");
  });

  it("should handle diff with millisecond unit explicitly", () => {
    const date1 = fd("2025-09-30T12:00:00.000Z");
    const date2 = fd("2025-09-30T12:00:00.500Z");
    // Explicit millisecond hits default case
    // biome-ignore lint/style/noNonNullAssertion: test assertion
    const result = date1?.diff(date2!, "millisecond");
    expect(result).toBe(-500);
  });
});
