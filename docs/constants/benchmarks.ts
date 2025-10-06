export const BENCHMARK_DATE = "2025-10-06";

export const benchmarks = [
  {
    operation: "Date Parsing",
    fdu: "2.90M ops/sec",
    dayjs: "1.90M ops/sec",
    dateFns: "118K ops/sec",
    luxon: "371K ops/sec",
    speedup: "1.52×",
  },
  {
    operation: "Date Formatting",
    fdu: "923K ops/sec",
    dayjs: "460K ops/sec",
    dateFns: "338K ops/sec",
    luxon: "551K ops/sec",
    speedup: "2.01×",
  },
  {
    operation: "Date Manipulation",
    fdu: "3.78M ops/sec",
    dayjs: "850K ops/sec",
    dateFns: "2.92M ops/sec",
    luxon: "409K ops/sec",
    speedup: "4.44×",
  },
  {
    operation: "Date Comparison",
    fdu: "18.3M ops/sec",
    dayjs: "1.54M ops/sec",
    dateFns: "4.73M ops/sec",
    luxon: "6.96M ops/sec",
    speedup: "11.89×",
  },
  {
    operation: "Complex Workflow",
    fdu: "622K ops/sec",
    dayjs: "215K ops/sec",
    dateFns: "406K ops/sec",
    luxon: "145K ops/sec",
    speedup: "2.89×",
  },
  {
    operation: "Batch Operations (100 dates)",
    fdu: "9.0K ops/sec",
    dayjs: "4.6K ops/sec",
    dateFns: "5.5K ops/sec",
    luxon: "2.3K ops/sec",
    speedup: "1.94×",
  },
];
