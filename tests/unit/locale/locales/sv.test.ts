import { describe, expect, it } from "vitest";
import { sv } from "@/locale/locales/sv";

describe("sv locale", () => {
  it("should have correct name", () => {
    expect(sv.name).toBe("sv");
  });

  it("should have 12 months", () => {
    expect(sv.months).toHaveLength(12);
    expect(sv.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(sv.weekdays).toHaveLength(7);
    expect(sv.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
