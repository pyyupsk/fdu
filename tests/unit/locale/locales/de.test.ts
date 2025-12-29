import { describe, expect, it } from "vitest";
import { de } from "@/locale/locales/de";

describe("de locale", () => {
  it("should have correct name", () => {
    expect(de.name).toBe("de");
  });

  it("should have 12 months", () => {
    expect(de.months).toHaveLength(12);
    expect(de.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(de.weekdays).toHaveLength(7);
    expect(de.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
