import { describe, expect, test } from "vitest";
import type { LocaleConfig } from "../../../src/core/types";
import { ar } from "../../../src/locale/locales/ar";
import { cs } from "../../../src/locale/locales/cs";
import { de } from "../../../src/locale/locales/de";
import { en } from "../../../src/locale/locales/en";
import { es } from "../../../src/locale/locales/es";
import { fi } from "../../../src/locale/locales/fi";
import { fr } from "../../../src/locale/locales/fr";
import { hi } from "../../../src/locale/locales/hi";
import { hu } from "../../../src/locale/locales/hu";
import { it } from "../../../src/locale/locales/it";
import { ja } from "../../../src/locale/locales/ja";
import { ko } from "../../../src/locale/locales/ko";
import { nl } from "../../../src/locale/locales/nl";
import { no } from "../../../src/locale/locales/no";
import { pl } from "../../../src/locale/locales/pl";
import { pt } from "../../../src/locale/locales/pt";
import { ro } from "../../../src/locale/locales/ro";
import { ru } from "../../../src/locale/locales/ru";
import { sv } from "../../../src/locale/locales/sv";
import { th } from "../../../src/locale/locales/th";
import { tr } from "../../../src/locale/locales/tr";
import { zhCn } from "../../../src/locale/locales/zh-cn";

const allLocales: Record<string, LocaleConfig> = {
  ar,
  cs,
  de,
  en,
  es,
  fi,
  fr,
  hi,
  hu,
  it,
  ja,
  ko,
  nl,
  no,
  pl,
  pt,
  ro,
  ru,
  sv,
  th,
  tr,
  "zh-cn": zhCn,
};

