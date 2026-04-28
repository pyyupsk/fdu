#!/usr/bin/env bun
/**
 * Extract benchmark results from vitest bench output and save to JSON.
 *
 * @example
 * ```bash
 * bun run bench | bun scripts/extract-benchmarks.ts
 * ```
 *
 * This script parses the vitest benchmark output and generates a JSON file
 * at `docs/constants/benchmark-data.json` for use by the documentation site.
 *
 * @module
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface BenchmarkResult {
  operation: string;
  fdu: string;
  dayjs: string;
  dateFns: string;
  luxon: string;
  speedup: string;
}

interface BenchmarkData {
  date: string;
  vitestVersion: string;
  bunVersion: string;
  results: BenchmarkResult[];
}

/**
 * Format operations per second into human-readable string.
 *
 * @param hz - Operations per second
 * @returns Formatted string (e.g., "1.23M ops/sec", "456.7K ops/sec")
 */
function formatOps(hz: number): string {
  if (hz >= 1_000_000) {
    return `${(hz / 1_000_000).toFixed(2)}M ops/sec`;
  }
  if (hz >= 1_000) {
    return `${(hz / 1_000).toFixed(1)}K ops/sec`;
  }
  return `${hz.toFixed(0)} ops/sec`;
}

/**
 * Strip ANSI escape codes from terminal output.
 *
 * @param str - String containing ANSI codes
 * @returns Clean string without ANSI codes
 */
function stripAnsi(str: string): string {
  const ESC = String.fromCodePoint(27);
  return str.replaceAll(
    new RegExp(String.raw`${ESC}\[[0-9;]*[a-zA-Z]`, "g"),
    "",
  );
}

/**
 * Read and parse input from stdin.
 *
 * @returns Cleaned input string with ANSI codes removed
 */
function parseInput(): string {
  return stripAnsi(readFileSync(0, "utf-8"));
}

/**
 * Map operation key patterns to operation names.
 * Order matters - more specific patterns should come first.
 */
const OPERATION_PATTERNS: [string, string][] = [
  ["parse, format, manipulate", "Complex Workflow"],
  ["create and format 100 dates", "Batch Operations (100 dates)"],
  ["parse ISO string", "Date Parsing"],
  ["add 1 day", "Date Manipulation"],
  ["isBefore", "Date Comparison"],
];

/** Map library names to property keys */
const LIB_TO_KEY: Record<string, string> = {
  "@pyyupsk/fdu": "fdu",
  "Day.js": "dayjs",
  "date-fns": "dateFns",
  Luxon: "luxon",
};

/**
 * Determine operation name from operation key.
 */
function getOperationName(opKey: string): string | null {
  const lowerKey = opKey.toLowerCase();

  // Check for formatting (special case with compound condition)
  if (lowerKey.includes("format") && lowerKey.includes("hh:mm:ss")) {
    return "Date Formatting";
  }

  // Check pattern matches
  for (const [pattern, name] of OPERATION_PATTERNS) {
    if (opKey.includes(pattern)) {
      return name;
    }
  }

  return null;
}

/**
 * Extract benchmark data from vitest bench output.
 *
 * @param input - Raw vitest bench output (ANSI codes should be stripped)
 * @returns Structured benchmark data with version info and results
 */
function extractBenchmarks(input: string): BenchmarkData {
  const results: BenchmarkResult[] = [];

  // Parse version info
  const vitestMatch = /v(\d+\.\d+\.\d+)/.exec(input);
  const vitestVersion = vitestMatch ? vitestMatch[1] : "unknown";

  // Group benchmark results by operation
  const benchGroups: Record<string, Record<string, number>> = {};

  // Parse all lines looking for benchmark results
  const lines = input.split("\n");
  for (const line of lines) {
    // Match: · @pyyupsk/fdu - parse ISO string  3,035,955.98
    const match =
      /·\s+(@pyyupsk\/fdu|Day\.js|date-fns|Luxon)\s+-\s+(.+?)\s{2,}([\d,]+\.?\d*)/.exec(
        line,
      );
    if (!match) continue;

    const lib = match[1];
    const opKey = match[2].trim();
    const hz = Number.parseFloat(match[3].replaceAll(",", ""));

    const opName = getOperationName(opKey);
    if (!opName) continue;

    const libKey = LIB_TO_KEY[lib];
    if (!libKey) continue;

    benchGroups[opName] ??= {};
    benchGroups[opName][libKey] = hz;
  }

  // Convert grouped data to results array
  const orderedOps = [
    "Date Parsing",
    "Date Formatting",
    "Date Manipulation",
    "Date Comparison",
    "Complex Workflow",
    "Batch Operations (100 dates)",
  ];

  for (const opName of orderedOps) {
    const data = benchGroups[opName];
    if (data?.fdu && data?.dayjs) {
      const speedup = data.fdu / data.dayjs;

      results.push({
        operation: opName,
        fdu: formatOps(data.fdu),
        dayjs: formatOps(data.dayjs),
        dateFns: formatOps(data.dateFns || 0),
        luxon: formatOps(data.luxon || 0),
        speedup: `${speedup.toFixed(2)}×`,
      });
    }
  }

  return {
    date: new Date().toISOString().split("T")[0],
    vitestVersion,
    bunVersion: process.versions.bun || "unknown",
    results,
  };
}

/**
 * Main entry point - reads stdin, extracts benchmarks, and writes JSON output.
 */
function main() {
  const input = parseInput();
  const data = extractBenchmarks(input);

  // Write to docs/constants/benchmark-data.json
  const outputPath = join(
    import.meta.dir,
    "../docs/constants/benchmark-data.json",
  );
  writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);

  console.log(`Benchmark data saved to ${outputPath}`);
  console.log(`Date: ${data.date}`);
  console.log(`Vitest: ${data.vitestVersion}, Bun: ${data.bunVersion}`);
  console.log(`Results: ${data.results.length} operations`);
  for (const r of data.results) {
    console.log(`  - ${r.operation}: ${r.speedup} faster than Day.js`);
  }
}

main();
