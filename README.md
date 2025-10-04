# @pyyupsk/fdu

> ⚡ Ultra-fast, zero-dependency date-time library for JavaScript & TypeScript — 2× faster than Day.js.

[![npm version](https://img.shields.io/npm/v/@pyyupsk/fdu.svg?color=blue)](https://www.npmjs.com/package/@pyyupsk/fdu)
[![build](https://github.com/pyyupsk/fdu/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/pyyupsk/fdu/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/pyyupsk/fdu/graph/badge.svg?token=499EIXGPB0)](https://codecov.io/gh/pyyupsk/fdu)
[![license](https://img.shields.io/npm/l/@pyyupsk/fdu.svg)](LICENSE)

### ✨ Features

- 🧭 **Immutability** – every operation returns a new instance
- ⚙️ **Zero Dependencies** – pure JavaScript + TypeScript
- ⚡ **Performance** – ~2× faster than Day.js
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
- Comprehensive test coverage (99%+)

### ⚡ Performance

Benchmarked with **Vitest 3.2.4** on Node 22 / Bun 1.2.

| Benchmark                           | fdu         | Day.js      | Speedup         |
| ----------------------------------- | ----------- | ----------- | --------------- |
| Date creation (timestamp)           | 5.6M ops/s  | 3.1M ops/s  | **1.8× faster** |
| Formatting (`YYYY-MM-DD`)           | 1.53M ops/s | 0.68M ops/s | **2.2× faster** |
| Complex formatting                  | 0.64M ops/s | 0.38M ops/s | **1.7× faster** |
| Add/Subtract operations             | 3.4M ops/s  | 0.95M ops/s | **~4× faster**  |
| Chained operations                  | 1.31M ops/s | 0.23M ops/s | **5.7× faster** |
| Comparisons (`isBefore`, `isAfter`) | 19.1M ops/s | 1.6M ops/s  | **12× faster**  |
| Real-world workflow                 | 612K ops/s  | 127K ops/s  | **4.8× faster** |
| Locale formatting                   | 0.9M ops/s  | 0.4M ops/s  | **2–3× faster** |

> 🧪 **Summary:** `fdu` consistently outperforms Day.js across creation, formatting, manipulation, and locale operations — typically **2× to 5× faster**, and up to **10× faster** in certain chained or localized cases.

### 📚 Documentation

Full API and usage guides available at
👉 **[fdu.fasu.dev](https://fdu.fasu.dev)**

### 🪪 License

By contributing to `fdu`, you agree that your contributions will be licensed under the [MIT License](LICENSE).
