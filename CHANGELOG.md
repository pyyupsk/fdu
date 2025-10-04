# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.0-beta.2] - 2025-10-04

### ✨ Features

- **Internationalization Expansion**
  - Added 11 new locales: Arabic (ar), Czech (cs), Finnish (fi), Hindi (hi), Hungarian (hu), Dutch (nl), Norwegian (no), Polish (pl), Romanian (ro), Swedish (sv), Turkish (tr)
  - Added `yearOffset` support for alternative calendars (e.g., Thai Buddhist calendar)
  - Total of 22 built-in locales now available

- **Build System**
  - Migrated from tsup to tsdown for modular exports
  - Improved tree-shaking support with better module granularity
  - Consolidated locale exports into main entry point for easier imports

- **Documentation**
  - Migrated documentation framework from VitePress → Nextra → Fumadocs
  - Added comprehensive API reference documentation with grouped structure
  - Implemented custom OpenGraph image design for better social sharing
  - Enhanced SEO metadata and documentation descriptions
  - Redesigned homepage with hero section and features showcase
  - Added search functionality and page actions for LLM integration
  - Improved documentation deployment workflow

### 📝 Changes

- **Code Quality**
  - Added comprehensive JSDoc documentation throughout codebase
  - Refactored utility functions for better organization
  - Improved TypeScript type definitions and exports

- **Testing**
  - Added `parseInput` tests
  - Reorganized test structure for better maintainability
  - Added year offset validation tests

- **Maintenance**
  - Streamlined README to focus on quick start
  - Removed deprecated static workflow
  - Updated locale import paths to use modular exports

## [0.0.0-beta.1] - 2025-10-04

### 🎉 Initial Beta Release

The first beta release of `fdu` (faster date-time utility) - an ultra-fast, zero-dependency JavaScript date-time library.

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

- **Comprehensive Internationalization (i18n)**
  - 11 built-in locales: English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese (Simplified), Thai
  - Global locale setting with `locale(name)` function
  - Instance-level locale override with `.locale(name)` method
  - Locale persistence through chained operations
  - Graceful fallback to English for unregistered locales
  - Tree-shakable locale files (~300-500 bytes gzipped each)
  - Ordinal day formatting with `Do` token (1st, 2nd, 3rd, etc.)
  - Custom meridiem functions for cultural time-of-day naming

- **TypeScript**
  - Full TypeScript support with strict types
  - Excellent IntelliSense and auto-completion
  - No `any` types in public APIs

### 📊 Performance

- **2x faster** than Day.js for common operations
- Sub-10μs formatting operations
- Comprehensive benchmark suite included

### 🧪 Testing

- **628 tests** with 97%+ coverage
- Unit tests for all core functionality
- Integration tests for chainable API and edge cases
- Performance benchmarks comparing with Day.js
- Cross-platform testing (Node.js, browsers, Deno)

### 📦 Distribution

- **ESM** (primary): `dist/index.js`
- **CJS** (Node.js compat): `dist/index.cjs`
- Dual package exports with proper `package.json` configuration
- Hand-written TypeScript declarations

### 📝 Notes

- Zero runtime dependencies (constitutional principle)
- Modern JavaScript (ES2020+ target)
- Immutable by default
- Day.js-compatible API for easy migration

[0.0.0-beta.1]: https://github.com/pyyupsk/fdu/releases/tag/v0.0.0-beta.1
