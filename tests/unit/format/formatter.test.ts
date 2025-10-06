import { en } from "@pyyupsk/fdu/locale/en";
import { th } from "@pyyupsk/fdu/locale/th";
import { describe, expect, it } from "vitest";
import { format } from "@/format/formatter";

describe("format()", () => {
  const testDate = new Date("2025-09-30T14:35:45.123Z");

  describe("Basic patterns", () => {
    it("should format YYYY-MM-DD", () => {
      expect(format(testDate, "YYYY-MM-DD")).toBe("2025-09-30");
    });

    it("should format DD/MM/YYYY", () => {
      expect(format(testDate, "DD/MM/YYYY")).toBe("30/09/2025");
    });

    it("should format YYYY/MM/DD HH:mm:ss", () => {
      const result = format(testDate, "YYYY/MM/DD HH:mm:ss");
      expect(result).toMatch(/2025\/09\/30 \d{2}:\d{2}:\d{2}/);
    });
  });

  describe("Complex patterns", () => {
    it("should format with full month and weekday names", () => {
      const result = format(testDate, "dddd, MMMM DD, YYYY", en);
      expect(result).toMatch(/\w+, \w+ 30, 2025/);
    });

    it("should format with short names", () => {
      const result = format(testDate, "ddd, MMM DD, YYYY", en);
      expect(result).toMatch(/\w+, \w+ 30, 2025/);
    });

    it("should format 12-hour time with AM/PM", () => {
      const result = format(testDate, "hh:mm:ss A");
      expect(result).toMatch(/\d{2}:\d{2}:\d{2} (AM|PM)/);
    });

    it("should format with milliseconds", () => {
      const result = format(testDate, "HH:mm:ss.SSS");
      expect(result).toMatch(/\d{2}:\d{2}:\d{2}\.\d{3}/);
    });
  });

  describe("Locale support", () => {
    it("should format with English locale", () => {
      const result = format(testDate, "MMMM", en);
      expect(result).toBe("September");
    });

    it("should format with Thai locale", () => {
      const result = format(testDate, "MMMM", th);
      expect(result).toBe("กันยายน");
    });

    it("should format weekday with locale", () => {
      const result = format(testDate, "dddd", en);
      expect(en.weekdays).toContain(result);
    });

    it("should handle missing locale gracefully", () => {
      const result = format(testDate, "MMMM");
      expect(result).toMatch(/^(9|September)$/);
    });
  });

  describe("Edge cases", () => {
    it("should handle patterns with no actual format tokens", () => {
      const result = format(testDate, "---");
      expect(result).toBe("---");
    });

    it("should handle empty pattern", () => {
      expect(format(testDate, "")).toBe("");
    });

    it("should preserve non-token separators", () => {
      const result = format(testDate, "YYYY---MM---DD");
      expect(result).toBe("2025---09---30");
    });

    it("should handle multiple identical tokens", () => {
      const result = format(testDate, "YYYY YYYY");
      expect(result).toBe("2025 2025");
    });

    it("should handle adjacent tokens without separator", () => {
      const result = format(testDate, "YYYYMMDD");
      expect(result).toBe("20250930");
    });

    it("should handle special characters", () => {
      const result = format(testDate, "YYYY-MM-DD (HH:mm:ss)");
      expect(result).toMatch(/2025-09-30 \(.*\)/);
    });

    it("should preserve unknown tokens that look like real tokens", () => {
      const result = format(testDate, "YYYY-QQ-DD");
      expect(result).toBe("2025-QQ-30");
    });
  });

  describe("Real-world patterns", () => {
    it("should format ISO 8601", () => {
      const result = format(testDate, "YYYY-MM-DD");
      expect(result).toBe("2025-09-30");
    });

    it("should format US style", () => {
      const result = format(testDate, "MM/DD/YYYY");
      expect(result).toBe("09/30/2025");
    });

    it("should format European style", () => {
      const result = format(testDate, "DD.MM.YYYY");
      expect(result).toBe("30.09.2025");
    });

    it("should format full datetime", () => {
      const result = format(testDate, "YYYY-MM-DD HH:mm:ss.SSS");
      expect(result).toMatch(/2025-09-30 \d{2}:\d{2}:\d{2}\.\d{3}/);
    });

    it("should format human-readable", () => {
      const result = format(testDate, "dddd, MMMM D, YYYY h:mm A", en);
      expect(result).toMatch(/\w+, \w+ 30, 2025 \d{1,2}:\d{2} (AM|PM)/);
    });
  });

  describe("Performance considerations", () => {
    it("should handle large patterns efficiently", () => {
      const pattern =
        "YYYY-MM-DD HH:mm:ss YYYY-MM-DD HH:mm:ss YYYY-MM-DD HH:mm:ss";
      const start = Date.now();
      format(testDate, pattern);
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(10); // Should be very fast
    });

    it("should handle repeated formatting", () => {
      const start = Date.now();
      for (let i = 0; i < 1000; i++) {
        format(testDate, "YYYY-MM-DD HH:mm:ss");
      }
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(100); // Should handle 1000 formats quickly
    });
  });

  describe("Token edge cases", () => {
    it("should handle tokens without locale data", () => {
      const result = format(testDate, "MMMM YYYY");
      expect(result).toMatch(/^\d+ 2025$/);
    });

    it("should correctly replace valid tokens and leave invalid ones", () => {
      const result = format(testDate, "YYYY-QQ-DD");
      expect(result).toBe("2025-QQ-30");
    });
  });

  describe("Nested bracket formatting", () => {
    it("should format tokens inside nested brackets", () => {
      const result = format(testDate, "[[YYYY-MM-DD]]");
      expect(result).toBe("[2025-09-30]");
    });

    it("should handle multiple nested bracket pairs", () => {
      const result = format(testDate, "[[YYYY]] [[MM]]");
      expect(result).toBe("[2025] [09]");
    });

    it("should format complex patterns inside nested brackets", () => {
      const result = format(testDate, "[[YYYY-MM-DD HH:mm]]");
      expect(result).toMatch(/^\[2025-09-30 \d{2}:\d{2}\]$/);
    });
  });

  describe("Locale format expansion", () => {
    it("should expand LT format when locale has formats defined", () => {
      const localeWithFormats = {
        ...en,
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A",
        },
      };
      const result = format(testDate, "LT", localeWithFormats);
      expect(result).toMatch(/^\d{1,2}:\d{2} (AM|PM)$/);
    });

    it("should expand LTS format when locale has formats defined", () => {
      const localeWithFormats = {
        ...en,
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A",
        },
      };
      const result = format(testDate, "LTS", localeWithFormats);
      expect(result).toMatch(/^\d{1,2}:\d{2}:\d{2} (AM|PM)$/);
    });

    it("should expand L format when locale has formats defined", () => {
      const localeWithFormats = {
        ...en,
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A",
        },
      };
      const result = format(testDate, "L", localeWithFormats);
      expect(result).toBe("09/30/2025");
    });

    it("should expand LL format when locale has formats defined", () => {
      const localeWithFormats = {
        ...en,
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A",
        },
      };
      const result = format(testDate, "LL", localeWithFormats);
      expect(result).toMatch(/^\w+ 30, 2025$/);
    });

    it("should expand LLL format when locale has formats defined", () => {
      const localeWithFormats = {
        ...en,
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A",
        },
      };
      const result = format(testDate, "LLL", localeWithFormats);
      expect(result).toMatch(/^\w+ 30, 2025 \d{1,2}:\d{2} (AM|PM)$/);
    });

    it("should expand LLLL format when locale has formats defined", () => {
      const localeWithFormats = {
        ...en,
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A",
        },
      };
      const result = format(testDate, "LLLL", localeWithFormats);
      expect(result).toMatch(/^\w+, \w+ 30, 2025 \d{1,2}:\d{2} (AM|PM)$/);
    });

    it("should not expand format when pattern doesn't match exactly", () => {
      const localeWithFormats = {
        ...en,
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A",
        },
      };
      // Pattern "LT YYYY" does not exactly match any format key, so no expansion happens
      // The pattern is treated as tokens: LT (no token) YYYY (expands to 2025)
      const result = format(testDate, "LT YYYY", localeWithFormats);
      expect(result).toBe("LT 2025");
    });

    it("should skip format expansion when locale has no formats", () => {
      const result = format(testDate, "LLLL");
      // Without locale formats, LLLL should be treated as tokens
      expect(result).toMatch(/LLLL/);
    });
  });
});
