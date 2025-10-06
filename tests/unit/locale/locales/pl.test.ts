import { describe, expect, it } from "vitest";
import { pl } from "@/locale/locales/pl";

describe("pl locale", () => {
  it("should have correct name", () => {
    expect(pl.name).toBe("pl");
  });

  it("should have 12 months", () => {
    expect(pl.months).toHaveLength(12);
    expect(pl.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(pl.weekdays).toHaveLength(7);
    expect(pl.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
