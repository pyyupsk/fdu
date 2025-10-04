import { beforeEach, describe, expect, it } from "vitest";
import { fdu } from "../../../src/core/datetime";
import {
  registerLocale,
  locale as setGlobalLocale,
} from "../../../src/locale/locale";
import { en } from "../../../src/locale/locales/en";
import { th } from "../../../src/locale/locales/th";

describe("Year Offset - Alternative Calendar Systems", () => {
  beforeEach(() => {
    setGlobalLocale("en");
    registerLocale("en", en);
    registerLocale("th", th);
  });

  describe("Thai Buddhist Era (yearOffset: 543)", () => {
    it("should add 543 years for YYYY format in Thai locale", () => {
      const date = fdu("2025-01-15").locale("th");
      expect(date.format("YYYY")).toBe("2568");
    });

    it("should add 543 years for YY format in Thai locale", () => {
      const date = fdu("2025-01-15").locale("th");
      expect(date.format("YY")).toBe("68");
    });

    it("should work with full date format", () => {
      const date = fdu("2025-01-15").locale("th");
      expect(date.format("YYYY-MM-DD")).toBe("2568-01-15");
    });

    it("should work with locale format patterns", () => {
      const date = fdu("2025-01-15").locale("th");
      expect(date.format("LL")).toContain("2568");
    });

    it("should handle year 2000 correctly", () => {
      const date = fdu("2000-06-15").locale("th");
      expect(date.format("YYYY")).toBe("2543");
    });

    it("should handle year 1999 correctly", () => {
      const date = fdu("1999-12-31").locale("th");
      expect(date.format("YYYY")).toBe("2542");
    });

    it("should handle leap year correctly with offset", () => {
      const date = fdu("2024-02-29").locale("th");
      expect(date.format("YYYY-MM-DD")).toBe("2567-02-29");
    });
  });

  describe("Locale switching with year offset", () => {
    it("should show different years when switching between en and th", () => {
      const date = fdu("2025-01-15");
      const dateEn = date.locale("en");
      const dateTh = date.locale("th");

      expect(dateEn.format("YYYY")).toBe("2025");
      expect(dateTh.format("YYYY")).toBe("2568");
    });

    it("should maintain correct year offset through operations", () => {
      const date = fdu("2025-01-15").locale("th").add(1, "year");
      expect(date.format("YYYY")).toBe("2569");
    });

    it("should work correctly when changing locale after manipulation", () => {
      const date = fdu("2025-01-15").add(1, "day").locale("th");
      expect(date.format("YYYY-MM-DD")).toBe("2568-01-16");
    });
  });

  describe("No offset for locales without yearOffset", () => {
    it("should not apply offset for English locale", () => {
      const date = fdu("2025-01-15").locale("en");
      expect(date.format("YYYY")).toBe("2025");
    });

    it("should show same year for locales without offset", () => {
      const date = fdu("2025-06-15");
      const dateEn = date.locale("en");

      expect(dateEn.format("YYYY")).toBe("2025");
    });
  });

  describe("Edge cases", () => {
    it("should handle century boundary with offset", () => {
      const date = fdu("2000-01-01").locale("th");
      expect(date.format("YYYY")).toBe("2543");
    });

    it("should handle BC years if supported", () => {
      const date = fdu("1900-01-01").locale("th");
      expect(date.format("YYYY")).toBe("2443");
    });

    it("should work with custom format including multiple year tokens", () => {
      const date = fdu("2025-01-15").locale("th");
      expect(date.format("YYYY (YY)")).toBe("2568 (68)");
    });
  });
});
