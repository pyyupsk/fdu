import { fdu } from "@pyyupsk/fdu";
import { describe, expect, it } from "vitest";

describe("utcOffset() method", () => {
  it("should get the current UTC offset in minutes", () => {
    const date = fdu("2025-10-05T12:00:00Z");
    const offset = date.utcOffset();

    // The offset should be a number
    expect(typeof offset).toBe("number");

    // For UTC time, the offset depends on the system's timezone
    // We just verify it's a valid offset range (-720 to 840 minutes)
    expect(offset).toBeGreaterThanOrEqual(-720); // UTC-12
    expect(offset).toBeLessThanOrEqual(840); // UTC+14
  });

  it("should set UTC offset and adjust time accordingly", () => {
    // Create a date at noon UTC
    const date = fdu("2025-10-05T12:00:00Z");
    const originalOffset = date.utcOffset();

    // Change offset by +60 minutes (1 hour ahead)
    const adjusted = date.utcOffset(originalOffset + 60);

    // The timestamp should be different (1 hour later)
    expect(adjusted.valueOf()).toBe(date.valueOf() + 60 * 60 * 1000);
  });

  it("should handle positive UTC offsets", () => {
    const date = fdu("2025-10-05T12:00:00Z");
    const originalOffset = date.utcOffset();

    // Set to UTC+8 (480 minutes)
    const utcPlus8 = date.utcOffset(originalOffset + 480);

    // Verify the offset change was applied
    expect(utcPlus8.valueOf()).toBeGreaterThan(date.valueOf());
  });

  it("should handle negative UTC offsets", () => {
    const date = fdu("2025-10-05T12:00:00Z");
    const originalOffset = date.utcOffset();

    // Set to UTC-5 (apply -300 minute change from current)
    const utcMinus5 = date.utcOffset(originalOffset - 300);

    // Verify the offset change was applied
    expect(utcMinus5.valueOf()).toBeLessThan(date.valueOf());
  });

  it("should handle offset of 0 (UTC)", () => {
    const date = fdu("2025-10-05T12:00:00Z");
    const currentOffset = date.utcOffset();

    // Set offset to match UTC (0 difference from current)
    const utc = date.utcOffset(currentOffset);

    // Time should remain the same
    expect(utc.valueOf()).toBe(date.valueOf());
  });

  it("should maintain immutability when setting offset", () => {
    const original = fdu("2025-10-05T12:00:00Z");
    const originalOffset = original.utcOffset();
    const originalTime = original.valueOf();

    // Change the offset
    original.utcOffset(originalOffset + 120);

    // Original should not change
    expect(original.valueOf()).toBe(originalTime);
    expect(original.utcOffset()).toBe(originalOffset);
  });

  it("should work with chaining", () => {
    const date = fdu("2025-10-05T12:00:00Z");
    const offset = date.utcOffset();

    const result = date
      .utcOffset(offset + 60)
      .add(1, "day")
      .utcOffset(offset + 120);

    expect(result.isValid()).toBe(true);
  });

  it("should handle large offset changes", () => {
    const date = fdu("2025-10-05T12:00:00Z");
    const currentOffset = date.utcOffset();

    // Change by 12 hours (720 minutes)
    const adjusted = date.utcOffset(currentOffset + 720);

    // Should be 12 hours later
    expect(adjusted.valueOf()).toBe(date.valueOf() + 12 * 60 * 60 * 1000);
  });
});

describe("local() method", () => {
  it("should return an FduInstance", () => {
    const date = fdu("2025-10-05T12:00:00Z");
    const local = date.local();

    expect(local).toBeDefined();
    expect(typeof local.format).toBe("function");
    expect(local.isValid()).toBe(true);
  });

  it("should maintain the same timestamp", () => {
    const date = fdu("2025-10-05T12:00:00Z");
    const local = date.local();

    // Converting to local time should preserve the timestamp
    expect(local.valueOf()).toBe(date.valueOf());
  });

  it("should maintain immutability", () => {
    const original = fdu("2025-10-05T12:00:00Z");
    const originalTime = original.valueOf();

    original.local();

    // Original should not change
    expect(original.valueOf()).toBe(originalTime);
  });

  it("should work with dates created from timestamps", () => {
    const timestamp = Date.now();
    const date = fdu(timestamp);
    const local = date.local();

    expect(local.valueOf()).toBe(timestamp);
  });

  it("should work with dates created from Date objects", () => {
    const jsDate = new Date("2025-10-05T12:00:00Z");
    const date = fdu(jsDate);
    const local = date.local();

    expect(local.valueOf()).toBe(jsDate.getTime());
  });

  it("should work with chaining", () => {
    const date = fdu("2025-10-05T12:00:00Z");

    const result = date.add(1, "day").local().subtract(2, "hour");

    expect(result.isValid()).toBe(true);
  });

  it("should handle multiple conversions", () => {
    const date = fdu("2025-10-05T12:00:00Z");
    const local1 = date.local();
    const local2 = local1.local();

    // Multiple local() calls should preserve timestamp
    expect(local1.valueOf()).toBe(date.valueOf());
    expect(local2.valueOf()).toBe(date.valueOf());
  });

  it("should work with manipulated dates", () => {
    const date = fdu("2025-10-05T12:00:00Z").add(5, "hour");
    const local = date.local();

    expect(local.valueOf()).toBe(date.valueOf());
  });

  it("should handle dates already in local timezone (offset === 0)", () => {
    // Create a date and force it to have zero offset by mocking
    const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = () => 0;

    const date = fdu("2025-10-05T12:00:00");
    const local = date.local();

    expect(local.valueOf()).toBe(date.valueOf());
    expect(local.isValid()).toBe(true);

    // Restore original method
    Date.prototype.getTimezoneOffset = originalGetTimezoneOffset;
  });
});

describe("utcOffset() and local() integration", () => {
  it("should work together in a workflow", () => {
    const date = fdu("2025-10-05T12:00:00Z");
    const offset = date.utcOffset();

    const adjusted = date.utcOffset(offset + 60).local();

    expect(adjusted.isValid()).toBe(true);
  });

  it("should maintain consistency across conversions", () => {
    const original = fdu("2025-10-05T12:00:00Z");
    const originalOffset = original.utcOffset();

    const modified = original.utcOffset(originalOffset + 120).local();

    // After offset adjustment and local conversion
    expect(modified.isValid()).toBe(true);
  });
});
