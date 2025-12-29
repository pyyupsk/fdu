<div align="center">
  <img src="https://raw.githubusercontent.com/pyyupsk/fdu/refs/heads/main/.github/assets/logos/fdu.svg" alt="fdu logo" width="200" />
  <h1>@pyyupsk/fdu</h1>
  <p>⚡ Ultra-fast, zero-dependency date-time library grounded in philosophical time perception — 4× faster than Day.js.</p>

[![size](https://img.shields.io/bundlephobia/minzip/@pyyupsk/fdu?style=flat-square&color=ff8a0f&labelColor=2b2b2b)](https://bundlephobia.com/result?p=@pyyupsk/fdu)
[![npm version](https://img.shields.io/npm/v/@pyyupsk/fdu?style=flat-square&color=ff8a0f&labelColor=2b2b2b)](https://www.npmjs.com/package/@pyyupsk/fdu)
[![build](https://img.shields.io/github/actions/workflow/status/pyyupsk/fdu/test.yml?style=flat-square&color=ff8a0f&labelColor=2b2b2b)](https://github.com/pyyupsk/fdu/actions/workflows/test.yml)
[![codecov](https://img.shields.io/codecov/c/github/pyyupsk/fdu?style=flat-square&token=499EIXGPB0&color=ff8a0f&labelColor=2b2b2b)](https://codecov.io/gh/pyyupsk/fdu)
[![license](https://img.shields.io/npm/l/@pyyupsk/fdu?style=flat-square&color=ff8a0f&labelColor=2b2b2b)](LICENSE)

</div>

> **⚠️ Beta Release:** This library is currently in beta (v0.0.0-beta.3). The API is stable but may change before v1.0.0. Production use is acceptable, but consider pinning to a specific version.

### ✨ Features

- ⚡ **Performance** – ~4× faster than Day.js
- 🕐 **Temporally Correct** – calendar-based arithmetic, floor semantics ([read more](https://fdu.fasu.dev/docs/philosophy))
- 🧭 **Immutability** – every operation returns a new instance
- ⚙️ **Zero Dependencies** – pure JavaScript + TypeScript
- 🧩 **Tree-shakeable** – modular ESM design

### 🎯 Why fdu?

**Temporal Correctness**: fdu implements time based on how humans actually perceive it, grounded in research on time perception:

1. **Floor Semantics** – Time differences use fully elapsed units (`1.9 hours` → `1 hour`)
2. **Calendar Arithmetic** – Months/years count calendar boundaries, not duration (`Feb - Oct = 4 months`)
3. **Temporal Direction** – Earlier < later, negative = past (time's arrow)
4. **Human-Centric Years** – Year 0 = Year 0 (ISO 8601)

This reflects Ancient Greek philosophy (Chronos vs Kairos), phenomenology ([Husserl](https://iep.utm.edu/phe-time/)), and temporal psychology ([Stanford](https://plato.stanford.edu/entries/time-experience/)). [Read full philosophy →](https://fdu.fasu.dev/docs/philosophy)

### 🚀 Quick Start

```bash
npm install @pyyupsk/fdu
```

```ts
import { fdu, registerLocale, locale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

const date = fdu("2025-09-30");

date.format("YYYY-MM-DD HH:mm:ss");
date.add(1, "day").format("[Tomorrow is] dddd");

registerLocale("es", es);
locale("es");
date.locale("es").format("LLLL");
```

### 📦 Highlights

- TypeScript-first, no runtime deps
- Immutable, locale-aware API
- Fine-grained comparisons & date math
- Comprehensive test coverage (98%+)

### ⚡ Performance

Benchmarked with **Vitest 4.0.15** and **Bun 1.3.3** on **2025-12-05**.

| Operation                    | @pyyupsk/fdu   | Day.js         | date-fns       | Luxon          | Speedup vs Day.js |
| ---------------------------- | -------------- | -------------- | -------------- | -------------- | ----------------- |
| Date Parsing                 | 2.88M ops/sec  | 2.06M ops/sec  | 134.1K ops/sec | 413.1K ops/sec | **1.40× faster**  |
| Date Formatting              | 955.1K ops/sec | 548.7K ops/sec | 398.0K ops/sec | 626.1K ops/sec | **1.74× faster**  |
| Date Manipulation            | 3.87M ops/sec  | 965.2K ops/sec | 3.28M ops/sec  | 449.1K ops/sec | **4.01× faster**  |
| Date Comparison              | 20.17M ops/sec | 1.53M ops/sec  | 4.92M ops/sec  | 6.98M ops/sec  | **13.18× faster** |
| Complex Workflow             | 549.8K ops/sec | 245.9K ops/sec | 415.5K ops/sec | 143.1K ops/sec | **2.24× faster**  |
| Batch Operations (100 dates) | 9.4K ops/sec   | 5.3K ops/sec   | 5.7K ops/sec   | 2.8K ops/sec   | **1.79× faster**  |

> 🧪 **Summary:** `fdu` is **~4× faster** than Day.js on average, with exceptional performance in comparisons (**13.18×**), date manipulation (**4.01×**), and complex workflows (**2.24×**). See [full benchmarks](https://fdu.fasu.dev/docs/benchmarks) for details.

### 📚 Documentation

Full API and usage guides available at
👉 **[fdu.fasu.dev](https://fdu.fasu.dev)**

### 🪪 License

By contributing to `fdu`, you agree that your contributions will be licensed under the [MIT License](LICENSE).
