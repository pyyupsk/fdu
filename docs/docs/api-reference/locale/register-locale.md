# registerLocale()

Registers a locale configuration for global use.

## Signature

```typescript
import { registerLocale } from '@pyyupsk/fdu';

registerLocale(name: string, config: LocaleConfig): void
```

## Parameters

- `name` - Locale identifier (e.g., `'es'`, `'fr'`)
- `config` - Locale configuration object

## Examples

### Register Built-in Locale

```typescript
import { registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

registerLocale("es", es);

// Now Spanish locale is available
fdu("2025-01-15").locale("es").format("MMMM"); // "enero"
```

### Register Multiple Locales

```typescript
import { registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";
import { fr } from "@pyyupsk/fdu/locale/fr";
import { de } from "@pyyupsk/fdu/locale/de";

registerLocale("es", es);
registerLocale("fr", fr);
registerLocale("de", de);
```

### Create Custom Locale

```typescript
import { registerLocale } from "@pyyupsk/fdu";
import type { LocaleConfig } from "@pyyupsk/fdu";

const myLocale: LocaleConfig = {
  name: "custom",
  months: [
    "Month1",
    "Month2",
    "Month3",
    "Month4",
    "Month5",
    "Month6",
    "Month7",
    "Month8",
    "Month9",
    "Month10",
    "Month11",
    "Month12",
  ],
  weekdays: ["Day0", "Day1", "Day2", "Day3", "Day4", "Day5", "Day6"],
  weekStart: 1,
  ordinal: (n) => `${n}.`,
};

registerLocale("custom", myLocale);
```

## LocaleConfig Type

```typescript
interface LocaleConfig {
  name: string;
  months: readonly [string, string, ...];         // 12 month names
  monthsShort?: readonly [string, string, ...];   // 12 short names (optional)
  weekdays: readonly [string, string, ...];       // 7 weekday names
  weekdaysShort?: readonly [string, string, ...]; // 7 short names (optional)
  weekdaysMin?: readonly [string, string, ...];   // 7 minimal names (optional)
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;          // First day of week
  ordinal?: (n: number) => string;                // Ordinal formatter
  meridiem?: (hour: number, minute: number, isLower?: boolean) => string; // AM/PM
}
```

## Import Paths

All built-in locales use the same import pattern:

```typescript
import { en } from "@pyyupsk/fdu/locale/en";
import { es } from "@pyyupsk/fdu/locale/es";
import { fr } from "@pyyupsk/fdu/locale/fr";
import { de } from "@pyyupsk/fdu/locale/de";
import { it } from "@pyyupsk/fdu/locale/it";
import { pt } from "@pyyupsk/fdu/locale/pt";
import { ru } from "@pyyupsk/fdu/locale/ru";
import { ja } from "@pyyupsk/fdu/locale/ja";
import { ko } from "@pyyupsk/fdu/locale/ko";
import { zhCn } from "@pyyupsk/fdu/locale/zh-cn";
import { th } from "@pyyupsk/fdu/locale/th";
```

## Best Practices

### Register Once at App Init

```typescript
// app.ts or main.ts
import { registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";
import { fr } from "@pyyupsk/fdu/locale/fr";

registerLocale("es", es);
registerLocale("fr", fr);
```

### Lazy Load Locales

```typescript
async function loadSpanishLocale() {
  const { es } = await import("@pyyupsk/fdu/locale/es");
  registerLocale("es", es);
}
```

### Tree-shaking

Only import locales you use to keep bundle size small:

```typescript
// ✅ Good - only imports Spanish
import { es } from "@pyyupsk/fdu/locale/es";

// ❌ Avoid - imports all locales (if you had a barrel export)
// import * as locales from '@pyyupsk/fdu/locale';
```

## Day.js Comparison

| Feature             | fdu | Day.js | Notes                            |
| ------------------- | --- | ------ | -------------------------------- |
| Manual registration | ✅  | ✅     | Both require manual registration |
| Tree-shakable       | ✅  | ✅     | Both support tree-shaking        |
| Auto-loading        | ❌  | ✅     | Day.js can auto-load via webpack |
| Number of locales   | 11  | 100+   | Day.js has more locales          |
| Custom locales      | ✅  | ✅     | Both support custom              |

## Related

- [locale()](/docs/api-reference/locale/locale) - Get/set locale
- [Localization Guide](/docs/localization) - Complete locale guide
- [format()](/docs/api-reference/formatting/format) - Format with locale
