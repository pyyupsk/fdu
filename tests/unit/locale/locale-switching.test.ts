import { beforeEach, describe, expect, it } from "vitest";
import { fdu } from "../../../src/core/datetime";
import {
  registerLocale,
  locale as setGlobalLocale,
} from "../../../src/locale/locale";
import { en } from "../../../src/locale/locales/en";

describe("FdInstance.locale() - Instance-level locale switching", () => {
  beforeEach(() => {
    // Reset to default locale and ensure English is registered
    setGlobalLocale("en");
    registerLocale("en", en);
  });

  describe("Immutability", () => {
    it("should return new instance when setting locale", () => {
      const date1 = fdu("2025-01-15");
      const date2 = date1.locale("es");

      expect(date1).not.toBe(date2);
      expect(date1.locale()).toBe("en");
      expect(date2.locale()).toBe("es");
    });

    it("should not affect original instance", () => {
      const original = fdu("2025-01-15");
      const withLocale = original.locale("fr");

      expect(original.locale()).toBe("en");
      expect(withLocale.locale()).toBe("fr");
    });
  });

  describe("Chaining", () => {
    it("should allow method chaining", () => {
      const result = fdu("2025-01-15").locale("es").add(1, "day");

      expect(result.locale()).toBe("es");
    });

    it("should persist locale through multiple operations", () => {
      const result = fdu("2025-01-15")
        .locale("fr")
        .add(1, "month")
        .subtract(2, "day");

      expect(result.locale()).toBe("fr");
    });

    it("should persist locale through date manipulation", () => {
      const date = fdu("2025-01-15").locale("de");
      const added = date.add(5, "day");
      const subtracted = date.subtract(3, "day");

      expect(date.locale()).toBe("de");
      expect(added.locale()).toBe("de");
      expect(subtracted.locale()).toBe("de");
    });
  });

  describe("Locale persistence", () => {
    it("should maintain locale after add operation", () => {
      const date = fdu().locale("es").add(1, "day");
      expect(date.locale()).toBe("es");
    });

    it("should maintain locale after subtract operation", () => {
      const date = fdu().locale("es").subtract(1, "day");
      expect(date.locale()).toBe("es");
    });

    it("should maintain locale through complex chain", () => {
      const date = fdu()
        .locale("zh-cn")
        .add(3, "day")
        .add(2, "hour")
        .subtract(1, "minute");

      expect(date.locale()).toBe("zh-cn");
    });
  });

  describe("Global vs instance locale", () => {
    it("should use global locale by default", () => {
      setGlobalLocale("en");
      const date = fdu();
      expect(date.locale()).toBe("en");
    });

    it("should allow instance-level override of global locale", () => {
      setGlobalLocale("en");
      const date = fdu().locale("es");
      expect(date.locale()).toBe("es");
    });

    it("should not affect global locale when setting instance locale", () => {
      setGlobalLocale("en");
      fdu().locale("es");
      expect(setGlobalLocale()).toBe("en");
    });

    it("should allow multiple instances with different locales", () => {
      const dateEn = fdu().locale("en");
      const dateFr = fdu().locale("fr");
      const dateDe = fdu().locale("de");

      expect(dateEn.locale()).toBe("en");
      expect(dateFr.locale()).toBe("fr");
      expect(dateDe.locale()).toBe("de");
    });
  });

  describe("Locale getter", () => {
    it("should return current instance locale", () => {
      const date = fdu().locale("es");
      expect(date.locale()).toBe("es");
    });

    it("should return global locale if no instance locale set", () => {
      setGlobalLocale("fr");
      const date = fdu();
      expect(date.locale()).toBe("fr");
    });

    it("should return correct locale after chaining", () => {
      const date = fdu().locale("de").add(1, "day");
      expect(date.locale()).toBe("de");
    });
  });

  describe("Edge cases", () => {
    it("should handle setting same locale multiple times", () => {
      const date = fdu().locale("es").locale("es");
      expect(date.locale()).toBe("es");
    });

    it("should handle switching between locales", () => {
      const date1 = fdu().locale("es");
      const date2 = date1.locale("fr");
      const date3 = date2.locale("de");

      expect(date1.locale()).toBe("es");
      expect(date2.locale()).toBe("fr");
      expect(date3.locale()).toBe("de");
    });

    it("should handle unregistered locale names", () => {
      const date = fdu().locale("nonexistent");
      expect(date.locale()).toBe("nonexistent");
    });
  });
});
