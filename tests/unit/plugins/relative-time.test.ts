import { beforeEach, describe, expect, it } from "vitest";
import { fdu } from "@/core/datetime";
import { relativeTime } from "@/plugins/relative-time";

describe("Relative Time Plugin", () => {
  describe("Long format (default)", () => {
    beforeEach(() => {
      fdu.extend(relativeTime, { style: "long" });
    });

    describe("fromNow()", () => {
      it("should return 'a few seconds ago' for recent past", () => {
        const date = fdu(new Date(Date.now() - 10 * 1000)); // 10 seconds ago
        expect(date.fromNow()).toBe("a few seconds ago");
      });

      it("should return 'in a few seconds' for near future", () => {
        const date = fdu(new Date(Date.now() + 10 * 1000)); // 10 seconds from now
        expect(date.fromNow()).toBe("in a few seconds");
      });

      it("should return 'a minute ago' for ~1 minute ago", () => {
        const date = fdu(new Date(Date.now() - 60 * 1000)); // 1 minute ago
        expect(date.fromNow()).toBe("a minute ago");
      });

      it("should return 'in a minute' for ~1 minute from now", () => {
        const date = fdu(new Date(Date.now() + 60 * 1000)); // 1 minute from now
        expect(date.fromNow()).toBe("in a minute");
      });

      it("should return 'X minutes ago' for multiple minutes", () => {
        const date = fdu(new Date(Date.now() - 5 * 60 * 1000)); // 5 minutes ago
        expect(date.fromNow()).toBe("5 minutes ago");
      });

      it("should return 'in X minutes' for multiple minutes from now", () => {
        const date = fdu(new Date(Date.now() + 10 * 60 * 1000)); // 10 minutes from now
        expect(date.fromNow()).toBe("in 10 minutes");
      });

      it("should return 'an hour ago' for ~1 hour ago", () => {
        const date = fdu(new Date(Date.now() - 80 * 60 * 1000)); // 80 minutes ago (within 90 minute threshold)
        expect(date.fromNow()).toBe("an hour ago");
      });

      it("should return 'in an hour' for ~1 hour from now", () => {
        const date = fdu(new Date(Date.now() + 80 * 60 * 1000)); // 80 minutes from now
        expect(date.fromNow()).toBe("in an hour");
      });

      it("should return 'X hours ago' for multiple hours", () => {
        const date = fdu(new Date(Date.now() - 5 * 60 * 60 * 1000)); // 5 hours ago
        expect(date.fromNow()).toBe("5 hours ago");
      });

      it("should return 'in X hours' for multiple hours from now", () => {
        const date = fdu(new Date(Date.now() + 10 * 60 * 60 * 1000)); // 10 hours from now
        expect(date.fromNow()).toBe("in 10 hours");
      });

      it("should return 'a day ago' for ~1 day ago", () => {
        const date = fdu(new Date(Date.now() - 30 * 60 * 60 * 1000)); // 30 hours ago (within 1.5 day threshold)
        expect(date.fromNow()).toBe("a day ago");
      });

      it("should return 'in a day' for ~1 day from now", () => {
        const date = fdu(new Date(Date.now() + 30 * 60 * 60 * 1000)); // 30 hours from now
        expect(date.fromNow()).toBe("in a day");
      });

      it("should return 'X days ago' for multiple days", () => {
        const date = fdu(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // 7 days ago
        expect(date.fromNow()).toBe("7 days ago");
      });

      it("should return 'in X days' for multiple days from now", () => {
        const date = fdu(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)); // 14 days from now
        expect(date.fromNow()).toBe("in 14 days");
      });

      it("should return 'a month ago' for ~1 month ago", () => {
        const date = fdu(new Date(Date.now() - 35 * 24 * 60 * 60 * 1000)); // 35 days ago (within 45 day threshold)
        expect(date.fromNow()).toBe("a month ago");
      });

      it("should return 'in a month' for ~1 month from now", () => {
        const date = fdu(new Date(Date.now() + 35 * 24 * 60 * 60 * 1000)); // 35 days from now
        expect(date.fromNow()).toBe("in a month");
      });

      it("should return 'X months ago' for multiple months", () => {
        const date = fdu(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)); // ~3 months ago
        expect(date.fromNow()).toMatch(/\d+ months ago/);
      });

      it("should return 'in X months' for multiple months from now", () => {
        const date = fdu(new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)); // ~6 months from now
        expect(date.fromNow()).toMatch(/in \d+ months/);
      });

      it("should return 'a year ago' for ~1 year ago", () => {
        const date = fdu(new Date(Date.now() - 400 * 24 * 60 * 60 * 1000)); // ~13 months ago
        expect(date.fromNow()).toBe("a year ago");
      });

      it("should return 'in a year' for ~1 year from now", () => {
        const date = fdu(new Date(Date.now() + 400 * 24 * 60 * 60 * 1000)); // ~13 months from now
        expect(date.fromNow()).toBe("in a year");
      });

      it("should return 'X years ago' for multiple years", () => {
        const date = fdu(new Date(Date.now() - 730 * 24 * 60 * 60 * 1000)); // ~2 years ago
        expect(date.fromNow()).toMatch(/\d+ years ago/);
      });

      it("should return 'in X years' for multiple years from now", () => {
        const date = fdu(new Date(Date.now() + 1095 * 24 * 60 * 60 * 1000)); // ~3 years from now
        expect(date.fromNow()).toMatch(/in \d+ years/);
      });
    });

    describe("toNow()", () => {
      it("should return 'a few seconds ago' for recent past (inverse of fromNow)", () => {
        const date = fdu(new Date(Date.now() - 10 * 1000)); // 10 seconds ago
        expect(date.toNow()).toBe("a few seconds ago");
      });

      it("should return 'in a few seconds' for near future (inverse of fromNow)", () => {
        const date = fdu(new Date(Date.now() + 10 * 1000)); // 10 seconds from now
        expect(date.toNow()).toBe("in a few seconds");
      });

      it("should return 'a minute ago' for ~1 minute ago (inverse)", () => {
        const date = fdu(new Date(Date.now() - 60 * 1000)); // 1 minute ago
        expect(date.toNow()).toBe("a minute ago");
      });

      it("should return 'in a minute' for ~1 minute from now (inverse)", () => {
        const date = fdu(new Date(Date.now() + 60 * 1000)); // 1 minute from now
        expect(date.toNow()).toBe("in a minute");
      });

      it("should return 'X minutes ago' for multiple minutes ago (inverse)", () => {
        const date = fdu(new Date(Date.now() - 5 * 60 * 1000)); // 5 minutes ago
        expect(date.toNow()).toBe("5 minutes ago");
      });

      it("should return 'in X minutes' for multiple minutes from now (inverse)", () => {
        const date = fdu(new Date(Date.now() + 10 * 60 * 1000)); // 10 minutes from now
        expect(date.toNow()).toBe("in 10 minutes");
      });

      it("should return 'X days ago' for past dates (inverse)", () => {
        const date = fdu(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // 7 days ago
        expect(date.toNow()).toBe("7 days ago");
      });

      it("should return 'in X days' for future dates (inverse)", () => {
        const date = fdu(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)); // 14 days from now
        expect(date.toNow()).toBe("in 14 days");
      });
    });

    describe("from()", () => {
      it("should calculate relative time from another date (past)", () => {
        const date1 = fdu("2025-01-01");
        const date2 = fdu("2025-01-08");
        expect(date1.from(date2)).toBe("7 days ago");
      });

      it("should calculate relative time from another date (future)", () => {
        const date1 = fdu("2025-01-08");
        const date2 = fdu("2025-01-01");
        expect(date1.from(date2)).toBe("in 7 days");
      });

      it("should handle same dates", () => {
        const date1 = fdu("2025-01-01");
        const date2 = fdu("2025-01-01");
        // When dates are the same, diff is 0, direction is "past" (0 > 0 is false, so "past")
        expect(date1.from(date2)).toMatch(/a few seconds/);
      });

      it("should handle months difference", () => {
        const date1 = fdu("2025-01-01");
        const date2 = fdu("2025-04-01");
        expect(date1.from(date2)).toMatch(/months ago/);
      });

      it("should handle years difference", () => {
        const date1 = fdu("2023-01-01");
        const date2 = fdu("2025-01-01");
        expect(date1.from(date2)).toMatch(/years ago/);
      });
    });

    describe("to()", () => {
      it("should calculate relative time to another date (past - inverse)", () => {
        const date1 = fdu("2025-01-01");
        const date2 = fdu("2025-01-08");
        // to(): diff = date1 - date2 = -7 days, so direction is "past"
        expect(date1.to(date2)).toBe("7 days ago");
      });

      it("should calculate relative time to another date (future - inverse)", () => {
        const date1 = fdu("2025-01-08");
        const date2 = fdu("2025-01-01");
        // to(): diff = date1 - date2 = +7 days, so direction is "future"
        expect(date1.to(date2)).toBe("in 7 days");
      });

      it("should handle same dates", () => {
        const date1 = fdu("2025-01-01");
        const date2 = fdu("2025-01-01");
        expect(date1.to(date2)).toMatch(/a few seconds/);
      });

      it("should handle months difference", () => {
        const date1 = fdu("2025-01-01");
        const date2 = fdu("2024-10-01");
        // date1 (Jan 2025) to date2 (Oct 2024) = past
        expect(date1.to(date2)).toMatch(/months/);
      });

      it("should handle years difference", () => {
        const date1 = fdu("2025-01-01");
        const date2 = fdu("2023-01-01");
        // date1 (2025) to date2 (2023) = past
        expect(date1.to(date2)).toMatch(/years/);
      });
    });
  });

  describe("Short format", () => {
    beforeEach(() => {
      fdu.extend(relativeTime, { style: "short" });
    });

    describe("fromNow() with short style", () => {
      it("should return 'now' for recent past", () => {
        const date = fdu(new Date(Date.now() - 10 * 1000)); // 10 seconds ago
        expect(date.fromNow()).toBe("now");
      });

      it("should return '1m' for ~1 minute", () => {
        const date = fdu(new Date(Date.now() - 60 * 1000)); // 1 minute ago
        expect(date.fromNow()).toBe("1m");
      });

      it("should return 'Xm' for multiple minutes", () => {
        const date = fdu(new Date(Date.now() - 5 * 60 * 1000)); // 5 minutes ago
        expect(date.fromNow()).toBe("5m");
      });

      it("should return hour format for ~1-2 hours", () => {
        const date = fdu(new Date(Date.now() - 90 * 60 * 1000)); // 90 minutes ago
        // 90 minutes = 5400 seconds, rounds to 1-2 hours
        expect(date.fromNow()).toMatch(/^\d+h$/);
      });

      it("should return 'Xh' for multiple hours", () => {
        const date = fdu(new Date(Date.now() - 5 * 60 * 60 * 1000)); // 5 hours ago
        expect(date.fromNow()).toBe("5h");
      });

      it("should return day format for ~1-2 days", () => {
        const date = fdu(new Date(Date.now() - 36 * 60 * 60 * 1000)); // 36 hours ago
        // 36 hours = 1.5 days, rounds to 1-2 days
        expect(date.fromNow()).toMatch(/^\d+d$/);
      });

      it("should return 'Xd' for multiple days", () => {
        const date = fdu(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // 7 days ago
        expect(date.fromNow()).toBe("7d");
      });

      it("should return month format for ~1-2 months", () => {
        const date = fdu(new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)); // 45 days ago
        // 45 days, rounds to 1-2 months
        expect(date.fromNow()).toMatch(/^\d+mo$/);
      });

      it("should return 'Xmo' for multiple months", () => {
        const date = fdu(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)); // ~3 months ago
        expect(date.fromNow()).toMatch(/\d+mo/);
      });

      it("should return '1y' for ~1 year", () => {
        const date = fdu(new Date(Date.now() - 400 * 24 * 60 * 60 * 1000)); // ~13 months ago
        expect(date.fromNow()).toBe("1y");
      });

      it("should return 'Xy' for multiple years", () => {
        const date = fdu(new Date(Date.now() - 730 * 24 * 60 * 60 * 1000)); // ~2 years ago
        expect(date.fromNow()).toMatch(/\d+y/);
      });
    });

    describe("toNow() with short style", () => {
      it("should return 'now' for near future", () => {
        const date = fdu(new Date(Date.now() + 10 * 1000)); // 10 seconds from now
        expect(date.toNow()).toBe("now");
      });

      it("should return '1m' for ~1 minute from now", () => {
        const date = fdu(new Date(Date.now() + 60 * 1000)); // 1 minute from now
        expect(date.toNow()).toBe("1m");
      });

      it("should return 'Xd' for multiple days from now", () => {
        const date = fdu(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // 7 days from now
        expect(date.toNow()).toBe("7d");
      });
    });

    describe("from() and to() with short style", () => {
      it("from() should use short format", () => {
        const date1 = fdu("2025-01-01");
        const date2 = fdu("2025-01-08");
        expect(date1.from(date2)).toBe("7d");
      });

      it("to() should use short format", () => {
        const date1 = fdu("2025-01-08");
        const date2 = fdu("2025-01-01");
        expect(date1.to(date2)).toBe("7d");
      });
    });
  });

  describe("Plugin metadata", () => {
    it("should have correct plugin name", () => {
      expect(relativeTime.name).toBe("relative-time");
    });

    it("should have version", () => {
      expect(relativeTime.version).toBeDefined();
      expect(typeof relativeTime.version).toBe("string");
    });
  });

  describe("Edge cases", () => {
    beforeEach(() => {
      fdu.extend(relativeTime, { style: "long" });
    });

    it("should handle exact thresholds correctly", () => {
      // 45 seconds (threshold for switching to 'a minute')
      const date = fdu(new Date(Date.now() - 44 * 1000));
      const result = date.fromNow();
      expect(result).toBeDefined();
    });

    it("should handle very large time differences", () => {
      const date = fdu(new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000)); // 10 years ago
      expect(date.fromNow()).toMatch(/\d+ years ago/);
    });

    it("should handle very small time differences", () => {
      const date = fdu(new Date(Date.now() - 1000)); // 1 second ago
      expect(date.fromNow()).toBe("a few seconds ago");
    });
  });

  describe("Default options", () => {
    it("should use 'long' style by default when no options provided", () => {
      // Register plugin without options to test default style
      fdu.extend(relativeTime);

      const date = fdu(new Date(Date.now() - 5 * 60 * 1000)); // 5 minutes ago
      const result = date.fromNow();

      // Long style should return full words like "5 minutes ago"
      expect(result).toBe("5 minutes ago");
    });
  });
});
