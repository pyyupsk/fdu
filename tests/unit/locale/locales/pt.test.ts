import { describe, expect, it } from "vitest";
import { pt } from "@/locale/locales/pt";

describe("pt locale", () => {
  it("should have correct name", () => {
    expect(pt.name).toBe("pt");
  });

  it("should have 12 months", () => {
    expect(pt.months).toHaveLength(12);
    expect(pt.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(pt.weekdays).toHaveLength(7);
    expect(pt.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
