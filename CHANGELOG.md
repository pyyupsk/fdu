# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.0-beta.3] - 2025-12-29

### ✨ Features

- **New Date Methods**
  - Added `day()` and `weekday()` setter methods for day-of-week manipulation
  - Added `toObject()` method to convert dates to component objects
  - Added `utcOffset()` and `local()` methods for timezone management
  - Added date comparison utilities: `isToday()`, `isTomorrow()`, `isYesterday()`, `isLeapYear()`
  - Added `isSameOrBefore()` and `isSameOrAfter()` comparison methods

- **Enhanced Comparison Methods**
  - Extended `isBefore()` and `isAfter()` with optional unit parameter for unit-aware comparisons
  - Ensures consistent behavior with `isSameOrBefore()` and `isSameOrAfter()`

### 🐛 Bug Fixes

- **Temporal Correctness**
  - Fixed `diff()` to use `Math.floor()` instead of `Math.round()` for elapsed time (floor semantics)
  - Fixed relative-time plugin to use calendar-based diff for months/years instead of duration conversion

- **Code Quality**
  - Fixed `local()` method by removing unused dead code
  - Fixed plugin registry `getInternalDate()` recursion issue by using `toDate()`
  - Fixed flaky `utcOffset` test with deterministic timestamp assertion

### 🔧 Refactoring

- **Comparison Methods**
  - Extracted `truncateToUnit()` utility for unit-aware date comparisons
  - Simplified `isBefore()` and `isAfter()` implementation using the new utility

- **Code Quality**
  - Simplified Date cloning from `new Date(date.getTime())` to `new Date(date)`
  - Used arrow functions in plugin registry to avoid `self = this` pattern
  - Changed `NaN` to `Number.NaN` for consistency
  - Refactored benchmark extraction script with extracted constants and helper functions

### 📝 Changes

- **Documentation**
  - Added philosophical foundations and design principles (Chronos/Kairos concepts)
  - Emphasized temporal correctness alongside performance in introduction
  - Added PWA support with manifest and app icons
  - Implemented reusable OG image system
  - Added sitemap and robots.txt for SEO
  - Enhanced homepage with performance benchmarks and UI improvements
  - Fixed UTC offset sign convention comments in docs
  - Fixed Feb 29 birthday example in leap year documentation
  - Fixed JSDoc comments for date overflow normalization behavior
  - Fixed `weekOfYear()` comment to clarify it's not ISO 8601 (use `isoWeek()` instead)
  - Fixed TypeScript tuple syntax in i18n guide (proper fixed-length tuple types)
  - Upgraded documentation framework to fumadocs v16 (fumadocs-core, fumadocs-ui, fumadocs-mdx)

- **Testing**
  - Restructured tests to mirror src/ directory structure
  - Achieved 99%+ overall code coverage
  - Migrated tests to use public API with path aliases
  - Updated benchmarks to use date-fns `parseISO` for fair ISO parsing comparison
  - Added comprehensive unit-aware comparison tests for `isBefore()` and `isAfter()`

- **Build & Tooling**
  - Added ESLint with eslint-plugin-jsdoc for documentation enforcement
  - Updated dependencies: biome 2.3.8, vitest 4.0.15, tsdown 0.17.0
  - Added GitHub issue and PR templates for community contributions
  - Lowered Node.js engine requirement from >=20.0.0 to >=18.0.0 for wider adoption
  - Added Node.js 18.x to CI test matrix
  - Upgraded Next.js to v16 for documentation site

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

[0.0.0-beta.3]: https://github.com/pyyupsk/fdu/releases/tag/v0.0.0-beta.3
[0.0.0-beta.2]: https://github.com/pyyupsk/fdu/releases/tag/v0.0.0-beta.2
[0.0.0-beta.1]: https://github.com/pyyupsk/fdu/releases/tag/v0.0.0-beta.1
