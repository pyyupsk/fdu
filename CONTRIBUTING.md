# Contributing to fdu

Thank you for considering contributing to `fdu`! This document provides guidelines and instructions for contributing.

## 🕐 Temporal Philosophy Foundation

**ALL contributions MUST align with the library's temporal design principles** ([read the full philosophy](https://fdu.fasu.dev/docs/philosophy)).

This library is designed around how humans actually perceive and measure time, drawing from established philosophical research on **Chronos** (quantitative clock time) and **Kairos** (qualitative opportune moments) from Ancient Greek philosophy. Every feature, test, and optimization must respect these non-negotiable temporal principles:

1. **Elapsed Time Semantics**: Time differences use `Math.floor()` for fully elapsed units (`-2.3 hours` → `-3 hours`)
2. **Calendar-Based Arithmetic**: Months/years use calendar math, not duration conversion (variable 28-31 days)
3. **Human-Centric Years**: Year 0 means year 0 per ISO 8601 (use `setFullYear()` for years 0-99)
4. **Temporal Direction Integrity**: Earlier < later; negative diffs = past (time's arrow)

**Any code violating these principles will be rejected as temporally incorrect.**

### Philosophical Foundations

Our design reflects established research:

- **Time Perception** ([Stanford Encyclopedia](https://plato.stanford.edu/entries/time-experience/))
- **Phenomenology of Time-Consciousness** (Husserl, [IEP](https://iep.utm.edu/phe-time/))
- **Flow Theory** (Csikszentmihalyi, [Wikipedia](<https://en.wikipedia.org/wiki/Flow_(psychology)>))
- **Chronos vs Kairos** (Ancient Greek temporal philosophy)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions

## Development Setup

### Prerequisites

- **Bun** 1.0+ (recommended) or Node.js 14+
- **Git** for version control
- **TypeScript** 5.x knowledge

### Getting Started

```bash
# Clone the repository
git clone https://github.com/pyyupsk/fdu.git
cd fdu

# Install dependencies
bun install

# Run tests
bun run test

# Run tests with coverage
bun run test:coverage

# Run benchmarks
bun run bench

# Build the project
bun run build

# Lint and format code
bun run lint
bun run format
```

## Project Structure

```tree
fdu/
├── src/                   # Source code
│   ├── core/              # Core DateTimeImpl class and types
│   ├── format/            # Formatting logic
│   ├── parse/             # Parsing logic
│   ├── manipulate/        # Add/subtract operations
│   ├── compare/           # Comparison operations
│   ├── locale/            # Locale support
│   └── index.ts           # Main entry point
├── tests/                 # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── benchmarks/        # Performance benchmarks
├── dist/                  # Built distributions (ESM, CJS, UMD)
└── specs/                 # Feature specifications
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Check coverage (must meet thresholds: lines ≥99%, branches ≥96%, functions 100%, statements ≥99%)
bun run test:coverage

# Run benchmarks (ensure no performance regressions)
bun run bench

# Type check
bun run typecheck

# Lint code
bun run lint
```

### 4. Commit Your Changes

We follow conventional commit messages:

```bash
# Format: <type>(<scope>): <description>

git commit -m "feat(format): add support for custom format tokens"
git commit -m "fix(parse): handle invalid ISO strings correctly"
git commit -m "docs: update README with new examples"
git commit -m "test: add edge case tests for leap years"
git commit -m "perf: optimize format token compilation"
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `perf`: Performance improvements
- `refactor`: Code refactoring
- `style`: Code style changes (formatting, etc.)
- `chore`: Build process, dependencies, etc.

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:

- Clear title describing the change
- Description explaining what and why
- Link to related issues (if any)
- Screenshots/benchmarks (if applicable)

## Constitutional Principles

### 1. Temporal Correctness (NON-NEGOTIABLE)

**This is Principle Zero—it supersedes all other principles.**

- All time calculations MUST follow floor semantics for fully elapsed units
- Calendar arithmetic MUST use calendar-based logic, not duration conversion
- Year handling MUST be human-centric per ISO 8601 (Year 0 = Year 0)
- Time axis direction MUST be preserved (earlier < later, time's arrow)
- Tests that violate these principles are **wrong by definition**

**Rationale**: We're not just manipulating milliseconds—we're implementing time operations that reflect how humans actually perceive and measure temporal passage, grounded in philosophical research on time perception.

### 2. Zero Dependencies (NON-NEGOTIABLE)

- No runtime dependencies allowed
- Only devDependencies for testing/building

### 3. Performance First

- Must be ≥2x faster than Day.js for common operations
- Include benchmarks for performance-sensitive changes
- Never sacrifice temporal correctness for speed

### 4. Tree-Shakable Architecture

- Export functions as named exports
- No side effects in module initialization
- Mark `"sideEffects": false` in package.json

### 5. Minimal API Surface

- Core API ≤15 methods
- Advanced features go in plugins
- Justify every new API addition
- API must reflect temporal philosophy (e.g., `diff()` returns floored values)

### 6. Modern Standards

- Target ES2020+, Node.js 14+
- Use modern JavaScript features
- No legacy browser support in core

### 7. Testing Discipline (TDD with Temporal Awareness)

- Write tests **before** implementation
- Tests MUST verify temporal correctness first, then functionality
- Maintain coverage thresholds: lines ≥99%, branches ≥96%, functions 100%, statements ≥99%
- Include edge cases: leap years, DST, month overflow, negative diffs
- Add performance benchmarks for new features
- **Critical**: If a test fails temporal principles, fix the test—not the library

### 8. Type Safety

- TypeScript strict mode
- No `any` types in public APIs
- Hand-written type definitions

## Testing Guidelines

### Unit Tests

- Test individual functions in isolation
- Cover all code paths
- Test edge cases (null, undefined, invalid inputs)
- Test boundary conditions (leap years, month overflow, DST)

Example:

```typescript
import { describe, expect, it } from "vitest";
import { add } from "../src/manipulate/add";

describe("add", () => {
  it("should add days correctly", () => {
    const date = new Date(2025, 0, 1);
    const result = add(date, 3, "day");
    expect(result.getDate()).toBe(4);
  });

  it("should handle month overflow", () => {
    const date = new Date(2025, 0, 31);
    const result = add(date, 1, "month");
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(28); // Clamped to last valid day
  });
});
```

### Integration Tests

- Test multiple features working together
- Test chainable API
- Test immutability
- Test real-world scenarios

Example:

```typescript
describe("Chainable API", () => {
  it("should chain operations immutably", () => {
    const original = fdu("2025-01-01");
    const modified = original.add(1, "month").subtract(2, "day").add(3, "hour");

    expect(original.format("YYYY-MM-DD")).toBe("2025-01-01");
    expect(modified.format("YYYY-MM-DD HH")).toBe("2025-01-30 03");
  });
});
```

### Benchmarks

- Compare against Day.js (baseline)
- Measure operations/second
- Track bundle size impact

Example:

```typescript
import { bench, describe } from "vitest";
import dayjs from "dayjs";
import { fdu } from "../src";

describe("Performance", () => {
  bench("fdu - format YYYY-MM-DD", () => {
    fdu("2025-01-01")!.format("YYYY-MM-DD");
  });

  bench("dayjs - format YYYY-MM-DD", () => {
    dayjs("2025-01-01").format("YYYY-MM-DD");
  });
});
```

## Code Style

- **TypeScript**: Strict mode, no `any` types
- **Formatting**: Handled by Biome (auto-format on save)
- **Naming**: camelCase for variables/functions, PascalCase for types/classes
- **Comments**: JSDoc for public APIs, inline comments for complex logic
- **Exports**: Named exports preferred over default exports

## Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows project style (lint passes)
- [ ] All tests pass (`bun run test`)
- [ ] Coverage thresholds met: lines ≥99%, branches ≥96%, functions 100%, statements ≥99% (`bun run test:coverage`)
- [ ] Benchmarks show no regressions (`bun run bench`)
- [ ] Types are strict (`bun run typecheck`)
- [ ] Documentation is updated (README, JSDoc)
- [ ] Commit messages follow conventional format
- [ ] PR description is clear and complete
- [ ] Constitutional principles are respected

## Common Contribution Areas

### Adding Format Tokens

1. Add token to `src/format/tokens.ts`
2. Add tests to `tests/unit/format/tokens.test.ts`
3. Update documentation in README
4. Ensure backward compatibility

### Adding Locales

1. Create locale file in `src/locale/locales/<locale>.ts`
2. Follow existing locale structure (see `en.ts`)
3. Add tests to `tests/unit/locale/locale.test.ts`
4. Update documentation

### Performance Optimizations

1. Identify bottleneck (use benchmarks)
2. Implement optimization
3. Run benchmarks to verify improvement
4. Ensure tests still pass
5. Update documentation with new benchmarks

### Bug Fixes

1. Write a failing test that reproduces the bug
2. Fix the bug
3. Ensure test passes
4. Add regression test if needed

## Questions?

- **Issues**: <https://github.com/pyyupsk/fdu/issues>
- **Discussions**: <https://github.com/pyyupsk/fdu/discussions>
- **Email**: <contact@fasu.dev>

## License

By contributing to `fdu`, you agree that your contributions will be licensed under the MIT License.
