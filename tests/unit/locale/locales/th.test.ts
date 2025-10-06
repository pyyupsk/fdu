import { describe, expect, it } from "vitest";
import { th } from "@/locale/locales/th";

describe("th locale", () => {
  it("should have correct name", () => {
    expect(th.name).toBe("th");
  });

  it("should have 12 months", () => {
    expect(th.months).toHaveLength(12);
    expect(th.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(th.weekdays).toHaveLength(7);
    expect(th.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
