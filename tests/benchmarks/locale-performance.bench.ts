import dayjs from "dayjs";
import "dayjs/locale/de";
import "dayjs/locale/es";
import "dayjs/locale/fr";
import "dayjs/locale/ja";
import "dayjs/locale/ko";
import "dayjs/locale/pt";
import "dayjs/locale/ru";
import "dayjs/locale/zh-cn";
import { bench, describe } from "vitest";
import { fdu } from "../../src/core/datetime";
import { registerLocale } from "../../src/locale/locale";
import { de } from "../../src/locale/locales/de";
import { en } from "../../src/locale/locales/en";
import { es } from "../../src/locale/locales/es";
import { fr } from "../../src/locale/locales/fr";
import { ja } from "../../src/locale/locales/ja";
import { ko } from "../../src/locale/locales/ko";
import { pt } from "../../src/locale/locales/pt";
import { ru } from "../../src/locale/locales/ru";
import { zhCn } from "../../src/locale/locales/zh-cn";

// Register all fd locales before benchmarking
registerLocale("en", en);
registerLocale("es", es);
registerLocale("fr", fr);
registerLocale("de", de);
registerLocale("ja", ja);
registerLocale("ko", ko);
registerLocale("pt", pt);
registerLocale("ru", ru);
registerLocale("zh-cn", zhCn);

