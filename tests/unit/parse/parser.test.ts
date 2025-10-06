import { describe, expect, it } from "vitest";
import { fdu } from "@/core/datetime";
import { parse, parseInput } from "@/parse/parser";

describe("parse()", () => {
  describe("Date input", () => {
    it("should parse Date object", () => {
      const input = new Date("2025-09-30");
      const result = parse(input);
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBe(input.getTime());
    });

    it("should create new Date instance (not reference)", () => {
      const input = new Date("2025-09-30");
      const result = parse(input);
      expect(result).not.toBe(input);
      expect(result.getTime()).toBe(input.getTime());
    });

    it("should handle invalid Date object", () => {
      const input = new Date("invalid");
      const result = parse(input);
      expect(Number.isNaN(result.getTime())).toBe(true);
    });
  });

  describe("String input", () => {
    it("should parse ISO 8601 string", () => {
      const result = parse("2025-09-30T12:00:00.000Z");
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("2025-09-30T12:00:00.000Z");
    });

    it("should parse date-only string", () => {
      const result = parse("2025-09-30");
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(8); // September (0-indexed)
      expect(result.getDate()).toBe(30);
    });

    it("should parse various date formats", () => {
      const formats = [
        "2025-09-30",
        "2025/09/30",
        "Sep 30, 2025",
        "30 Sep 2025",
      ];

      formats.forEach((format) => {
        const result = parse(format);
        expect(result).toBeInstanceOf(Date);
        expect(Number.isNaN(result.getTime())).toBe(false);
      });
    });

    it("should return invalid Date for unparseable strings", () => {
      const result = parse("not a date");
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should handle empty string", () => {
      const result = parse("");
      expect(Number.isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Number input", () => {
    it("should parse Unix timestamp (milliseconds)", () => {
      const timestamp = Date.parse("2025-09-30T12:00:00.000Z");
      const result = parse(timestamp);
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBe(timestamp);
    });

    it("should parse zero timestamp (epoch)", () => {
      const result = parse(0);
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("1970-01-01T00:00:00.000Z");
    });

    it("should parse negative timestamp", () => {
      const result = parse(-86400000); // -1 day
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBe(-86400000);
    });

    it("should handle NaN", () => {
      const result = parse(NaN);
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should handle Infinity", () => {
      const result = parse(Infinity);
      expect(Number.isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Edge cases with parser", () => {
    it("should handle empty array inputs as invalid", () => {
      // biome-ignore lint/suspicious/noExplicitAny: test edge case
      const result = parse([] as any);
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should handle object inputs as invalid", () => {
      // biome-ignore lint/suspicious/noExplicitAny: test edge case
      const result = parse({} as any);
      expect(Number.isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Edge cases", () => {
    it("should handle leap year dates", () => {
      const result = parse("2024-02-29");
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(29);
    });

    it("should handle end of year", () => {
      const result = parse("2025-12-31T23:59:59.999Z");
      expect(result).toBeInstanceOf(Date);
      expect(Number.isNaN(result.getTime())).toBe(false);
      const year = result.getUTCFullYear();
      const month = result.getUTCMonth();
      const date = result.getUTCDate();
      expect(year).toBe(2025);
      expect(month).toBe(11); // December
      expect(date).toBe(31);
    });

    it("should handle start of year", () => {
      const result = parse("2025-01-01T00:00:00.000Z");
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
    });

    it("should handle dates far in the past", () => {
      const result = parse("1900-01-01");
      expect(result.getFullYear()).toBe(1900);
    });

    it("should handle dates far in the future", () => {
      const result = parse("2100-12-31");
      expect(result.getFullYear()).toBe(2100);
    });
  });

  describe("Timezone handling", () => {
    it("should preserve UTC timezone in ISO strings", () => {
      const result = parse("2025-09-30T12:00:00.000Z");
      expect(result.toISOString()).toBe("2025-09-30T12:00:00.000Z");
    });

    it("should parse dates with timezone offsets", () => {
      const result = parse("2025-09-30T12:00:00+05:00");
      expect(result).toBeInstanceOf(Date);
      expect(Number.isNaN(result.getTime())).toBe(false);
    });
  });

  describe("Performance", () => {
    it("should parse quickly", () => {
      const start = Date.now();
      for (let i = 0; i < 10000; i++) {
        parse("2025-09-30");
      }
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(100); // 10k parses in < 100ms
    });
  });
});

describe("parseInput()", () => {
  describe("FduInstance input", () => {
    it("should parse FduInstance using toDate() method", () => {
      const instance = fdu("2025-09-30T12:00:00.000Z");
      const result = parseInput(instance);
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("2025-09-30T12:00:00.000Z");
    });

    it("should create new Date instance from FduInstance", () => {
      const instance = fdu("2025-09-30");
      const result = parseInput(instance);
      expect(result).not.toBe(instance.toDate());
      expect(result.getTime()).toBe(instance.toDate().getTime());
    });
  });

  describe("undefined input", () => {
    it("should return current date when undefined", () => {
      const before = Date.now();
      const result = parseInput(undefined);
      const after = Date.now();
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBeGreaterThanOrEqual(before);
      expect(result.getTime()).toBeLessThanOrEqual(after);
    });
  });

  describe("Standard inputs", () => {
    it("should parse Date object", () => {
      const input = new Date("2025-09-30");
      const result = parseInput(input);
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBe(input.getTime());
    });

    it("should parse number timestamp", () => {
      const timestamp = Date.parse("2025-09-30T12:00:00.000Z");
      const result = parseInput(timestamp);
      expect(result.getTime()).toBe(timestamp);
    });

    it("should parse string", () => {
      const result = parseInput("2025-09-30T12:00:00.000Z");
      expect(result.toISOString()).toBe("2025-09-30T12:00:00.000Z");
    });
  });

  describe("Invalid inputs", () => {
    it("should handle object without toDate method", () => {
      // biome-ignore lint/suspicious/noExplicitAny: test edge case
      const result = parseInput({ foo: "bar" } as any);
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should handle object with non-function toDate property", () => {
      // biome-ignore lint/suspicious/noExplicitAny: test edge case
      const result = parseInput({ toDate: "not a function" } as any);
      expect(Number.isNaN(result.getTime())).toBe(true);
    });
  });
});
