# @pyyupsk/fdu

> ⚡ Ultra-fast, zero-dependency date-time library for JavaScript & TypeScript — 4× faster than Day.js.

[![npm version](https://img.shields.io/npm/v/@pyyupsk/fdu.svg?color=blue)](https://www.npmjs.com/package/@pyyupsk/fdu)
[![build](https://github.com/pyyupsk/fdu/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/pyyupsk/fdu/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/pyyupsk/fdu/graph/badge.svg?token=499EIXGPB0)](https://codecov.io/gh/pyyupsk/fdu)
[![license](https://img.shields.io/npm/l/@pyyupsk/fdu.svg)](LICENSE)

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
- Comprehensive test coverage (94%+)

### ⚡ Performance

Benchmarked with **Vitest 3.2.4** on **Node 22.19.0** / **Bun 1.2.22** (WSL2, Linux 6.6.87, x86_64).

| Benchmark                           | fdu         | Day.js     | Speedup          |
| ----------------------------------- | ----------- | ---------- | ---------------- |
| Date creation (timestamp)           | 6.0M ops/s  | 3.2M ops/s | **1.9× faster**  |
| Formatting (`YYYY-MM-DD`)           | 1.3M ops/s  | 0.7M ops/s | **1.9× faster**  |
| Complex formatting                  | 0.5M ops/s  | 0.4M ops/s | **1.2× faster**  |
| Add/Subtract operations             | 3.8M ops/s  | 0.9M ops/s | **4.1× faster**  |
| Chained operations                  | 1.4M ops/s  | 0.2M ops/s | **5.8× faster**  |
| Comparisons (`isBefore`, `isAfter`) | 20.0M ops/s | 1.6M ops/s | **12.5× faster** |
| Real-world workflow                 | 0.5M ops/s  | 0.1M ops/s | **4.4× faster**  |
| Locale formatting                   | 0.9M ops/s  | 0.4M ops/s | **2.3× faster**  |

> 🧪 **Summary:** `fdu` is **~4× faster** than Day.js on average, with particularly strong performance in comparisons (12×), chained operations (6×), and date manipulation (4×).

### 📚 Documentation

Full API and usage guides available at
👉 **[fdu.fasu.dev](https://fdu.fasu.dev)**

### 🪪 License

By contributing to `fdu`, you agree that your contributions will be licensed under the [MIT License](LICENSE).
