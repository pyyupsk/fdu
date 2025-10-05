import { describe, expect, it } from "vitest";
import { format } from "../../../src/format/formatter";
import { en } from "../../../src/locale/locales/en";

describe("Escaped Text in Format Strings", () => {
  const testDate = new Date("2025-01-15T14:30:00");
  const mondayDate = new Date("2025-01-06T00:00:00"); // Monday, January 6th
  const wednesdayDate = new Date("2025-01-15T00:00:00"); // Wednesday, January 15th

  describe("Basic escaped text", () => {
    it("Test 1: should output literal text in brackets", () => {
      const result = format(wednesdayDate, "[Today is] dddd", en);
      expect(result).toBe("Today is Wednesday");
    });

    it("Test 2: should preserve escaped text mid-pattern", () => {
      const result = format(testDate, "YYYY-MM-DD [at] HH:mm", en);
      expect(result).toBe("2025-01-15 at 14:30");
    });

    it("Test 3: should not process token-like text inside brackets", () => {
      const result = format(testDate, "[AM/PM]: A", en);
      expect(result).toBe("AM/PM: PM");
    });
  });

  describe("Multiple escaped sections", () => {
    it("Test 4: should handle multiple escaped sections", () => {
      const result = format(testDate, "[Year] YYYY [Month] MMMM", en);
      expect(result).toBe("Year 2025 Month January");
    });

    it("Test 5: should handle adjacent escaped sections and tokens", () => {
      const result = format(wednesdayDate, "dddd[, the ]Do[ of ]MMMM", en);
      expect(result).toBe("Wednesday, the 15th of January");
    });
  });

  describe("Edge cases: Nested brackets", () => {
    it("Test 6: should handle nested brackets with token", () => {
      const result = format(mondayDate, "[[Do]]", en);
      expect(result).toBe("[6th]");
    });

    it("Test 7: should handle mixed nested brackets", () => {
      const result = format(mondayDate, "[Today is] dddd [[Do]]", en);
      expect(result).toBe("Today is Monday [6th]");
    });

    it("Test 8: should handle nested brackets without token", () => {
      const result = format(mondayDate, "[[note]]", en);
      expect(result).toBe("[note]");
    });
  });

  describe("Edge cases: Unclosed brackets", () => {
    it("Test 9: should treat unclosed bracket as literal at end", () => {
      const result = format(testDate, "YYYY [unclosed", en);
      expect(result).toBe("2025 [unclosed");
    });

    it("Test 10: should treat unclosed bracket as literal with tokens after", () => {
      const result = format(testDate, "YYYY [at HH:mm", en);
      expect(result).toBe("2025 [at 14:30");
    });
  });

  describe("Edge cases: Empty brackets", () => {
    it("Test 11: should handle empty brackets", () => {
      const result = format(testDate, "YYYY[]MM", en);
      expect(result).toBe("202501");
    });

    it("Test 12: should handle multiple empty brackets", () => {
      const result = format(testDate, "YYYY[]MM[]DD", en);
      expect(result).toBe("20250115");
    });
  });

  describe("Edge cases: Literal bracket characters", () => {
    it("Test 13: should output literal brackets with formatted content", () => {
      const result = format(testDate, "[[MM]]", en);
      expect(result).toBe("[01]");
    });

    it("Test 14: should output literal brackets without formatted content", () => {
      const result = format(mondayDate, "[[note]]", en);
      expect(result).toBe("[note]");
    });

    it("Test 15: should handle mixed literal and escaped", () => {
      const result = format(mondayDate, "YYYY [[Do]] [is today]", en);
      expect(result).toBe("2025 [6th] is today");
    });

    it("Test 16: should handle unknown tokens inside nested brackets", () => {
      const result = format(testDate, "YYYY [[QQ]]", en);
      expect(result).toBe("2025 [QQ]");
    });
  });
});
