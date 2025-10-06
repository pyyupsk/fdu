import { describe, expect, it } from "vitest";
import { en } from "@/locale/locales/en";

describe("en locale", () => {
  it("should have correct name", () => {
    expect(en.name).toBe("en");
  });

  it("should have 12 months", () => {
    expect(en.months).toHaveLength(12);
    expect(en.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(en.weekdays).toHaveLength(7);
    expect(en.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
