<div align="center">
  <img src=".github/assets/logos/fdu.svg" alt="fdu logo" width="200" />
  <h1>@pyyupsk/fdu</h1>
  <p>⚡ Ultra-fast, zero-dependency date-time library for JavaScript & TypeScript — 4× faster than Day.js.</p>

[![size](https://img.shields.io/bundlephobia/minzip/@pyyupsk/fdu?style=flat-square&color=ff8a0f&labelColor=2b2b2b)](https://bundlephobia.com/result?p=@pyyupsk/fdu)
[![npm version](https://img.shields.io/npm/v/@pyyupsk/fdu?style=flat-square&color=ff8a0f&labelColor=2b2b2b)](https://www.npmjs.com/package/@pyyupsk/fdu)
[![build](https://img.shields.io/github/actions/workflow/status/pyyupsk/fdu/test.yml?style=flat-square&color=ff8a0f&labelColor=2b2b2b)](https://github.com/pyyupsk/fdu/actions/workflows/test.yml)
[![codecov](https://img.shields.io/codecov/c/github/pyyupsk/fdu?style=flat-square&token=499EIXGPB0&color=ff8a0f&labelColor=2b2b2b)](https://codecov.io/gh/pyyupsk/fdu)
[![license](https://img.shields.io/npm/l/@pyyupsk/fdu?style=flat-square&color=ff8a0f&labelColor=2b2b2b)](LICENSE)

</div>

> **⚠️ Beta Release:** This library is currently in beta (v0.0.0-beta.3). The API is stable but may change before v1.0.0. Production use is acceptable, but consider pinning to a specific version.

### ✨ Features

- 🧭 **Immutability** – every operation returns a new instance
- ⚙️ **Zero Dependencies** – pure JavaScript + TypeScript
- ⚡ **Performance** – ~4× faster than Day.js
- 🧩 **Tree-shakeable** – modular ESM design

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

Benchmarked with **Vitest 3.2.4** and **Bun 1.2.22** on **2025-10-06**.

| Operation                    | @pyyupsk/fdu | Day.js      | date-fns    | Luxon       | Speedup vs Day.js |
| ---------------------------- | ------------ | ----------- | ----------- | ----------- | ----------------- |
| Date Parsing                 | 2.90M ops/s  | 1.90M ops/s | 118K ops/s  | 371K ops/s  | **1.52× faster**  |
| Date Formatting              | 923K ops/s   | 460K ops/s  | 338K ops/s  | 551K ops/s  | **2.01× faster**  |
| Date Manipulation            | 3.78M ops/s  | 850K ops/s  | 2.92M ops/s | 409K ops/s  | **4.44× faster**  |
| Date Comparison              | 18.3M ops/s  | 1.54M ops/s | 4.73M ops/s | 6.96M ops/s | **11.89× faster** |
| Complex Workflow             | 622K ops/s   | 215K ops/s  | 406K ops/s  | 145K ops/s  | **2.89× faster**  |
| Batch Operations (100 dates) | 9.0K ops/s   | 4.6K ops/s  | 5.5K ops/s  | 2.3K ops/s  | **1.94× faster**  |

> 🧪 **Summary:** `fdu` is **~4× faster** than Day.js on average, with exceptional performance in comparisons (**11.89×**), date manipulation (**4.44×**), and complex workflows (**2.89×**). See [full benchmarks](https://fdu.fasu.dev/docs/benchmarks) for details.

### 📚 Documentation

Full API and usage guides available at
👉 **[fdu.fasu.dev](https://fdu.fasu.dev)**

### 🪪 License

By contributing to `fdu`, you agree that your contributions will be licensed under the [MIT License](LICENSE).
