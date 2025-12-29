import { describe, expect, it } from "vitest";
import { zhCn } from "@/locale/locales/zh-cn";

describe("zh-cn locale", () => {
  it("should have correct name", () => {
    expect(zhCn.name).toBe("zh-cn");
  });

  it("should have 12 months", () => {
    expect(zhCn.months).toHaveLength(12);
    expect(zhCn.months.every((m) => typeof m === "string")).toBe(true);
  });

  it("should have 7 weekdays", () => {
    expect(zhCn.weekdays).toHaveLength(7);
    expect(zhCn.weekdays.every((d) => typeof d === "string")).toBe(true);
  });
});
