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

Benchmarked with **Vitest 3.2.4** on **Bun 1.2.22** / **Node 22.19.0** (Intel i5-12400, 10GB RAM, WSL2).

| Benchmark                          | fdu         | Day.js     | date-fns   | Luxon      | Speedup vs Day.js |
| ---------------------------------- | ----------- | ---------- | ---------- | ---------- | ----------------- |
| Date parsing (ISO string)          | 2.9M ops/s  | 1.9M ops/s | 0.1M ops/s | 0.4M ops/s | **1.5× faster**   |
| Date creation (timestamp)          | 5.9M ops/s  | 3.2M ops/s | 3.2M ops/s | 1.8M ops/s | **1.8× faster**   |
| Formatting (`YYYY-MM-DD HH:mm:ss`) | 0.9M ops/s  | 0.5M ops/s | 0.4M ops/s | 0.5M ops/s | **1.8× faster**   |
| Complex formatting                 | 0.5M ops/s  | 0.4M ops/s | 0.3M ops/s | 0.3M ops/s | **1.3× faster**   |
| Add operations                     | 3.9M ops/s  | 0.9M ops/s | 2.8M ops/s | 0.4M ops/s | **4.3× faster**   |
| Chained operations                 | 1.3M ops/s  | 0.2M ops/s | 0.2M ops/s | 0.2M ops/s | **5.8× faster**   |
| Comparisons (`isBefore`)           | 19.6M ops/s | 1.5M ops/s | 4.6M ops/s | 7.2M ops/s | **13.3× faster**  |
| Complex workflow                   | 0.6M ops/s  | 0.2M ops/s | 0.4M ops/s | 0.1M ops/s | **2.7× faster**   |
| Locale formatting                  | 0.8M ops/s  | 0.4M ops/s | 0.4M ops/s | 0.4M ops/s | **2.1× faster**   |

> 🧪 **Summary:** `fdu` is **~4× faster** than Day.js on average, with particularly strong performance in comparisons (**13×**), chained operations (**6×**), and date manipulation (**4×**). See [full benchmarks](https://fdu.fasu.dev/docs/benchmarks) for details.

### 📚 Documentation

Full API and usage guides available at
👉 **[fdu.fasu.dev](https://fdu.fasu.dev)**

### 🪪 License

By contributing to `fdu`, you agree that your contributions will be licensed under the [MIT License](LICENSE).
