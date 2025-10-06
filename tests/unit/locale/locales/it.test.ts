import { describe, expect, it } from "vitest";
import { it as itLocale } from "@/locale/locales/it";

describe("it locale", () => {
  it("should have correct name", () => {
    expect(itLocale.name).toBe("it");
  });

  it("should have 12 months", () => {
    expect(itLocale.months).toHaveLength(12);
    expect(itLocale.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(itLocale.weekdays).toHaveLength(7);
    expect(itLocale.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
