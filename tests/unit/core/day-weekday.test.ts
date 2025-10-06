import { beforeAll, describe, expect, it } from "vitest";
import { fdu } from "../../../src/core/datetime";
import { registerLocale } from "../../../src/locale/locale";
import { en } from "../../../src/locale/locales/en";

beforeAll(() => {
  registerLocale("en", en);
});

describe("day() method", () => {
  describe("getter", () => {
    it("should get day of week (0=Sunday)", () => {
      const date = fdu("2025-10-05"); // This is a Sunday
      expect(date.day()).toBe(0);
    });

    it("should get day of week for Monday", () => {
      const date = fdu("2025-10-06"); // Monday
      expect(date.day()).toBe(1);
    });

    it("should get day of week for Saturday", () => {
      const date = fdu("2025-10-11"); // Saturday
      expect(date.day()).toBe(6);
    });
  });

  describe("setter", () => {
    it("should set day of week to Sunday (0)", () => {
      const date = fdu("2025-10-06"); // Monday
      const result = date.day(0); // Set to Sunday
      expect(result.day()).toBe(0);
      expect(result.format("YYYY-MM-DD")).toBe("2025-10-05");
    });

    it("should set day of week to Saturday (6)", () => {
      const date = fdu("2025-10-05"); // Sunday
      const result = date.day(6); // Set to Saturday
      expect(result.day()).toBe(6);
      expect(result.format("YYYY-MM-DD")).toBe("2025-10-11");
    });

    it("should be immutable", () => {
      const date = fdu("2025-10-06"); // Monday
      const original = date.format("YYYY-MM-DD");
      date.day(5); // Set to Friday
      expect(date.format("YYYY-MM-DD")).toBe(original);
    });

    it("should handle week boundaries", () => {
      const date = fdu("2025-10-05"); // Sunday
      const result = date.day(1); // Set to Monday
      expect(result.day()).toBe(1);
      expect(result.format("YYYY-MM-DD")).toBe("2025-10-06");
    });

    it("should preserve time when setting day", () => {
      const date = fdu("2025-10-06T14:30:45.123Z"); // Monday
      const result = date.day(3); // Set to Wednesday
      expect(result.day()).toBe(3);
      expect(result.hour()).toBe(date.hour());
      expect(result.minute()).toBe(date.minute());
      expect(result.second()).toBe(date.second());
    });
  });
});

describe("weekday() method", () => {
  describe("getter", () => {
    it("should get locale-aware day for English (weekStart=0, Sunday)", () => {
      const date = fdu("2025-10-05").locale("en"); // Sunday
      expect(date.weekday()).toBe(0); // Sunday is first day in English
    });

    it("should get locale-aware day for Monday in English", () => {
      const date = fdu("2025-10-06").locale("en"); // Monday
      expect(date.weekday()).toBe(1);
    });

    it("should get locale-aware day for Saturday in English", () => {
      const date = fdu("2025-10-11").locale("en"); // Saturday
      expect(date.weekday()).toBe(6);
    });

    it("should handle locale with different weekStart", () => {
      // Register a custom locale with Monday as first day
      registerLocale("test", {
        ...en,
        name: "test",
        weekStart: 1, // Monday
      });

      const sunday = fdu("2025-10-05").locale("test"); // Sunday
      const monday = fdu("2025-10-06").locale("test"); // Monday

      expect(monday.weekday()).toBe(0); // Monday is first day
      expect(sunday.weekday()).toBe(6); // Sunday is last day
    });

    it("should default to Sunday (0) when locale has no weekStart", () => {
      // Register a custom locale without weekStart (tests line 133: weekStart ?? 0)
      registerLocale("test-no-weekstart", {
        months: en.months,
        weekdays: en.weekdays,
        name: "test-no-weekstart",
        // No weekStart property
      });

      const sunday = fdu("2025-10-05").locale("test-no-weekstart"); // Sunday
      const monday = fdu("2025-10-06").locale("test-no-weekstart"); // Monday

      expect(sunday.weekday()).toBe(0); // Sunday is first day (default)
      expect(monday.weekday()).toBe(1);
    });
  });

  describe("setter", () => {
    it("should set locale-aware day in English", () => {
      const date = fdu("2025-10-06").locale("en"); // Monday
      const result = date.weekday(0); // Set to first day (Sunday)
      expect(result.weekday()).toBe(0);
      expect(result.day()).toBe(0); // Sunday
    });

    it("should set to last day of week", () => {
      const date = fdu("2025-10-05").locale("en"); // Sunday
      const result = date.weekday(6); // Set to last day (Saturday)
      expect(result.weekday()).toBe(6);
      expect(result.day()).toBe(6); // Saturday
    });

    it("should be immutable", () => {
      const date = fdu("2025-10-06").locale("en");
      const original = date.format("YYYY-MM-DD");
      date.weekday(5);
      expect(date.format("YYYY-MM-DD")).toBe(original);
    });

    it("should work with locale that has Monday as first day", () => {
      registerLocale("test-monday", {
        ...en,
        name: "test-monday",
        weekStart: 1, // Monday
      });

      const date = fdu("2025-10-05").locale("test-monday"); // Sunday
      const result = date.weekday(0); // Set to first day (Monday in this locale)
      expect(result.weekday()).toBe(0);
      expect(result.day()).toBe(1); // Monday
    });

    it("should preserve time when setting weekday", () => {
      const date = fdu("2025-10-06T14:30:45.123Z").locale("en");
      const result = date.weekday(3);
      expect(result.hour()).toBe(date.hour());
      expect(result.minute()).toBe(date.minute());
      expect(result.second()).toBe(date.second());
    });
  });
});
