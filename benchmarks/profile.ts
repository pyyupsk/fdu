import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import dayjs from "dayjs";
import { type DateTime, fd } from "../src";

type BenchmarkResult = {
  name: string;
  fdTime: number;
  dayjsTime: number;
  speedup: number;
  winner: "fd" | "dayjs" | "tie";
};

function measureTime(fn: () => void, iterations: number): number {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  return end - start;
}

function runBenchmark(
  name: string,
  fdFn: () => void,
  dayjsFn: () => void,
  iterations: number = 10000,
): BenchmarkResult {
  // Warm up
  for (let i = 0; i < 100; i++) {
    fdFn();
    dayjsFn();
  }

  // Measure fd
  const fdTime = measureTime(fdFn, iterations);

  // Measure dayjs
  const dayjsTime = measureTime(dayjsFn, iterations);

  const speedup = dayjsTime / fdTime;

  let winner: "fd" | "dayjs" | "tie";
  if (speedup > 1.1) {
    winner = "fd";
  } else if (speedup < 0.9) {
    winner = "dayjs";
  } else {
    winner = "tie";
  }

  return {
    name,
    fdTime,
    dayjsTime,
    speedup,
    winner,
  };
}

function formatResult(result: BenchmarkResult): string {
  const speedupText =
    result.speedup >= 1
      ? `${result.speedup.toFixed(2)}x faster`
      : `${(1 / result.speedup).toFixed(2)}x slower`;

  let emoji = "⚖️";
  if (result.winner === "fd") {
    emoji = "🚀";
  } else if (result.winner === "dayjs") {
    emoji = "🐢";
  }

  return `${emoji} ${result.name}
  fd:     ${result.fdTime.toFixed(2)}ms
  dayjs:  ${result.dayjsTime.toFixed(2)}ms
  Result: fd is ${speedupText}
`;
}

function getBundleSizes() {
  const fdCjsPath = "./dist/cjs/index.js";
  const fdEsmPath = "./dist/esm/index.js";
  const dayjsPath = "./node_modules/dayjs/dayjs.min.js";

  try {
    const fdCjsContent = gzipSync(readFileSync(fdCjsPath)).length;
    const fdEsmContent = gzipSync(readFileSync(fdEsmPath)).length;
    const dayjsContent = gzipSync(readFileSync(dayjsPath)).length;

    const formatSize = (bytes: number) => {
      const kb = bytes / 1024;
      return `${kb.toFixed(2)}KB`;
    };

    return {
      fdCjs: formatSize(fdCjsContent),
      fdEsm: formatSize(fdEsmContent),
      dayjs: formatSize(dayjsContent),
      savingsKb: ((dayjsContent - fdEsmContent) / 1024).toFixed(2),
      savingsPercent: (
        ((dayjsContent - fdEsmContent) / dayjsContent) *
        100
      ).toFixed(0),
    };
  } catch {
    return {
      fdCjs: "N/A",
      fdEsm: "N/A",
      dayjs: "N/A",
      savingsKb: "N/A",
      savingsPercent: "N/A",
    };
  }
}

