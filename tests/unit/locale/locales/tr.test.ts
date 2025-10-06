import { describe, expect, it } from "vitest";
import { tr } from "@/locale/locales/tr";

describe("tr locale", () => {
  it("should have correct name", () => {
    expect(tr.name).toBe("tr");
  });

  it("should have 12 months", () => {
    expect(tr.months).toHaveLength(12);
    expect(tr.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(tr.weekdays).toHaveLength(7);
    expect(tr.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
