# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-30

### 🎉 Initial Release

The first public release of `fd` - a lightweight, ultra-fast, zero-dependency JavaScript date-time library.

### ✨ Features

- **Core Date Manipulation**
  - Create date instances from Date objects, strings, timestamps, or current time
  - Immutable operations (all methods return new instances)
  - Chainable API for fluent date manipulation

- **Formatting**
  - Day.js-compatible format tokens (YYYY, MM, DD, HH, mm, ss, etc.)
  - Full month/weekday names and abbreviations
  - AM/PM support for 12-hour format
  - Escaped literal text with square brackets `[...]`
  - Locale-aware formatting

- **Date Arithmetic**
  - Add/subtract years, months, weeks, days, hours, minutes, seconds, milliseconds
  - Automatic month overflow handling (Jan 31 + 1 month → Feb 28/29)
  - Leap year support

- **Comparisons**
  - `isBefore()`, `isAfter()`, `isSame()` methods
  - Unit-based comparison (compare by year, month, day, etc.)
  - `diff()` method with multiple unit support

- **Query Methods**
  - Get year, month, date, day, hour, minute, second, millisecond
  - Convert to Date, ISO string, Unix timestamp
  - Validation with `isValid()`

- **Locale Support**
  - Built-in English locale
  - Thai locale included
  - Easy locale registration system
  - Per-instance locale switching

- **Tree-Shaking**
  - Granular imports for optimal bundle size
  - Separate entry points: `fd/format`, `fd/parse`, `fd/compare`, `fd/manipulate`
  - `sideEffects: false` for aggressive tree-shaking

- **TypeScript**
  - Full TypeScript support with strict types
  - Excellent IntelliSense and auto-completion
  - No `any` types in public APIs

### 📊 Performance

- **2x faster** than Day.js for common operations
- **< 2KB gzipped** (1.83 KB ESM, 1.73 KB CJS)
- Sub-10μs formatting operations
- Comprehensive benchmark suite included

### 🧪 Testing

- **330+ tests** with 95%+ coverage
- Unit tests for all core functionality
- Integration tests for chainable API and edge cases
- Performance benchmarks comparing with Day.js
- Cross-platform testing (Node.js, browsers, Deno)

### 📦 Distribution

- **ESM** (primary): `dist/esm/index.js`
- **CJS** (Node.js compat): `dist/cjs/index.js`
- **UMD** (browser `<script>` tag): `dist/umd/index.js`
- Dual package exports with proper `package.json` configuration
- Hand-written TypeScript declarations

### 📚 Documentation

- Comprehensive README with examples
- Full API reference
- Migration guide from Day.js
- Contributing guidelines
- Performance comparison table

### 🏗️ Infrastructure

- Vitest for testing and benchmarks
- Vite for building (fast, optimized)
- Biome for linting and formatting
- TypeScript 5.x with strict mode
- Full CI/CD ready

### 📝 Notes

- Zero runtime dependencies (constitutional principle)
- Modern JavaScript (ES2020+ target)
- Immutable by default
- Day.js-compatible API for easy migration

[1.0.0]: https://github.com/pyyupsk/fd/releases/tag/v1.0.0
