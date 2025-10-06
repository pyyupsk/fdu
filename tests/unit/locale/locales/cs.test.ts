import { describe, expect, it } from "vitest";
import { cs } from "@/locale/locales/cs";

describe("cs locale", () => {
  it("should have correct name", () => {
    expect(cs.name).toBe("cs");
  });

  it("should have 12 months", () => {
    expect(cs.months).toHaveLength(12);
    expect(cs.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(cs.weekdays).toHaveLength(7);
    expect(cs.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
