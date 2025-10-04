# fdu (faster date-time utility)

**Ultra-fast, zero-dependency JavaScript date-time utility library**

[![Test Coverage](https://codecov.io/gh/pyyupsk/fdu/graph/badge.svg?token=PTRS3e8yzc)](https://codecov.io/gh/pyyupsk/fdu)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ⚡ **2x faster** than Day.js
- 🔒 **Zero dependencies**
- 💪 **TypeScript-first**
- 🌍 **11 locales** built-in
- ✅ **97%+ test coverage**

## Installation

```bash
npm install @pyyupsk/fdu
```

## Quick Start

```typescript
import { fdu } from "@pyyupsk/fdu";

const now = fdu();
const date = fdu("2025-09-30");

date.format("YYYY-MM-DD"); // '2025-09-30'
date.add(1, "day");
date.isBefore(now);
```

## Documentation

Visit [fdu.fasu.dev](https://fdu.fasu.dev) for full documentation.

## License

By contributing to `fdu`, you agree that your contributions will be licensed under the [MIT License](LICENSE).
