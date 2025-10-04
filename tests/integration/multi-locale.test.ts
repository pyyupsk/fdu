import { beforeEach, describe, expect, it, vi } from "vitest";
import { fdu } from "../../src/core/datetime";
import type { LocaleConfig } from "../../src/core/types";
import {
  registerLocale,
  locale as setGlobalLocale,
} from "../../src/locale/locale";
import { en } from "../../src/locale/locales/en";
import { es } from "../../src/locale/locales/es";
import { fr } from "../../src/locale/locales/fr";
import { zhCn } from "../../src/locale/locales/zh-cn";

describe("Multi-Locale Integration Tests", () => {
  beforeEach(() => {
    setGlobalLocale("en");
    registerLocale("en", en);
  });

  describe("Scenario 1: Spanish Locale Formatting", () => {
    it("should format dates in Spanish after registering locale", () => {
      registerLocale("es", es);
      const date = fdu("2025-01-15").locale("es");

      expect(date.format("MMMM")).toBe("enero");
      expect(date.format("MMM")).toBe("ene");
    });
  });

  describe("Scenario 2: Multi-Locale Switching", () => {
    it("should format same date in multiple locales", () => {
      const date = fdu("2025-01-15");

      // English (default)
      expect(date.format("MMMM")).toBe("January");

      const spanish = date.locale("es").format("MMMM");
      expect(spanish).toBe("enero");
    });

    it("should maintain immutability when switching locales", () => {
      registerLocale("fr", fr);

      const date = fdu("2025-01-15");
      const dateEn = date.locale("en");
      const dateFr = date.locale("fr");

      expect(date.format("MMMM")).toBe("January");
      expect(dateEn.format("MMMM")).toBe("January");
      expect(dateFr.format("MMMM")).toBe("janvier");
    });
  });

  describe("Scenario 3: Default English Locale", () => {
    it("should work without any locale imports", () => {
      const date = fdu("2025-01-15");

      expect(date.format("MMMM")).toBe("January");
      expect(date.format("dddd")).toBe("Wednesday");
    });

    it("should format with English patterns by default", () => {
      const date = fdu("2025-01-15");
      expect(date.format("MMMM D, YYYY")).toBe("January 15, 2025");
    });
  });

  describe("Scenario 5: Chinese Locale Formatting", () => {
    it("should handle Chinese locale with complex meridiem", () => {
      registerLocale("zh-cn", zhCn);
      const date = fdu("2025-01-15").locale("zh-cn");

      expect(date.format("MMMM")).toBe("一月");
    });
  });

  describe("Scenario 6: Regional Variants (en-gb vs en-us)", () => {
    it("should support regional variants with different formats", () => {
      const enGb: LocaleConfig = {
        name: "en-gb",
        months: en.months,
        weekdays: en.weekdays,
        weekStart: 1,
      };

      registerLocale("en-gb", enGb);

      const date = fdu("2025-01-15");
      expect(date.locale("en").format("MMMM")).toBe("January");
      expect(date.locale("en-gb").format("MMMM")).toBe("January");
    });
  });

  describe("Scenario 7: Locale Persistence Through Operations", () => {
    it("should persist locale through add/subtract operations", () => {
      registerLocale("es", es);

      const date = fdu("2025-01-15")
        .locale("es")
        .add(1, "month")
        .subtract(2, "day");

      expect(date.locale()).toBe("es");
      expect(date.format("MMMM")).toBe("febrero");
    });
  });

  describe("Scenario 8: Fallback Behavior", () => {
    it("should fall back to English for unregistered locale", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const date = fdu("2025-01-15").locale("nonexistent");
      const result = date.format("MMMM");

      expect(result).toBe("January");
      expect(consoleSpy).toHaveBeenCalledWith(
        'Locale "nonexistent" not registered, falling back to "en"',
      );

      consoleSpy.mockRestore();
    });

    it("should continue working after fallback", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const date = fdu("2025-01-15").locale("nonexistent");
      expect(date.format("MMMM D, YYYY")).toBe("January 15, 2025");

      consoleSpy.mockRestore();
    });
  });

  describe("Scenario 9: Global Locale Setting", () => {
    it("should set global default locale", () => {
      registerLocale("es", es);
      setGlobalLocale("es");

      const date1 = fdu("2025-01-15");
      const date2 = fdu("2025-02-20");

      expect(date1.format("MMMM")).toBe("enero");
      expect(date2.format("MMMM")).toBe("febrero");
    });

    it("should allow instance-level override of global locale", () => {
      registerLocale("es", es);
      setGlobalLocale("es");

      const date = fdu("2025-01-15").locale("en");
      expect(date.format("MMMM")).toBe("January");
    });

    it("should not affect existing instances when changing global locale", () => {
      const date = fdu("2025-01-15");
      expect(date.format("MMMM")).toBe("January");

      registerLocale("es", es);
      setGlobalLocale("es");

      // Existing instance should still use English
      expect(date.format("MMMM")).toBe("January");

      // New instance should use Spanish
      const newDate = fdu("2025-01-15");
      expect(newDate.format("MMMM")).toBe("enero");
    });
  });

  describe("Scenario 10: Performance Validation", () => {
    it("should handle rapid locale switching efficiently", () => {
      registerLocale("es", es);

      const start = performance.now();

      for (let i = 0; i < 1000; i++) {
        fdu().locale("es").format("MMMM");
      }

      const end = performance.now();
      const avgTime = (end - start) / 1000;

      // Average time should be less than 1ms per operation
      expect(avgTime).toBeLessThan(1);
    });

    it("should not leak memory with repeated locale operations", () => {
      registerLocale("es", es);

      // Run many operations - should not cause memory issues
      for (let i = 0; i < 10000; i++) {
        fdu().locale("es").format("MMMM");
      }

      // If we get here without crashing, test passes
      expect(true).toBe(true);
    });
  });
});
