import { describe, expect, it } from "vitest";
import { fdu } from "../../../src/core/datetime";

describe("toObject() method", () => {
  it("should convert date to object with all components", () => {
    const date = fdu("2025-10-05T14:30:15.500");
    const obj = date.toObject();

    expect(obj).toEqual({
      years: 2025,
      months: 9, // October (0-indexed)
      date: 5,
      hours: 14,
      minutes: 30,
      seconds: 15,
      milliseconds: 500,
    });
  });

  it("should handle dates with zero values", () => {
    const date = fdu("2025-01-01T00:00:00.000");
    const obj = date.toObject();

    expect(obj).toEqual({
      years: 2025,
      months: 0, // January
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  });

  it("should handle dates with maximum values", () => {
    const date = fdu("2025-12-31T23:59:59.999");
    const obj = date.toObject();

    expect(obj).toEqual({
      years: 2025,
      months: 11, // December (0-indexed)
      date: 31,
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    });
  });

  it("should work with manipulated dates", () => {
    const date = fdu("2025-06-15T12:00:00.000")
      .add(1, "month")
      .add(10, "day")
      .add(5, "hour");
    const obj = date.toObject();

    expect(obj.years).toBe(2025);
    expect(obj.months).toBe(6); // July (0-indexed)
    expect(obj.date).toBe(25);
    expect(obj.hours).toBe(17);
  });

  it("should handle leap year dates", () => {
    const date = fdu("2024-02-29T12:00:00.000");
    const obj = date.toObject();

    expect(obj.years).toBe(2024);
    expect(obj.months).toBe(1); // February (0-indexed)
    expect(obj.date).toBe(29);
  });

  it("should preserve local time zone information", () => {
    // Create a date from object input (local time)
    const date = fdu({ year: 2025, month: 9, day: 5, hour: 14, minute: 30 });
    const obj = date.toObject();

    expect(obj.years).toBe(2025);
    expect(obj.months).toBe(9); // October (0-indexed)
    expect(obj.date).toBe(5);
    expect(obj.hours).toBe(14);
    expect(obj.minutes).toBe(30);
  });

  it("should work with current date", () => {
    const now = new Date();
    const date = fdu();
    const obj = date.toObject();

    expect(obj.years).toBe(now.getFullYear());
    expect(obj.months).toBe(now.getMonth());
    expect(obj.date).toBe(now.getDate());
    // Note: Not checking hours/minutes/seconds due to potential timing differences
  });

  it("should have all required properties", () => {
    const date = fdu("2025-10-05T14:30:15.500");
    const obj = date.toObject();

    expect(obj).toHaveProperty("years");
    expect(obj).toHaveProperty("months");
    expect(obj).toHaveProperty("date");
    expect(obj).toHaveProperty("hours");
    expect(obj).toHaveProperty("minutes");
    expect(obj).toHaveProperty("seconds");
    expect(obj).toHaveProperty("milliseconds");
  });

  it("should return numbers for all properties", () => {
    const date = fdu("2025-10-05T14:30:15.500");
    const obj = date.toObject();

    expect(typeof obj.years).toBe("number");
    expect(typeof obj.months).toBe("number");
    expect(typeof obj.date).toBe("number");
    expect(typeof obj.hours).toBe("number");
    expect(typeof obj.minutes).toBe("number");
    expect(typeof obj.seconds).toBe("number");
    expect(typeof obj.milliseconds).toBe("number");
  });
});
