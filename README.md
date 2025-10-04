# fdu (faster date-time utility)

**Ultra-fast, zero-dependency JavaScript date-time utility library**

[![Test Coverage](https://codecov.io/gh/pyyupsk/fdu/graph/badge.svg?token=PTRS3e8yzc)](https://codecov.io/gh/pyyupsk/fdu)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

📚 **[Documentation](https://fdu.fasu.dev)** • 🚀 **[Getting Started](https://fdu.fasu.dev/guide)** • 🌐 **[API Reference](https://fdu.fasu.dev/api)**

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

## Usage

```typescript
import fdu from "@pyyupsk/fdu";

// Create
const now = fdu();
const date = fdu("2025-09-30");

// Format
date.format("YYYY-MM-DD"); // '2025-09-30'
date.format("MMMM DD, YYYY"); // 'September 30, 2025'
date.format("dddd [at] HH:mm"); // 'Monday at 14:30'

// Manipulate
date.add(1, "day");
date.subtract(1, "month");

// Compare
date.isBefore(now);
date.isAfter(now);
date.diff(now, "day");

// Locale
import { registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

registerLocale("es", es);
fdu("2025-01-15").locale("es").format("MMMM"); // 'enero'
```

## Format Tokens

| Token  | Output    | Description        |
| ------ | --------- | ------------------ |
| `YYYY` | 2025      | 4-digit year       |
| `MM`   | 09        | 2-digit month      |
| `DD`   | 30        | 2-digit day        |
| `HH`   | 14        | 2-digit hour (24h) |
| `mm`   | 30        | 2-digit minute     |
| `ss`   | 45        | 2-digit second     |
| `MMMM` | September | Full month name    |
| `dddd` | Monday    | Full weekday name  |
| `A`    | PM        | AM/PM              |

[See all tokens →](https://fdu.fasu.dev/api/format)

## Supported Locales

`en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `ja`, `ko`, `zh-cn`, `th`

## API

### Creation

- `fdu()` - Current date
- `fdu(string)` - From ISO string
- `fdu(Date)` - From Date object
- `fdu(number)` - From timestamp

### Manipulation

- `.add(value, unit)` - Add time
- `.subtract(value, unit)` - Subtract time

### Comparison

- `.isBefore(date)` - Check if before
- `.isAfter(date)` - Check if after
- `.isSame(date, unit?)` - Check if same
- `.diff(date, unit?)` - Calculate difference

### Query

- `.year()`, `.month()`, `.date()`, `.day()`
- `.hour()`, `.minute()`, `.second()`, `.millisecond()`

### Conversion

- `.format(pattern)` - Format to string
- `.toDate()` - To Date object
- `.toISOString()` - To ISO string
- `.valueOf()` - To timestamp
- `.isValid()` - Check validity

### Locale

- `.locale(name?)` - Get/set locale
- `locale(name)` - Set global locale
- `registerLocale(name, config)` - Register locale

## Learn More

- 📚 [Full Documentation](https://fdu.fasu.dev)
- 🎯 [Examples](https://fdu.fasu.dev/examples)
- 🌍 [Locale Guide](https://fdu.fasu.dev/guide/localization)
- ⚡ [Performance](https://fdu.fasu.dev/guide/performance)

## License

MIT © [Pongsakorn Thipayanate](https://github.com/pyyupsk)
