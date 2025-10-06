import { describe, expect, it } from "vitest";
import { normalizeUnit } from "@/utils/units";

describe("normalizeUnit", () => {
  it("should normalize year units", () => {
    expect(normalizeUnit("year")).toBe("year");
    expect(normalizeUnit("y")).toBe("year");
  });

  it("should normalize month units", () => {
    expect(normalizeUnit("month")).toBe("month");
    expect(normalizeUnit("M")).toBe("month");
  });

  it("should normalize week units", () => {
    expect(normalizeUnit("week")).toBe("week");
    expect(normalizeUnit("w")).toBe("week");
  });

  it("should normalize day units", () => {
    expect(normalizeUnit("day")).toBe("day");
    expect(normalizeUnit("d")).toBe("day");
  });

  it("should normalize hour units", () => {
    expect(normalizeUnit("hour")).toBe("hour");
    expect(normalizeUnit("h")).toBe("hour");
  });

  it("should normalize minute units", () => {
    expect(normalizeUnit("minute")).toBe("minute");
    expect(normalizeUnit("m")).toBe("minute");
  });

  it("should normalize second units", () => {
    expect(normalizeUnit("second")).toBe("second");
    expect(normalizeUnit("s")).toBe("second");
  });

  it("should normalize millisecond units", () => {
    expect(normalizeUnit("millisecond")).toBe("millisecond");
    expect(normalizeUnit("ms")).toBe("millisecond");
  });

  it("should return original string for unknown units", () => {
    // biome-ignore lint/suspicious/noExplicitAny: test edge case
    expect(normalizeUnit("unknown" as any)).toBe("unknown");
  });
});