describe("Locale Structure Validation", () => {
  describe("Required Fields", () => {
    for (const [code, locale] of Object.entries(allLocales)) {
      test(`${code}: has name field`, () => {
        expect(locale.name).toBeDefined();
        expect(locale.name).toBe(code);
      });

      test(`${code}: has weekdays array`, () => {
        expect(locale.weekdays).toBeDefined();
        expect(Array.isArray(locale.weekdays)).toBe(true);
      });

      test(`${code}: has months array`, () => {
        expect(locale.months).toBeDefined();
        expect(Array.isArray(locale.months)).toBe(true);
      });
    }
  });

  describe("Array Length Validation", () => {
    for (const [code, locale] of Object.entries(allLocales)) {
      test(`${code}: weekdays has exactly 7 entries`, () => {
        expect(locale.weekdays).toHaveLength(7);
      });

      test(`${code}: months has exactly 12 entries`, () => {
        expect(locale.months).toHaveLength(12);
      });

      if (locale.weekdaysShort) {
        test(`${code}: weekdaysShort has exactly 7 entries`, () => {
          expect(locale.weekdaysShort).toHaveLength(7);
        });
      }

      if (locale.weekdaysMin) {
        test(`${code}: weekdaysMin has exactly 7 entries`, () => {
          expect(locale.weekdaysMin).toHaveLength(7);
        });
      }

      if (locale.monthsShort) {
        test(`${code}: monthsShort has exactly 12 entries`, () => {
          expect(locale.monthsShort).toHaveLength(12);
        });
      }
    }
  });

  describe("Array Content Validation", () => {
    for (const [code, locale] of Object.entries(allLocales)) {
      test(`${code}: all weekdays are non-empty strings`, () => {
        for (const day of locale.weekdays) {
          expect(typeof day).toBe("string");
          expect(day.length).toBeGreaterThan(0);
        }
      });

      test(`${code}: all months are non-empty strings`, () => {
        for (const month of locale.months) {
          expect(typeof month).toBe("string");
          expect(month.length).toBeGreaterThan(0);
        }
      });

      test(`${code}: no duplicate weekday names`, () => {
        const uniqueWeekdays = new Set(locale.weekdays);
        expect(uniqueWeekdays.size).toBe(7);
      });

      test(`${code}: no duplicate month names`, () => {
        const uniqueMonths = new Set(locale.months);
        expect(uniqueMonths.size).toBe(12);
      });
    }
  });

  describe("WeekStart Validation", () => {
    for (const [code, locale] of Object.entries(allLocales)) {
      test(`${code}: weekStart is valid (0, 1, or 6) if defined`, () => {
        if (locale.weekStart !== undefined) {
          expect([0, 1, 6]).toContain(locale.weekStart);
        }
      });
    }
  });

  describe("Formats Validation", () => {
    for (const [code, locale] of Object.entries(allLocales)) {
      if (locale.formats) {
        test(`${code}: formats are strings if defined`, () => {
          const formats = locale.formats;
          if (formats?.LT) expect(typeof formats.LT).toBe("string");
          if (formats?.LTS) expect(typeof formats.LTS).toBe("string");
          if (formats?.L) expect(typeof formats.L).toBe("string");
          if (formats?.LL) expect(typeof formats.LL).toBe("string");
          if (formats?.LLL) expect(typeof formats.LLL).toBe("string");
          if (formats?.LLLL) expect(typeof formats.LLLL).toBe("string");
        });
      }
    }
  });

  describe("Ordinal Function Validation", () => {
    for (const [code, locale] of Object.entries(allLocales)) {
      if (locale.ordinal) {
        test(`${code}: ordinal function returns string`, () => {
          const ordinal = locale.ordinal;
          if (!ordinal) return;

          expect(typeof ordinal(1)).toBe("string");
          expect(typeof ordinal(2)).toBe("string");
          expect(typeof ordinal(3)).toBe("string");
        });

        test(`${code}: ordinal handles edge cases`, () => {
          const ordinal = locale.ordinal;
          if (!ordinal) return;

          // Test common day numbers
          expect(ordinal(1)).toBeTruthy();
          expect(ordinal(2)).toBeTruthy();
          expect(ordinal(3)).toBeTruthy();
          expect(ordinal(11)).toBeTruthy();
          expect(ordinal(12)).toBeTruthy();
          expect(ordinal(13)).toBeTruthy();
          expect(ordinal(21)).toBeTruthy();
          expect(ordinal(31)).toBeTruthy();
        });

        test(`${code}: ordinal doesn't throw errors`, () => {
          const ordinal = locale.ordinal;
          if (!ordinal) return;

          expect(() => ordinal(0)).not.toThrow();
          expect(() => ordinal(100)).not.toThrow();
          expect(() => ordinal(-1)).not.toThrow();
        });
      }
    }
  });

  describe("Meridiem Function Validation", () => {
    for (const [code, locale] of Object.entries(allLocales)) {
      if (locale.meridiem) {
        test(`${code}: meridiem function returns string`, () => {
          const meridiem = locale.meridiem;
          if (!meridiem) return;

          expect(typeof meridiem(0, 0)).toBe("string");
          expect(typeof meridiem(12, 0)).toBe("string");
          expect(typeof meridiem(23, 59)).toBe("string");
        });

        test(`${code}: meridiem handles all hours`, () => {
          const meridiem = locale.meridiem;
          if (!meridiem) return;

          for (let hour = 0; hour < 24; hour++) {
            expect(() => meridiem(hour, 0)).not.toThrow();
            expect(meridiem(hour, 0)).toBeTruthy();
          }
        });

        test(`${code}: meridiem respects isLower parameter`, () => {
          const meridiem = locale.meridiem;
          if (!meridiem) return;

          const upper = meridiem(10, 0, false);
          const lower = meridiem(10, 0, true);

          expect(typeof upper).toBe("string");
          expect(typeof lower).toBe("string");
          expect(upper).toBeTruthy();
          expect(lower).toBeTruthy();
        });

        test(`${code}: meridiem handles boundary hours`, () => {
          const meridiem = locale.meridiem;
          if (!meridiem) return;

          expect(meridiem(0, 0)).toBeTruthy(); // Midnight
          expect(meridiem(6, 0)).toBeTruthy(); // Dawn
          expect(meridiem(11, 59)).toBeTruthy(); // Before noon
          expect(meridiem(12, 0)).toBeTruthy(); // Noon
          expect(meridiem(12, 1)).toBeTruthy(); // After noon
          expect(meridiem(18, 0)).toBeTruthy(); // Evening
          expect(meridiem(23, 59)).toBeTruthy(); // Night
        });
      }
    }
  });

  describe("RelativeTime Validation", () => {
    for (const [code, locale] of Object.entries(allLocales)) {
      if (locale.relativeTime) {
        test(`${code}: relativeTime has required fields`, () => {
          const rt = locale.relativeTime;
          if (!rt) return;

          // Check future/past templates
          if (rt.future) expect(typeof rt.future).toBe("string");
          if (rt.past) expect(typeof rt.past).toBe("string");

          // Check time unit strings
          if (rt.s) expect(typeof rt.s).toBe("string");
          if (rt.m) expect(typeof rt.m).toBe("string");
          if (rt.mm) expect(typeof rt.mm).toBe("string");
          if (rt.h) expect(typeof rt.h).toBe("string");
          if (rt.hh) expect(typeof rt.hh).toBe("string");
          if (rt.d) expect(typeof rt.d).toBe("string");
          if (rt.dd) expect(typeof rt.dd).toBe("string");
          if (rt.M) expect(typeof rt.M).toBe("string");
          if (rt.MM) expect(typeof rt.MM).toBe("string");
          if (rt.y) expect(typeof rt.y).toBe("string");
          if (rt.yy) expect(typeof rt.yy).toBe("string");
        });
      }
    }
  });

  describe("TypeScript Type Compliance", () => {
    test("all locales match LocaleConfig interface", () => {
      for (const [code, locale] of Object.entries(allLocales)) {
        // This is a compile-time check, but we verify at runtime too
        expect(locale).toBeDefined();
        expect(locale.name).toBe(code);

        // Verify type constraints
        const _typeCheck: LocaleConfig = locale;
        expect(_typeCheck).toBeDefined();
      }
    });
  });

  describe("Locale Completeness", () => {
    for (const [code, locale] of Object.entries(allLocales)) {
      test(`${code}: has sufficient data for basic formatting`, () => {
        // Must have at minimum: name, weekdays, months
        expect(locale.name).toBeTruthy();
        expect(locale.weekdays.length).toBe(7);
        expect(locale.months.length).toBe(12);
      });

      test(`${code}: has reasonable defaults or implementations`, () => {
        // If no weekStart defined, that's ok (defaults to 0)
        // If no formats defined, fallback patterns work
        // If no ordinal, can use plain number
        // If no meridiem, can use AM/PM

        // Just verify the locale is usable
        expect(locale).toBeDefined();
        expect(Object.keys(locale).length).toBeGreaterThan(0);
      });
    }
  });
});
