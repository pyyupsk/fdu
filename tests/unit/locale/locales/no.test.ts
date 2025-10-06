import { describe, expect, it } from "vitest";
import { no } from "@/locale/locales/no";

describe("no locale", () => {
  it("should have correct name", () => {
    expect(no.name).toBe("no");
  });

  it("should have 12 months", () => {
    expect(no.months).toHaveLength(12);
    expect(no.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(no.weekdays).toHaveLength(7);
    expect(no.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
