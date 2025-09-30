# fd

**Lightweight, ultra-fast, zero-dependency JavaScript date-time library**

[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@pyyupsk/fd)](https://bundlephobia.com/package/@pyyupsk/fd)
[![Test Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](https://github.com/pyyupsk/fd)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`fd` is a blazing-fast alternative to Day.js and date-fns, built from scratch with **zero runtime dependencies**. At around **2KB gzipped** (2.09 KB with English locale included), it delivers **2x faster** performance while providing an intuitive, chainable API for all your date manipulation needs.

## ✨ Features

- 🚀 **Ultra-fast**: 2x faster than Day.js, <10μs per operation
- 📦 **Tiny bundle**: ~2KB gzipped, tree-shakable
- 🔒 **Zero dependencies**: No external packages, no supply-chain risks
- 🌳 **Tree-shakable**: Import only what you need
- 🔗 **Chainable API**: Fluent, immutable operations
- 💪 **TypeScript-first**: Strict types, excellent IntelliSense
- 🌍 **Locale support**: Built-in i18n for formatting
- ✅ **Well-tested**: 95%+ test coverage, 330+ passing tests
- 📚 **Day.js compatible**: Easy migration path

## 📦 Installation

```bash
npm install @pyyupsk/fd
# or
yarn add @pyyupsk/fd
# or
pnpm add @pyyupsk/fd
# or
bun add @pyyupsk/fd
```

## 🚀 Quick Start

```typescript
import fd from "@pyyupsk/fd";

// Current date/time
const now = fd();

// From various inputs
const date1 = fd("2025-09-30");
const date2 = fd(new Date(2025, 8, 30));
const date3 = fd(1727693745123);

// Format dates
now.format("YYYY-MM-DD"); // '2025-09-30'
now.format("MMMM DD, YYYY"); // 'September 30, 2025'
now.format("dddd [at] HH:mm"); // 'Monday at 14:30'

// Add/subtract (immutable)
const tomorrow = now.add(1, "day");
const nextMonth = now.add(1, "month");
const lastYear = now.subtract(1, "year");

// Compare dates
tomorrow.isAfter(now); // true
now.isBefore(tomorrow); // true
now.isSame(now, "day"); // true

// Calculate differences
tomorrow.diff(now, "day"); // 1
nextMonth.diff(now, "month"); // 1

// Chainable operations
fd("2025-01-01").add(1, "month").subtract(2, "day").format("YYYY-MM-DD"); // '2025-01-30'
```

## 📖 API Reference

### Creation

```typescript
fd(); // Current date/time
fd("2025-09-30"); // From ISO string
fd(new Date()); // From Date object
fd(1727693745123); // From Unix timestamp (ms)
```

### Formatting

Supports Day.js-compatible format tokens:

| Token  | Output    | Description                   |
| ------ | --------- | ----------------------------- |
| `YYYY` | 2025      | 4-digit year                  |
| `YY`   | 25        | 2-digit year                  |
| `MMMM` | September | Full month name               |
| `MMM`  | Sep       | Short month name              |
| `MM`   | 09        | 2-digit month (01-12)         |
| `M`    | 9         | 1-digit month (1-12)          |
| `DD`   | 30        | 2-digit day (01-31)           |
| `D`    | 30        | 1-digit day (1-31)            |
| `dddd` | Monday    | Full weekday name             |
| `ddd`  | Mon       | Short weekday name            |
| `HH`   | 14        | 2-digit hour 24h (00-23)      |
| `H`    | 14        | 1-digit hour 24h (0-23)       |
| `hh`   | 02        | 2-digit hour 12h (01-12)      |
| `h`    | 2         | 1-digit hour 12h (1-12)       |
| `mm`   | 30        | 2-digit minute (00-59)        |
| `m`    | 30        | 1-digit minute (0-59)         |
| `ss`   | 45        | 2-digit second (00-59)        |
| `s`    | 45        | 1-digit second (0-59)         |
| `SSS`  | 123       | 3-digit millisecond (000-999) |
| `A`    | PM        | Uppercase AM/PM               |
| `a`    | pm        | Lowercase am/pm               |

**Escaped literals**: Use square brackets `[...]` for literal text

```typescript
fd().format("[Today is] dddd, MMMM DD"); // 'Today is Monday, September 30'
```

### Manipulation

All manipulation methods are **immutable** and return a new instance:

```typescript
const date = fd("2025-09-30");

// Add time
date.add(1, "year"); // Add 1 year
date.add(3, "month"); // Add 3 months
date.add(7, "day"); // Add 7 days
date.add(2, "hour"); // Add 2 hours
date.add(30, "minute"); // Add 30 minutes
date.add(15, "second"); // Add 15 seconds

// Subtract time
date.subtract(1, "day"); // Subtract 1 day

// Chainable
date.add(1, "month").subtract(2, "day").add(3, "hour");
```

**Supported units**: `year`, `month`, `week`, `day`, `hour`, `minute`, `second`, `millisecond`

### Comparison

```typescript
const date1 = fd("2025-09-30");
const date2 = fd("2025-10-01");

// Boolean comparisons
date1.isBefore(date2); // true
date2.isAfter(date1); // true
date1.isSame(date1); // true
date1.isSame(date2, "month"); // true (same month)
date1.isSame(date2, "day"); // false (different day)

// Calculate difference
date2.diff(date1, "day"); // 1
date2.diff(date1, "hour"); // 24
date1.diff(date2, "day"); // -1 (negative)
```

### Query

```typescript
const date = fd("2025-09-30T14:30:45.123");

date.year(); // 2025
date.month(); // 8 (0-indexed, September)
date.date(); // 30
date.day(); // 1 (Monday, 0=Sunday)
date.hour(); // 14
date.minute(); // 30
date.second(); // 45
date.millisecond(); // 123
```

### Conversion

```typescript
const date = fd("2025-09-30");

date.toDate(); // Native Date object
date.toISOString(); // '2025-09-30T00:00:00.000Z'
date.valueOf(); // 1727654400000 (Unix timestamp)
date.isValid(); // true
```

### Locale

```typescript
import { fd, registerLocale } from "@pyyupsk/fd";

// Default locale (English)
fd().format("MMMM"); // 'September'

// Thai locale
import { th } from "@pyyupsk/fd/locale";
registerLocale("th", th);

fd().locale("th").format("MMMM"); // 'กันยายน'
```

## 🌳 Tree-Shaking

Import only what you need for optimal bundle size:

```typescript
// Full import (includes everything)
import fd from "@pyyupsk/fd";

// Granular imports (recommended)
import { format } from "@pyyupsk/fd/format";
import { parse } from "@pyyupsk/fd/parse";
import { add, subtract } from "@pyyupsk/fd/manipulate";
import { diff, isBefore, isAfter } from "@pyyupsk/fd/compare";
```

## 📊 Performance

Benchmarks comparing `fd` vs Day.js:

| Operation          | fd        | Day.js | Speedup     |
| ------------------ | --------- | ------ | ----------- |
| Create from string | **~8μs**  | ~15μs  | 1.9x faster |
| Format YYYY-MM-DD  | **~6μs**  | ~12μs  | 2.0x faster |
| Add 3 days         | **~4μs**  | ~9μs   | 2.3x faster |
| Diff in days       | **~3μs**  | ~7μs   | 2.3x faster |
| Complex workflow   | **~25μs** | ~55μs  | 2.2x faster |

Bundle size comparison:

| Library  | Minified    | Gzipped        |
| -------- | ----------- | -------------- |
| **fd**   | **8.22 KB** | **2.09 KB** ✅ |
| Day.js   | 7.2 KB      | 2.9 KB         |
| date-fns | 78 KB       | 13 KB          |

> **Note**: fd includes English locale by default. Like Day.js, this keeps the library ready-to-use while staying under 2.1KB gzipped.

_Run benchmarks yourself: `npm run bench`_

## 🔄 Migrating from Day.js

`fd` is designed to be a drop-in replacement for Day.js with minimal changes:

```typescript
// Day.js
import dayjs from "dayjs";
const date = dayjs("2025-09-30");
date.format("YYYY-MM-DD");
date.add(1, "day");
date.isBefore(other);

// @pyyupsk/fd (nearly identical)
import fd from "@pyyupsk/fd";
const date = fd("2025-09-30");
date.format("YYYY-MM-DD");
date.add(1, "day");
date.isBefore(other);
```

**Key differences**:

- `fd()` returns `null` for invalid dates (Day.js returns an invalid date object)
- Locale must be explicitly registered (Day.js auto-loads)
- Some advanced plugins not yet supported (timezone conversion, calendar, etc.)

## 🛠️ Development

```bash
# Install dependencies
bun install

# Run tests
bun run test

# Run tests with coverage
bun run test:coverage

# Run benchmarks
bun run bench

# Build distribution
bun run build

# Lint code
bun run lint

# Type check
bun run typecheck
```

## 📜 License

MIT © [Pongsakorn Thipayanate](https://github.com/pyyupsk)

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 🔗 Links

- [GitHub Repository](https://github.com/pyyupsk/fd)
- [npm Package](https://www.npmjs.com/package/@pyyupsk/fd)
- [Issue Tracker](https://github.com/pyyupsk/fd/issues)
- [Changelog](CHANGELOG.md)

---

**Made with ❤️ by [Pongsakorn Thipayanate](https://fasu.dev)**
