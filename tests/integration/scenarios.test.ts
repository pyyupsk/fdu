import { describe, expect, it } from "vitest";
import { fdu } from "../../src";
import { registerLocale } from "../../src/locale/locale";
import { en } from "../../src/locale/locales/en";
import { th } from "../../src/locale/locales/th";

describe("Integration: User Scenarios", () => {
  describe("Scenario 1: Basic date creation and formatting", () => {
    it("should create and format dates in multiple ways", () => {
      // From ISO string
      const date1 = fdu("2025-09-30");
      expect(date1).not.toBeNull();
      expect(date1.format("YYYY-MM-DD")).toBe("2025-09-30");

      // From Date object
      const date2 = fdu(new Date("2025-09-30"));
      expect(date2.format("YYYY-MM-DD")).toBe("2025-09-30");

      // From timestamp
      const timestamp = Date.parse("2025-09-30");
      const date3 = fdu(timestamp);
      expect(date3.format("YYYY-MM-DD")).toBe("2025-09-30");

      // Current date
      const now = fdu();
      expect(now).not.toBeNull();
      expect(now.isValid()).toBe(true);
    });
  });

  describe("Scenario 2: Date manipulation chains", () => {
    it("should chain multiple add/subtract operations", () => {
      const date = fdu("2025-09-30");

      // Add 1 month, then add 3 days
      const result1 = date.add(1, "month").add(3, "day");
      expect(result1.format("YYYY-MM-DD")).toBe("2025-11-02");

      // Subtract 1 year, add 6 months
      const result2 = date.subtract(1, "year").add(6, "month");
      expect(result2.format("YYYY-MM-DD")).toBe("2025-03-30");

      // Complex chain
      const result3 = date
        .add(2, "year")
        .subtract(3, "month")
        .add(15, "day")
        .subtract(2, "hour");
      expect(result3).not.toBeNull();
      expect(result3.isValid()).toBe(true);
    });

    it("should maintain immutability through chains", () => {
      const original = fdu("2025-09-30");
      const originalFormatted = original.format("YYYY-MM-DD");

      original.add(1, "year").add(3, "month").subtract(5, "day");

      expect(original.format("YYYY-MM-DD")).toBe(originalFormatted);
    });
  });

  describe("Scenario 3: Date comparisons and calculations", () => {
    it("should compare and calculate differences between dates", () => {
      const startDate = fdu("2025-09-01");
      const endDate = fdu("2025-09-30");

      // Comparisons
      expect(startDate.isBefore(endDate)).toBe(true);
      expect(endDate.isAfter(startDate)).toBe(true);
      expect(startDate.isSame(fdu("2025-09-01"))).toBe(true);

      // Differences
      expect(endDate.diff(startDate, "day")).toBe(29);
      expect(endDate.diff(startDate, "week")).toBe(4);
      expect(endDate.diff(startDate, "month")).toBe(0);
    });

    it("should calculate business logic dates", () => {
      const orderDate = fdu("2025-09-30");
      const deliveryDate = orderDate.add(7, "day"); // 7 days delivery

      expect(deliveryDate.format("YYYY-MM-DD")).toBe("2025-10-07");

      const daysUntilDelivery = deliveryDate.diff(orderDate, "day");
      expect(daysUntilDelivery).toBe(7);
    });
  });

  describe("Scenario 4: Multi-locale formatting", () => {
    it("should format dates in different locales", () => {
      registerLocale("en", en);
      registerLocale("th", th);

      const date = fdu("2025-09-30");

      // English formatting
      const enDate = date.locale("en");
      expect(enDate.format("MMMM")).toBe("September");
      expect(enDate.format("dddd")).toContain("day"); // Contains 'day'

      // Thai formatting
      const thDate = date.locale("th");
      expect(thDate.format("MMMM")).toBe("กันยายน");
      expect(thDate.format("dddd")).toMatch(/^วัน/); // Thai weekday starts with วัน

      // Original unchanged
      expect(date.locale()).toBe("en");
    });

    it("should create locale-specific date displays", () => {
      registerLocale("en", en);
      registerLocale("th", th);

      const date = fdu("2025-12-25");

      // US style
      const usFormat = date.format("MM/DD/YYYY");
      expect(usFormat).toBe("12/25/2025");

      // European style
      const euFormat = date.format("DD.MM.YYYY");
      expect(euFormat).toBe("25.12.2025");

      // Thai full format (Buddhist Era: 2025 + 543 = 2568)
      const thDate2 = date.locale("th");
      const thFormat = thDate2.format("dddd DD MMMM YYYY");
      expect(thFormat).toMatch(/^วัน.+ 25 ธันวาคม 2568/);
    });
  });

  describe("Scenario 5: Time-based operations", () => {
    it("should handle time component operations", () => {
      const date = fdu("2025-09-30T09:30:00");

      // Add hours and minutes
      const meeting = date.add(2, "hour").add(30, "minute");
      expect(meeting.hour()).toBe(12);
      expect(meeting.minute()).toBe(0);

      // Format with time
      const formatted = meeting.format("YYYY-MM-DD HH:mm:ss");
      expect(formatted).toMatch(/2025-09-30 12:00:00/);
    });

    it("should calculate time differences", () => {
      const start = fdu("2025-09-30T09:00:00");
      const end = fdu("2025-09-30T17:30:00");

      const hours = end.diff(start, "hour");
      const minutes = end.diff(start, "minute");

      expect(hours).toBe(8);
      expect(minutes).toBe(510); // 8.5 hours = 510 minutes
    });
  });

  describe("Scenario 6: Real-world date formatting patterns", () => {
    it("should support common date format patterns", () => {
      const date = fdu("2025-09-30T14:35:45");

      // ISO 8601
      expect(date.format("YYYY-MM-DD")).toBe("2025-09-30");

      // US date
      expect(date.format("MM/DD/YYYY")).toBe("09/30/2025");

      // European date
      expect(date.format("DD/MM/YYYY")).toBe("30/09/2025");

      // Full datetime
      const fullFormat = date.format("YYYY-MM-DD HH:mm:ss");
      expect(fullFormat).toMatch(/2025-09-30 \d{2}:35:45/);

      // 12-hour time
      const time12 = date.format("h:mm A");
      expect(time12).toMatch(/\d{1,2}:35 (AM|PM)/);
    });

    it("should format for display purposes", () => {
      registerLocale("en", en);
      const date = fdu("2025-09-30").locale("en");

      // Readable format
      const readable = date.format("dddd, MMMM D, YYYY");
      expect(readable).toMatch(/\w+, \w+ 30, 2025/);

      // Short format
      const short = date.format("MMM D");
      expect(short).toBe("Sep 30");
    });
  });

  describe("Scenario 7: Error handling and edge cases", () => {
    it("should handle invalid dates gracefully", () => {
      const invalid1 = fdu("invalid-date");
      expect(invalid1.isValid()).toBe(false);

      const invalid2 = fdu(NaN);
      expect(invalid2.isValid()).toBe(false);

      const invalid3 = fdu("2025-13-45"); // Invalid month/day
      expect(invalid3.isValid()).toBe(false);
    });

    it("should handle boundary dates", () => {
      // Leap year
      const leapDay = fdu("2024-02-29");
      expect(leapDay.isValid()).toBe(true);
      expect(leapDay.format("YYYY-MM-DD")).toBe("2024-02-29");

      // End of year
      const endOfYear = fdu("2025-12-31T23:59:59");
      const newYear = endOfYear.add(1, "second");
      expect(newYear.year()).toBe(2026);
      expect(newYear.month()).toBe(0); // January

      // Start of year
      const startOfYear = fdu("2025-01-01T00:00:00");
      expect(startOfYear.year()).toBe(2025);
      expect(startOfYear.month()).toBe(0);
    });
  });

  describe("Scenario 8: Immutability verification", () => {
    it("should never mutate original dates", () => {
      const original = fdu("2025-09-30T12:00:00");
      const originalTimestamp = original.valueOf();

      // Perform various operations
      original.add(1, "year");
      original.subtract(3, "month");
      original.add(15, "day");
      original.locale("th");

      // Original should be unchanged
      expect(original.valueOf()).toBe(originalTimestamp);
      expect(original.format("YYYY-MM-DD")).toBe("2025-09-30");
    });

    it("should return new instances for all operations", () => {
      const original = fdu("2025-09-30");

      const added = original.add(1, "day");
      const subtracted = original.subtract(1, "day");
      const localized = original.locale("th");

      expect(added).not.toBe(original);
      expect(subtracted).not.toBe(original);
      expect(localized).not.toBe(original);
    });
  });

  describe("Scenario 9: Performance with large datasets", () => {
    it("should handle rapid date creation", () => {
      const dates = [];
      for (let i = 0; i < 1000; i++) {
        dates.push(fdu("2025-09-30"));
      }
      expect(dates).toHaveLength(1000);
      expect(dates.every((d) => d.isValid())).toBe(true);
    });

    it("should handle rapid formatting", () => {
      const date = fdu("2025-09-30");
      const formatted = [];
      for (let i = 0; i < 1000; i++) {
        formatted.push(date.format("YYYY-MM-DD"));
      }
      expect(formatted).toHaveLength(1000);
      expect(formatted.every((f) => f === "2025-09-30")).toBe(true);
    });
  });

  describe("Scenario 10: Practical application examples", () => {
    it("should calculate age from birthdate", () => {
      const birthdate = fdu("1990-09-30");
      const today = fdu("2025-09-30");
      const age = today.diff(birthdate, "year");
      expect(age).toBe(35);
    });

    it("should calculate project deadlines", () => {
      const projectStart = fdu("2025-09-01");
      const projectDuration = 45; // days
      const deadline = projectStart.add(projectDuration, "day");

      expect(deadline.format("YYYY-MM-DD")).toBe("2025-10-16");

      // Check if deadline is in the future
      const now = fdu("2025-09-15");
      expect(deadline.isAfter(now)).toBe(true);

      // Days remaining
      const daysRemaining = deadline.diff(now, "day");
      expect(daysRemaining).toBe(31);
    });

    it("should calculate subscription periods", () => {
      const subscriptionStart = fdu("2025-09-30");
      const monthlySubscription = subscriptionStart.add(1, "month");
      const yearlySubscription = subscriptionStart.add(1, "year");

      expect(monthlySubscription.format("YYYY-MM-DD")).toBe("2025-10-30");
      expect(yearlySubscription.format("YYYY-MM-DD")).toBe("2026-09-30");

      // Check if subscription is active
      const now = fdu("2025-10-15");
      expect(now.isBefore(yearlySubscription)).toBe(true);
    });
  });
});
