import { describe, expect, it } from "vitest";
import { nl } from "@/locale/locales/nl";

describe("nl locale", () => {
  it("should have correct name", () => {
    expect(nl.name).toBe("nl");
  });

  it("should have 12 months", () => {
    expect(nl.months).toHaveLength(12);
    expect(nl.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(nl.weekdays).toHaveLength(7);
    expect(nl.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
