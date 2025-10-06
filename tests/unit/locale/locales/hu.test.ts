import { describe, expect, it } from "vitest";
import { hu } from "@/locale/locales/hu";

describe("hu locale", () => {
  it("should have correct name", () => {
    expect(hu.name).toBe("hu");
  });

  it("should have 12 months", () => {
    expect(hu.months).toHaveLength(12);
    expect(hu.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(hu.weekdays).toHaveLength(7);
    expect(hu.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
