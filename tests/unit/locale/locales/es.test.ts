import { describe, expect, it } from "vitest";
import { es } from "@/locale/locales/es";

describe("es locale", () => {
  it("should have correct name", () => {
    expect(es.name).toBe("es");
  });

  it("should have 12 months", () => {
    expect(es.months).toHaveLength(12);
    expect(es.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(es.weekdays).toHaveLength(7);
    expect(es.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
