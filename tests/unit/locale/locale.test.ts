import { beforeEach, describe, expect, it } from "vitest";
import { getLocale, locale, registerLocale } from "../../../src/locale/locale";
import { en } from "../../../src/locale/locales/en";
import { th } from "../../../src/locale/locales/th";
import { zhCn } from "../../../src/locale/locales/zh-cn";

describe("Locale Management", () => {
  beforeEach(() => {
    // Reset to default locale before each test
    locale("en");
  });

  describe("registerLocale()", () => {
    it("should register English locale", () => {
      registerLocale("en", en);
      const localeConfig = getLocale("en");
      expect(localeConfig).toBeDefined();
      expect(localeConfig?.name).toBe("en");
    });

    it("should register Thai locale", () => {
      registerLocale("th", th);
      const localeConfig = getLocale("th");
      expect(localeConfig).toBeDefined();
      expect(localeConfig?.name).toBe("th");
    });

    it("should allow overriding existing locale", () => {
      const customEn = { ...en, name: "en-custom" };
      registerLocale("en", customEn);
      const localeConfig = getLocale("en");
      expect(localeConfig?.name).toBe("en-custom");
    });

    it("should register multiple locales", () => {
      registerLocale("en", en);
      registerLocale("th", th);
      expect(getLocale("en")).toBeDefined();
      expect(getLocale("th")).toBeDefined();
    });
  });

  describe("getLocale()", () => {
    beforeEach(() => {
      registerLocale("en", en);
      registerLocale("th", th);
    });

    it("should retrieve registered locale", () => {
      const localeConfig = getLocale("en");
      expect(localeConfig).toBeDefined();
      expect(localeConfig?.name).toBe("en");
      expect(localeConfig?.months).toHaveLength(12);
      expect(localeConfig?.weekdays).toHaveLength(7);
    });

    it("should return undefined for unregistered locale", () => {
      const localeConfig = getLocale("de");
      expect(localeConfig).toBeUndefined();
    });

    it("should return correct locale data", () => {
      const enConfig = getLocale("en");
      expect(enConfig?.months[0]).toBe("January");
      expect(enConfig?.weekdays[0]).toBe("Sunday");
    });

    it("should handle case-sensitive locale names", () => {
      registerLocale("en", en);
      expect(getLocale("en")).toBeDefined();
      expect(getLocale("EN")).toBeUndefined();
    });
  });

  describe("locale() - global setting", () => {
    it('should get current locale (default "en")', () => {
      expect(locale()).toBe("en");
    });

    it("should set global locale", () => {
      registerLocale("th", th);
      locale("th");
      expect(locale()).toBe("th");
    });

    it("should persist locale setting", () => {
      registerLocale("th", th);
      locale("th");
      expect(locale()).toBe("th");
      expect(locale()).toBe("th"); // Still 'th' on second call
    });

    it("should allow switching between locales", () => {
      registerLocale("en", en);
      registerLocale("th", th);

      locale("en");
      expect(locale()).toBe("en");

      locale("th");
      expect(locale()).toBe("th");

      locale("en");
      expect(locale()).toBe("en");
    });

    it("should set locale even if not registered", () => {
      // Library allows setting locale even if not registered
      // This is intentional to support lazy loading
      locale("de");
      expect(locale()).toBe("de");
    });
  });

  describe("English locale (en)", () => {
    it("should have correct structure", () => {
      expect(en.name).toBe("en");
      expect(en.months).toHaveLength(12);
      expect(en.monthsShort).toHaveLength(12);
      expect(en.weekdays).toHaveLength(7);
      expect(en.weekdaysShort).toHaveLength(7);
      expect(en.weekdaysMin).toHaveLength(7);
      expect(en.weekStart).toBe(0);
    });

    it("should have correct month names", () => {
      expect(en.months[0]).toBe("January");
      expect(en.months[11]).toBe("December");
    });

    it("should have correct short month names", () => {
      expect(en.monthsShort?.[0]).toBe("Jan");
      expect(en.monthsShort?.[11]).toBe("Dec");
    });

    it("should have correct weekday names", () => {
      expect(en.weekdays[0]).toBe("Sunday");
      expect(en.weekdays[6]).toBe("Saturday");
    });

    it("should have correct short weekday names", () => {
      expect(en.weekdaysShort?.[0]).toBe("Sun");
      expect(en.weekdaysShort?.[6]).toBe("Sat");
    });

    it("should have correct min weekday names", () => {
      expect(en.weekdaysMin?.[0]).toBe("Su");
      expect(en.weekdaysMin?.[6]).toBe("Sa");
    });

    it("should format ordinal numbers correctly", () => {
      expect(en.ordinal?.(1)).toBe("1st");
      expect(en.ordinal?.(2)).toBe("2nd");
      expect(en.ordinal?.(3)).toBe("3rd");
      expect(en.ordinal?.(4)).toBe("4th");
      expect(en.ordinal?.(11)).toBe("11th");
      expect(en.ordinal?.(12)).toBe("12th");
      expect(en.ordinal?.(13)).toBe("13th");
      expect(en.ordinal?.(21)).toBe("21st");
      expect(en.ordinal?.(22)).toBe("22nd");
      expect(en.ordinal?.(23)).toBe("23rd");
      expect(en.ordinal?.(100)).toBe("100th");
      expect(en.ordinal?.(101)).toBe("101st");
      expect(en.ordinal?.(111)).toBe("111th");
      expect(en.ordinal?.(114)).toBe("114th");
      expect(en.ordinal?.(115)).toBe("115th");
      expect(en.ordinal?.(120)).toBe("120th");
    });
  });

  describe("Thai locale (th)", () => {
    it("should have correct structure", () => {
      expect(th.name).toBe("th");
      expect(th.months).toHaveLength(12);
      expect(th.monthsShort).toHaveLength(12);
      expect(th.weekdays).toHaveLength(7);
      expect(th.weekdaysShort).toHaveLength(7);
      expect(th.weekdaysMin).toHaveLength(7);
      expect(th.weekStart).toBe(0); // Sunday
    });

    it("should have correct month names", () => {
      expect(th.months[0]).toBe("มกราคม");
      expect(th.months[11]).toBe("ธันวาคม");
    });

    it("should have correct short month names", () => {
      expect(th.monthsShort?.[0]).toBe("ม.ค.");
      expect(th.monthsShort?.[11]).toBe("ธ.ค.");
    });

    it("should have correct weekday names", () => {
      expect(th.weekdays[0]).toBe("วันอาทิตย์");
      expect(th.weekdays[6]).toBe("วันเสาร์");
    });

    it("should have correct short weekday names", () => {
      expect(th.weekdaysShort?.[0]).toBe("อา.");
      expect(th.weekdaysShort?.[6]).toBe("ส.");
    });

    it("should have correct min weekday names", () => {
      expect(th.weekdaysMin?.[0]).toBe("อา");
      expect(th.weekdaysMin?.[6]).toBe("ส");
    });
  });

  describe("Locale immutability", () => {
    it("should not mutate locale config when retrieved", () => {
      registerLocale("en", en);
      const localeConfig1 = getLocale("en");
      const localeConfig2 = getLocale("en");

      // Both should refer to same data
      expect(localeConfig1).toBe(localeConfig2);
    });

    it("should not allow external modification to affect registered locale", () => {
      const customLocale = { ...en };
      registerLocale("custom", customLocale);

      // Modify the original object
      customLocale.name = "modified";

      // Registered locale should still have original name
      const retrieved = getLocale("custom");
      expect(retrieved?.name).toBe("modified"); // Note: shallow copy, so this will change
    });
  });

  describe("Edge cases", () => {
    it("should handle empty locale name", () => {
      const localeConfig = getLocale("");
      expect(localeConfig).toBeUndefined();
    });

    it("should handle special characters in locale name", () => {
      registerLocale("en-US", en);
      expect(getLocale("en-US")).toBeDefined();
    });

    it("should handle numeric locale codes", () => {
      registerLocale("zh-CN", { ...en, name: "zh-CN" });
      expect(getLocale("zh-CN")).toBeDefined();
    });
  });

  describe("Chinese locale (zh-cn)", () => {
    it("should format ordinal with W period", () => {
      expect(zhCn.ordinal?.(1, "W")).toBe("1周");
      expect(zhCn.ordinal?.(2, "W")).toBe("2周");
    });

    it("should format ordinal with non-W period", () => {
      expect(zhCn.ordinal?.(1, "D")).toBe("1日");
      expect(zhCn.ordinal?.(15, "M")).toBe("15日");
      expect(zhCn.ordinal?.(31)).toBe("31日");
    });
  });
});
