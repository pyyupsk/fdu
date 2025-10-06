import { describe, expect, it } from "vitest";
import { ro } from "@/locale/locales/ro";

describe("ro locale", () => {
  it("should have correct name", () => {
    expect(ro.name).toBe("ro");
  });

  it("should have 12 months", () => {
    expect(ro.months).toHaveLength(12);
    expect(ro.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(ro.weekdays).toHaveLength(7);
    expect(ro.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
