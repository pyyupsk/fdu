import { describe, expect, it } from "vitest";
import { hi } from "@/locale/locales/hi";

describe("hi locale", () => {
  it("should have correct name", () => {
    expect(hi.name).toBe("hi");
  });

  it("should have 12 months", () => {
    expect(hi.months).toHaveLength(12);
    expect(hi.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(hi.weekdays).toHaveLength(7);
    expect(hi.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
