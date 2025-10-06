import { describe, expect, it } from "vitest";
import { ko } from "@/locale/locales/ko";

describe("ko locale", () => {
  it("should have correct name", () => {
    expect(ko.name).toBe("ko");
  });

  it("should have 12 months", () => {
    expect(ko.months).toHaveLength(12);
    expect(ko.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(ko.weekdays).toHaveLength(7);
    expect(ko.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
