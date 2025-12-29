import { en } from "@pyyupsk/fdu/locale/en";
import { describe, expect, it } from "vitest";
import { tokens } from "@/format/tokens";

describe("Format Tokens", () => {
  const testDate = new Date("2025-09-30T14:35:45.123Z");

  describe("Year tokens", () => {
    it("YYYY should return full year", () => {
      expect(tokens.YYYY(testDate, undefined)).toBe("2025");
    });

    it("YY should return 2-digit year", () => {
      expect(tokens.YY(testDate, undefined)).toBe("25");
    });

    it("should handle year 2000 edge case", () => {
      const date = new Date("2000-01-01");
      expect(tokens.YYYY(date, undefined)).toBe("2000");
      expect(tokens.YY(date, undefined)).toBe("00");
    });

    it("should handle 3-digit years", () => {
      const date = new Date("0099-01-01");
      expect(tokens.YYYY(date, undefined)).toBe("99");
      expect(tokens.YY(date, undefined)).toBe("99");
    });
  });

  describe("Month tokens", () => {
    it("MMMM should return full month name with locale", () => {
      expect(tokens.MMMM(testDate, en)).toBe("September");
    });

    it("MMMM should fallback to number without locale", () => {
      const result = tokens.MMMM(testDate, undefined);
      expect(result).toMatch(/^(9|September)$/);
    });

    it("MMM should return short month name with locale", () => {
      expect(tokens.MMM(testDate, en)).toBe("Sep");
    });

    it("MMM should fallback to number without locale", () => {
      const result = tokens.MMM(testDate, undefined);
      expect(result).toMatch(/^(9|Sep)$/);
    });

    it("MM should return zero-padded month", () => {
      expect(tokens.MM(testDate)).toBe("09");
    });

    it("M should return month without padding", () => {
      expect(tokens.M(testDate)).toBe("9");
    });

    it("should handle January (month 0)", () => {
      const date = new Date("2025-01-15");
      expect(tokens.MM(date)).toBe("01");
      expect(tokens.M(date)).toBe("1");
    });

    it("should handle December (month 11)", () => {
      const date = new Date("2025-12-15");
      expect(tokens.MM(date)).toBe("12");
      expect(tokens.M(date)).toBe("12");
    });
  });

  describe("Day tokens", () => {
    it("DD should return zero-padded day", () => {
      expect(tokens.DD(testDate)).toBe("30");
    });

    it("D should return day without padding", () => {
      expect(tokens.D(testDate)).toBe("30");
    });

    it("Do should return ordinal day with locale", () => {
      expect(tokens.Do(testDate, en)).toContain("30");
    });

    it("Do should return plain number without locale", () => {
      const result = tokens.Do(testDate, undefined);
      expect(result).toBe("30");
    });

    it("Do should handle edge cases in ordinal function", () => {
      // Test edge cases for en.ts ordinal function line 56
      const date1 = new Date("2025-09-01"); // 1st
      const date2 = new Date("2025-09-02"); // 2nd
      const date3 = new Date("2025-09-03"); // 3rd
      const date4 = new Date("2025-09-04"); // 4th
      const date10 = new Date("2025-09-10"); // 10th
      const date11 = new Date("2025-01-11"); // 11th (special case)
      const date12 = new Date("2025-01-12"); // 12th (special case)
      const date13 = new Date("2025-01-13"); // 13th (special case)
      const date14 = new Date("2025-01-14"); // 14th
      const date20 = new Date("2025-01-20"); // 20th
      const date21 = new Date("2025-01-21"); // 21st
      const date22 = new Date("2025-01-22"); // 22nd
      const date23 = new Date("2025-01-23"); // 23rd
      const date24 = new Date("2025-01-24"); // 24th
      const date30 = new Date("2025-09-30"); // 30th
      const date31 = new Date("2025-01-31"); // 31st

      expect(tokens.Do(date1, en)).toBe("1st");
      expect(tokens.Do(date2, en)).toBe("2nd");
      expect(tokens.Do(date3, en)).toBe("3rd");
      expect(tokens.Do(date4, en)).toBe("4th");
      expect(tokens.Do(date10, en)).toBe("10th");
      expect(tokens.Do(date11, en)).toBe("11th");
      expect(tokens.Do(date12, en)).toBe("12th");
      expect(tokens.Do(date13, en)).toBe("13th");
      expect(tokens.Do(date14, en)).toBe("14th");
      expect(tokens.Do(date20, en)).toBe("20th");
      expect(tokens.Do(date21, en)).toBe("21st");
      expect(tokens.Do(date22, en)).toBe("22nd");
      expect(tokens.Do(date23, en)).toBe("23rd");
      expect(tokens.Do(date24, en)).toBe("24th");
      expect(tokens.Do(date30, en)).toBe("30th");
      expect(tokens.Do(date31, en)).toBe("31st");
    });

    it("should handle single-digit days", () => {
      const date = new Date("2025-09-05");
      expect(tokens.DD(date)).toBe("05");
      expect(tokens.D(date)).toBe("5");
    });

    it("should handle first day of month", () => {
      const date = new Date("2025-09-01");
      expect(tokens.DD(date)).toBe("01");
      expect(tokens.D(date)).toBe("1");
    });
  });

  describe("Weekday tokens", () => {
    it("dddd should return full weekday name with locale", () => {
      const result = tokens.dddd(testDate, en);
      expect(en.weekdays).toContain(result);
    });

    it("dddd should fallback to number without locale", () => {
      const result = tokens.dddd(testDate, undefined);
      expect(result).toMatch(/^\d$/);
    });

    it("ddd should return short weekday name with locale", () => {
      const result = tokens.ddd(testDate, en);
      expect(en.weekdaysShort).toContain(result);
    });

    it("ddd should fallback to number without locale", () => {
      const result = tokens.ddd(testDate, undefined);
      expect(result).toMatch(/^\d$/);
    });

    it("dd should return min weekday name with locale", () => {
      const result = tokens.dd(testDate, en);
      expect(en.weekdaysMin).toContain(result);
    });

    it("dd should fallback to number without locale", () => {
      const result = tokens.dd(testDate, undefined);
      expect(result).toMatch(/^\d$/);
    });

    it("d should return weekday number (0-6)", () => {
      const result = tokens.d(testDate);
      const day = parseInt(result, 10);
      expect(day).toBeGreaterThanOrEqual(0);
      expect(day).toBeLessThan(7);
    });

    it("should handle Sunday (day 0)", () => {
      const sunday = new Date("2025-10-05"); // A Sunday
      expect(tokens.d(sunday)).toBe("0");
      expect(tokens.dddd(sunday, en)).toBe("Sunday");
    });

    it("should handle Saturday (day 6)", () => {
      const saturday = new Date("2025-10-04"); // A Saturday
      expect(tokens.d(saturday)).toBe("6");
      expect(tokens.dddd(saturday, en)).toBe("Saturday");
    });
  });

  describe("Hour tokens", () => {
    it("HH should return zero-padded 24-hour", () => {
      const result = tokens.HH(testDate);
      expect(result).toMatch(/^\d{2}$/);
    });

    it("H should return 24-hour without padding", () => {
      const result = tokens.H(testDate);
      expect(result).toMatch(/^\d{1,2}$/);
    });

    it("hh should return zero-padded 12-hour", () => {
      const result = tokens.hh(testDate);
      expect(result).toMatch(/^\d{2}$/);
      const hour = parseInt(result, 10);
      expect(hour).toBeGreaterThanOrEqual(1);
      expect(hour).toBeLessThanOrEqual(12);
    });

    it("h should return 12-hour without padding", () => {
      const result = tokens.h(testDate);
      expect(result).toMatch(/^\d{1,2}$/);
      const hour = parseInt(result, 10);
      expect(hour).toBeGreaterThanOrEqual(1);
      expect(hour).toBeLessThanOrEqual(12);
    });

    it("should handle midnight (00:00)", () => {
      const midnight = new Date("2025-09-30T00:00:00");
      expect(tokens.HH(midnight)).toBe("00");
      expect(tokens.H(midnight)).toBe("0");
      expect(tokens.hh(midnight)).toBe("12");
      expect(tokens.h(midnight)).toBe("12");
    });

    it("should handle noon (12:00)", () => {
      const noon = new Date("2025-09-30T12:00:00");
      expect(tokens.HH(noon)).toBe("12");
      expect(tokens.H(noon)).toBe("12");
      expect(tokens.hh(noon)).toBe("12");
      expect(tokens.h(noon)).toBe("12");
    });
  });

  describe("Minute tokens", () => {
    it("mm should return zero-padded minutes", () => {
      const result = tokens.mm(testDate);
      expect(result).toMatch(/^\d{2}$/);
    });

    it("m should return minutes without padding", () => {
      const result = tokens.m(testDate);
      expect(result).toMatch(/^\d{1,2}$/);
    });

    it("should handle zero minutes", () => {
      const date = new Date("2025-09-30T14:00:00");
      expect(tokens.mm(date)).toBe("00");
      expect(tokens.m(date)).toBe("0");
    });

    it("should handle single-digit minutes", () => {
      const date = new Date("2025-09-30T14:05:00");
      expect(tokens.mm(date)).toBe("05");
      expect(tokens.m(date)).toBe("5");
    });
  });

  describe("Second tokens", () => {
    it("ss should return zero-padded seconds", () => {
      const result = tokens.ss(testDate);
      expect(result).toMatch(/^\d{2}$/);
    });

    it("s should return seconds without padding", () => {
      const result = tokens.s(testDate);
      expect(result).toMatch(/^\d{1,2}$/);
    });

    it("should handle zero seconds", () => {
      const date = new Date("2025-09-30T14:35:00");
      expect(tokens.ss(date)).toBe("00");
      expect(tokens.s(date)).toBe("0");
    });

    it("should handle single-digit seconds", () => {
      const date = new Date("2025-09-30T14:35:05");
      expect(tokens.ss(date)).toBe("05");
      expect(tokens.s(date)).toBe("5");
    });
  });

  describe("Millisecond tokens", () => {
    it("SSS should return zero-padded milliseconds", () => {
      expect(tokens.SSS(testDate)).toBe("123");
    });

    it("should handle zero milliseconds", () => {
      const date = new Date("2025-09-30T14:35:45.000");
      expect(tokens.SSS(date)).toBe("000");
    });

    it("should handle single-digit milliseconds", () => {
      const date = new Date("2025-09-30T14:35:45.005");
      expect(tokens.SSS(date)).toBe("005");
    });

    it("should handle double-digit milliseconds", () => {
      const date = new Date("2025-09-30T14:35:45.050");
      expect(tokens.SSS(date)).toBe("050");
    });
  });

  describe("AM/PM tokens", () => {
    it("A should return uppercase AM/PM", () => {
      const am = new Date("2025-09-30T10:00:00");
      const pm = new Date("2025-09-30T14:00:00");
      expect(tokens.A(am, undefined)).toBe("AM");
      expect(tokens.A(pm, undefined)).toBe("PM");
    });

    it("a should return lowercase am/pm", () => {
      const am = new Date("2025-09-30T10:00:00");
      const pm = new Date("2025-09-30T14:00:00");
      expect(tokens.a(am, undefined)).toBe("am");
      expect(tokens.a(pm, undefined)).toBe("pm");
    });

    it("should handle midnight as AM", () => {
      const midnight = new Date("2025-09-30T00:00:00");
      expect(tokens.A(midnight, undefined)).toBe("AM");
      expect(tokens.a(midnight, undefined)).toBe("am");
    });

    it("should handle noon as PM", () => {
      const noon = new Date("2025-09-30T12:00:00");
      expect(tokens.A(noon, undefined)).toBe("PM");
      expect(tokens.a(noon, undefined)).toBe("pm");
    });

    it("A should use locale meridiem when available", () => {
      const localeWithMeridiem = {
        ...en,
        meridiem: (hour: number, _minute: number, isLowercase?: boolean) => {
          if (isLowercase) return "custom-am";
          return hour < 12 ? "CUSTOM-AM" : "CUSTOM-PM";
        },
      };
      const am = new Date("2025-09-30T10:00:00");
      const pm = new Date("2025-09-30T14:00:00");
      expect(tokens.A(am, localeWithMeridiem)).toBe("CUSTOM-AM");
      expect(tokens.A(pm, localeWithMeridiem)).toBe("CUSTOM-PM");
    });

    it("a should use locale meridiem when available", () => {
      const localeWithMeridiem = {
        ...en,
        meridiem: (hour: number, _minute: number, isLowercase?: boolean) => {
          if (isLowercase) return hour < 12 ? "custom-am" : "custom-pm";
          return "CUSTOM";
        },
      };
      const am = new Date("2025-09-30T10:00:00");
      const pm = new Date("2025-09-30T14:00:00");
      expect(tokens.a(am, localeWithMeridiem)).toBe("custom-am");
      expect(tokens.a(pm, localeWithMeridiem)).toBe("custom-pm");
    });
  });
});
