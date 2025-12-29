import { describe, expect, it } from "vitest";
import { ar } from "@/locale/locales/ar";

describe("ar locale", () => {
  it("should have correct name", () => {
    expect(ar.name).toBe("ar");
  });

  it("should have 12 months", () => {
    expect(ar.months).toHaveLength(12);
    expect(ar.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(ar.weekdays).toHaveLength(7);
    expect(ar.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
