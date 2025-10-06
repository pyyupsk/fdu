import { describe, expect, it } from "vitest";
import { ru } from "@/locale/locales/ru";

describe("ru locale", () => {
  it("should have correct name", () => {
    expect(ru.name).toBe("ru");
  });

  it("should have 12 months", () => {
    expect(ru.months).toHaveLength(12);
    expect(ru.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(ru.weekdays).toHaveLength(7);
    expect(ru.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
