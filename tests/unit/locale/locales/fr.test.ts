import { describe, expect, it } from "vitest";
import { fr } from "@/locale/locales/fr";

describe("fr locale", () => {
  it("should have correct name", () => {
    expect(fr.name).toBe("fr");
  });

  it("should have 12 months", () => {
    expect(fr.months).toHaveLength(12);
    expect(fr.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(fr.weekdays).toHaveLength(7);
    expect(fr.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