describe("fd vs Day.js: Locale Performance", () => {
  const testDate = "2025-01-15T10:30:00";

  describe("Locale Switching", () => {
    bench("fd: format with locale (es)", () => {
      fdu(testDate).locale("es").format("MMMM D, YYYY");
    });

    bench("Day.js: format with locale (es)", () => {
      dayjs(testDate).locale("es").format("MMMM D, YYYY");
    });

    bench("fd: format with locale (fr)", () => {
      fdu(testDate).locale("fr").format("MMMM D, YYYY");
    });

    bench("Day.js: format with locale (fr)", () => {
      dayjs(testDate).locale("fr").format("MMMM D, YYYY");
    });

    bench("fd: format with locale (de)", () => {
      fdu(testDate).locale("de").format("MMMM D, YYYY");
    });

    bench("Day.js: format with locale (de)", () => {
      dayjs(testDate).locale("de").format("MMMM D, YYYY");
    });

    bench("fd: format with locale (zh-cn)", () => {
      fdu(testDate).locale("zh-cn").format("MMMM D, YYYY");
    });

    bench("Day.js: format with locale (zh-cn)", () => {
      dayjs(testDate).locale("zh-cn").format("MMMM D, YYYY");
    });

    bench("fd: format with locale (ja)", () => {
      fdu(testDate).locale("ja").format("MMMM D, YYYY");
    });

    bench("Day.js: format with locale (ja)", () => {
      dayjs(testDate).locale("ja").format("MMMM D, YYYY");
    });
  });

  describe("Rapid Multi-Locale Switching", () => {
    bench("fd: switch between 5 locales", () => {
      fdu(testDate).locale("es").format("MMMM");
      fdu(testDate).locale("fr").format("MMMM");
      fdu(testDate).locale("de").format("MMMM");
      fdu(testDate).locale("ja").format("MMMM");
      fdu(testDate).locale("zh-cn").format("MMMM");
    });

    bench("Day.js: switch between 5 locales", () => {
      dayjs(testDate).locale("es").format("MMMM");
      dayjs(testDate).locale("fr").format("MMMM");
      dayjs(testDate).locale("de").format("MMMM");
      dayjs(testDate).locale("ja").format("MMMM");
      dayjs(testDate).locale("zh-cn").format("MMMM");
    });
  });

  describe("Format Tokens with Locales", () => {
    bench("fd: month tokens (MMMM/MMM)", () => {
      fdu(testDate).locale("es").format("MMMM MMM");
    });

    bench("Day.js: month tokens (MMMM/MMM)", () => {
      dayjs(testDate).locale("es").format("MMMM MMM");
    });

    bench("fd: weekday tokens (dddd/ddd)", () => {
      fdu(testDate).locale("es").format("dddd ddd");
    });

    bench("Day.js: weekday tokens (dddd/ddd)", () => {
      dayjs(testDate).locale("es").format("dddd ddd");
    });

    bench("fd: ordinal token (Do)", () => {
      fdu(testDate).locale("es").format("Do");
    });

    bench("Day.js: ordinal token (Do)", () => {
      dayjs(testDate).locale("es").format("Do");
    });

    bench("fd: complex format with locale", () => {
      fdu(testDate).locale("es").format("dddd, Do [de] MMMM [de] YYYY");
    });

    bench("Day.js: complex format with locale", () => {
      dayjs(testDate).locale("es").format("dddd, Do [de] MMMM [de] YYYY");
    });
  });

  describe("Chained Operations with Locale", () => {
    bench("fd: add with locale persistence", () => {
      fdu(testDate).locale("es").add(1, "month").format("MMMM");
    });

    bench("Day.js: add with locale persistence", () => {
      dayjs(testDate).locale("es").add(1, "month").format("MMMM");
    });

    bench("fd: chained operations with locale", () => {
      fdu(testDate)
        .locale("de")
        .add(1, "day")
        .add(2, "hour")
        .subtract(30, "minute")
        .format("dddd, D. MMMM YYYY HH:mm");
    });

    bench("Day.js: chained operations with locale", () => {
      dayjs(testDate)
        .locale("de")
        .add(1, "day")
        .add(2, "hour")
        .subtract(30, "minute")
        .format("dddd, D. MMMM YYYY HH:mm");
    });
  });

  describe("Locale-Specific Features", () => {
    bench("fd: Chinese meridiem (6 time periods)", () => {
      fdu("2025-01-15T08:30:00").locale("zh-cn").format("A h:mm");
    });

    bench("Day.js: Chinese meridiem", () => {
      dayjs("2025-01-15T08:30:00").locale("zh-cn").format("A h:mm");
    });

    bench("fd: English ordinal (multiple)", () => {
      fdu("2025-01-01").locale("en").format("Do");
      fdu("2025-01-02").locale("en").format("Do");
      fdu("2025-01-11").locale("en").format("Do");
      fdu("2025-01-21").locale("en").format("Do");
    });

    bench("Day.js: English ordinal (multiple)", () => {
      dayjs("2025-01-01").locale("en").format("Do");
      dayjs("2025-01-02").locale("en").format("Do");
      dayjs("2025-01-11").locale("en").format("Do");
      dayjs("2025-01-21").locale("en").format("Do");
    });

    bench("fd: Japanese meridiem", () => {
      fdu("2025-01-15T08:30:00").locale("ja").format("A h:mm");
    });

    bench("Day.js: Japanese meridiem", () => {
      dayjs("2025-01-15T08:30:00").locale("ja").format("A h:mm");
    });
  });

  describe("High-Volume Operations", () => {
    bench("fd: 100 formats with locale switching", () => {
      const locales: ("es" | "fr" | "de" | "ja" | "zh-cn")[] = [
        "es",
        "fr",
        "de",
        "ja",
        "zh-cn",
      ];
      for (let i = 0; i < 100; i++) {
        const locale = locales[i % 5] as "es" | "fr" | "de" | "ja" | "zh-cn";
        fdu(testDate).locale(locale).format("MMMM");
      }
    });

    bench("Day.js: 100 formats with locale switching", () => {
      const locales = ["es", "fr", "de", "ja", "zh-cn"];
      for (let i = 0; i < 100; i++) {
        const locale = locales[i % 5] as "es" | "fr" | "de" | "ja" | "zh-cn";
        dayjs(testDate).locale(locale).format("MMMM");
      }
    });
  });

  describe("Baseline (No Locale)", () => {
    bench("fd: format without locale", () => {
      fdu(testDate).format("YYYY-MM-DD HH:mm:ss");
    });

    bench("Day.js: format without locale", () => {
      dayjs(testDate).format("YYYY-MM-DD HH:mm:ss");
    });
  });
});
