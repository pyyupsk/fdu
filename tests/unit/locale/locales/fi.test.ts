import { describe, expect, it } from "vitest";
import { fi } from "@/locale/locales/fi";

describe("fi locale", () => {
  it("should have correct name", () => {
    expect(fi.name).toBe("fi");
  });

  it("should have 12 months", () => {
    expect(fi.months).toHaveLength(12);
    expect(fi.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(fi.weekdays).toHaveLength(7);
    expect(fi.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
