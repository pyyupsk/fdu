# Getting Started

::: warning BETA VERSION
This package is currently in beta (v0.0.0-beta.1). The API and features may change in future releases. Please check the [changelog](https://github.com/pyyupsk/fdu/blob/main/CHANGELOG.md) for updates.
:::

## Quick Example

```typescript
import { fdu } from "@pyyupsk/fdu";

// Create a date
const now = fdu();
const date = fdu("2025-09-30");

// Format it
console.log(date.format("MMMM DD, YYYY")); // September 30, 2025

// Manipulate it
const tomorrow = date.add(1, "day");
const lastMonth = date.subtract(1, "month");

// Compare dates
console.log(tomorrow.isAfter(date)); // true
console.log(date.diff(tomorrow, "day")); // -1
```

## Core Concepts

### Immutability

All fdu methods return a new instance instead of modifying the original:

```typescript
const date = fdu("2025-09-30");
const modified = date.add(1, "day");

console.log(date.format("YYYY-MM-DD")); // 2025-09-30 (unchanged)
console.log(modified.format("YYYY-MM-DD")); // 2025-10-01 (new instance)
```

### Method Chaining

Chain methods for cleaner code:

```typescript
fdu("2025-09-30").add(1, "month").subtract(2, "day").format("MMMM DD, YYYY"); // October 29, 2025
```

### Localization

Support for 11 locales out of the box:

```typescript
import { registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

registerLocale("es", es);

fdu("2025-01-15").locale("es").format("MMMM DD, YYYY"); // enero 15, 2025
```

## Common Use Cases

### Display Dates

```typescript
const date = fdu("2025-09-30T14:30:00");

// Different formats
date.format("YYYY-MM-DD"); // 2025-09-30
date.format("MMM DD, YYYY"); // Sep 30, 2025
date.format("dddd, MMMM DD"); // Monday, September 30
date.format("h:mm A"); // 2:30 PM
```

### Calculate Differences

```typescript
const start = fdu("2025-01-01");
const end = fdu("2025-12-31");

end.diff(start, "day"); // 364
end.diff(start, "month"); // 11
end.diff(start, "year"); // 0
```

### Validate Dates

```typescript
fdu("2025-09-30").isValid(); // true
fdu("invalid").isValid(); // false
fdu("2025-02-30").isValid(); // false (invalid date)
```

### Query Date Parts

```typescript
const date = fdu("2025-09-30T14:30:45");

date.year(); // 2025
date.month(); // 8 (0-indexed)
date.date(); // 30
date.day(); // 1 (Monday)
date.hour(); // 14
date.minute(); // 30
date.second(); // 45
```

## Next Steps

- [Formatting Guide](/docs/formatting) - Learn all format tokens
- [Localization Guide](/docs/localization) - Use different languages
- [API Reference](/docs/api-reference/creation/fdu) - Explore all methods
