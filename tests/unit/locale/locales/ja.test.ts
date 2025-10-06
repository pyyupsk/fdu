import { describe, expect, it } from "vitest";
import { ja } from "@/locale/locales/ja";

describe("ja locale", () => {
  it("should have correct name", () => {
    expect(ja.name).toBe("ja");
  });

  it("should have 12 months", () => {
    expect(ja.months).toHaveLength(12);
    expect(ja.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(ja.weekdays).toHaveLength(7);
    expect(ja.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