async function main() {
  console.log("=".repeat(60));
  console.log("Performance Profiling: fd vs day.js");
  console.log("=".repeat(60));
  console.log();

  const results: BenchmarkResult[] = [];
  const TEST_DATE = "2002-09-30T14:35:45.123Z";

  // Date Creation Benchmarks
  console.log("📅 Date Creation Benchmarks");
  console.log("-".repeat(60));

  results.push(
    runBenchmark(
      "Create from string",
      () => fd(TEST_DATE),
      () => dayjs(TEST_DATE),
    ),
  );

  results.push(
    runBenchmark(
      "Create from timestamp",
      () => fd(Date.parse(TEST_DATE)),
      () => dayjs(Date.parse(TEST_DATE)),
    ),
  );

  results.push(
    runBenchmark(
      "Create from Date object",
      () => fd(new Date(TEST_DATE)),
      () => dayjs(new Date(TEST_DATE)),
    ),
  );

  for (const result of results) {
    console.log(formatResult(result));
  }

  // Formatting Benchmarks
  console.log("🎨 Formatting Benchmarks");
  console.log("-".repeat(60));

  const fdDate = fd(TEST_DATE) as DateTime;
  const dayjsDate = dayjs(TEST_DATE);

  results.push(
    runBenchmark(
      "Format YYYY-MM-DD",
      () => fdDate.format("YYYY-MM-DD"),
      () => dayjsDate.format("YYYY-MM-DD"),
    ),
  );

  results.push(
    runBenchmark(
      "Format YYYY-MM-DD HH:mm:ss",
      () => fdDate.format("YYYY-MM-DD HH:mm:ss"),
      () => dayjsDate.format("YYYY-MM-DD HH:mm:ss"),
    ),
  );

  results.push(
    runBenchmark(
      "Format MMMM DD, YYYY",
      () => fdDate.format("MMMM DD, YYYY"),
      () => dayjsDate.format("MMMM DD, YYYY"),
    ),
  );

  results.push(
    runBenchmark(
      "Complex format pattern",
      () => fdDate.format("dddd, MMMM DD, YYYY HH:mm:ss A"),
      () => dayjsDate.format("dddd, MMMM DD, YYYY HH:mm:ss A"),
    ),
  );

  for (const result of results.slice(-4)) {
    console.log(formatResult(result));
  }

  // Manipulation Benchmarks
  console.log("⚡ Manipulation Benchmarks");
  console.log("-".repeat(60));

  results.push(
    runBenchmark(
      "Add 3 days",
      () => fdDate.add(3, "day"),
      () => dayjsDate.add(3, "day"),
    ),
  );

  results.push(
    runBenchmark(
      "Subtract 7 days",
      () => fdDate.subtract(7, "day"),
      () => dayjsDate.subtract(7, "day"),
    ),
  );

  results.push(
    runBenchmark(
      "Add 1 month",
      () => fdDate.add(1, "month"),
      () => dayjsDate.add(1, "month"),
    ),
  );

  results.push(
    runBenchmark(
      "Chained operations",
      () => fdDate.add(1, "month").subtract(3, "day").add(2, "hour"),
      () => dayjsDate.add(1, "month").subtract(3, "day").add(2, "hour"),
    ),
  );

  for (const result of results.slice(-4)) {
    console.log(formatResult(result));
  }

  // Comparison Benchmarks
  console.log("🔍 Comparison Benchmarks");
  console.log("-".repeat(60));

  const fdDate1 = fd("2025-09-30") as DateTime;
  const fdDate2 = fd("2025-10-01") as DateTime;
  const dayjsDate1 = dayjs("2025-09-30");
  const dayjsDate2 = dayjs("2025-10-01");

  results.push(
    runBenchmark(
      "isBefore comparison",
      () => fdDate1.isBefore(fdDate2),
      () => dayjsDate1.isBefore(dayjsDate2),
    ),
  );

  results.push(
    runBenchmark(
      "isAfter comparison",
      () => fdDate2.isAfter(fdDate1),
      () => dayjsDate2.isAfter(dayjsDate1),
    ),
  );

  results.push(
    runBenchmark(
      "diff in days",
      () => fdDate2.diff(fdDate1, "day"),
      () => dayjsDate2.diff(dayjsDate1, "day"),
    ),
  );

  for (const result of results.slice(-3)) {
    console.log(formatResult(result));
  }

  // Summary
  console.log("=".repeat(60));
  console.log("📊 Summary");
  console.log("=".repeat(60));

  const fdWins = results.filter((r) => r.winner === "fd").length;
  const dayjsWins = results.filter((r) => r.winner === "dayjs").length;
  const ties = results.filter((r) => r.winner === "tie").length;

  const avgSpeedup =
    results.reduce((sum, r) => sum + r.speedup, 0) / results.length;

  console.log(`Total benchmarks:     ${results.length}`);
  console.log(`fd wins:              ${fdWins} 🚀`);
  console.log(`dayjs wins:           ${dayjsWins}`);
  console.log(`ties:                 ${ties}`);
  console.log(`Average speedup:      ${avgSpeedup.toFixed(2)}x`);
  console.log();

  // Constitutional Target Check
  const meetsTarget = avgSpeedup >= 2.0;
  if (meetsTarget) {
    console.log("✅ Constitutional target MET: ≥2x faster than day.js");
  } else {
    console.log(
      `⚠️  Constitutional target NOT met: ${avgSpeedup.toFixed(2)}x < 2.0x`,
    );
    console.log("   Note: Some operations may be within acceptable range");
  }

  console.log();
  console.log("Bundle Size Comparison:");
  const sizes = getBundleSizes();
  console.log(`  fd:     ${sizes.fdCjs} gzipped (CJS)`);
  console.log(`  fd:     ${sizes.fdEsm} gzipped (ESM)`);
  console.log(`  dayjs:  ${sizes.dayjs} gzipped`);
  if (sizes.savingsKb !== "N/A") {
    console.log(
      `  Savings: ~${sizes.savingsKb}KB (${sizes.savingsPercent}% smaller)`,
    );
  }
  console.log();
}

main().catch(console.error);
