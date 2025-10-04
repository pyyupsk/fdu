# Localization

fdu supports internationalization with 11 built-in locales. You can also create custom locales.

## Supported Locales

fdu includes the following locales out of the box:

- **en** - English (default)
- **es** - Spanish
- **fr** - French
- **de** - German
- **it** - Italian
- **pt** - Portuguese
- **ru** - Russian
- **ja** - Japanese
- **ko** - Korean
- **zh-cn** - Chinese (Simplified)
- **th** - Thai

## Using Locales

### Import and Register

Before using a locale, you must import and register it:

```typescript
import { fdu, registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

// Register the locale
registerLocale("es", es);

// Use with a specific date instance
const date = fdu("2025-01-15");
date.locale("es").format("MMMM"); // "enero"

// Or set as global default
import { locale } from "@pyyupsk/fdu";
locale("es");

fdu("2025-01-15").format("MMMM"); // "enero"
```

### Instance-Level Locale

Set the locale for a specific date instance:

```typescript
import { fdu, registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";
import { fr } from "@pyyupsk/fdu/locale/fr";

registerLocale("es", es);
registerLocale("fr", fr);

const date = fdu("2025-09-30");

// English (default)
date.format("MMMM DD, YYYY");
// "September 30, 2025"

// Spanish
date.locale("es").format("MMMM DD, YYYY");
// "septiembre 30, 2025"

// French
date.locale("fr").format("MMMM DD, YYYY");
// "septembre 30, 2025"
```

### Global Locale

Set the default locale for all new date instances:

```typescript
import { fdu, locale, registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

registerLocale("es", es);
locale("es"); // Set global default

// All new instances use Spanish
fdu("2025-01-15").format("MMMM"); // "enero"
fdu("2025-02-15").format("MMMM"); // "febrero"
```

## Locale Features

### Month Names

Locales provide full and abbreviated month names:

```typescript
import { fdu, registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

registerLocale("es", es);

const date = fdu("2025-01-15").locale("es");

date.format("MMMM"); // "enero" (full)
date.format("MMM"); // "ene" (abbreviated)
```

### Weekday Names

Locales provide full, abbreviated, and minimal weekday names:

```typescript
const date = fdu("2025-09-30").locale("es");

date.format("dddd"); // "lunes" (full)
date.format("ddd"); // "lun" (abbreviated)
date.format("dd"); // "lu" (minimal)
```

### Week Start

Different locales have different first days of the week:

```typescript
// English: week starts on Sunday (0)
en.weekStart; // 0

// Spanish: week starts on Monday (1)
es.weekStart; // 1
```

### Ordinal Numbers

Locales can customize ordinal number formatting:

```typescript
// English
fdu("2025-09-01").format("Do"); // "1st"
fdu("2025-09-02").format("Do"); // "2nd"
fdu("2025-09-03").format("Do"); // "3rd"
fdu("2025-09-21").format("Do"); // "21st"

// Spanish
fdu("2025-09-01").locale("es").format("Do"); // "1º"
fdu("2025-09-02").locale("es").format("Do"); // "2º"
```

### Predefined Formats

Locales can define common format patterns:

```typescript
import { es } from "@pyyupsk/fdu/locale/es";

es.formats = {
  LT: "H:mm", // Time
  LTS: "H:mm:ss", // Time with seconds
  L: "DD/MM/YYYY", // Short date
  LL: "D [de] MMMM [de] YYYY", // Long date
  LLL: "D [de] MMMM [de] YYYY H:mm", // Long date with time
  LLLL: "dddd, D [de] MMMM [de] YYYY H:mm", // Full date with time
};
```

## Examples by Locale

### Spanish (es)

```typescript
import { fdu, registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

registerLocale("es", es);
const date = fdu("2025-09-30T14:30:00").locale("es");

date.format("MMMM"); // "septiembre"
date.format("dddd"); // "lunes"
date.format("D [de] MMMM"); // "30 de septiembre"
date.format("dddd, D [de] MMMM"); // "lunes, 30 de septiembre"
```

### French (fr)

```typescript
import { fdu, registerLocale } from "@pyyupsk/fdu";
import { fr } from "@pyyupsk/fdu/locale/fr";

registerLocale("fr", fr);
const date = fdu("2025-09-30T14:30:00").locale("fr");

date.format("MMMM"); // "septembre"
date.format("dddd"); // "lundi"
date.format("D MMMM YYYY"); // "30 septembre 2025"
```

### Japanese (ja)

```typescript
import { fdu, registerLocale } from "@pyyupsk/fdu";
import { ja } from "@pyyupsk/fdu/locale/ja";

registerLocale("ja", ja);
const date = fdu("2025-09-30").locale("ja");

date.format("YYYY年M月D日"); // "2025年9月30日"
date.format("YYYY年MMMM"); // "2025年9月"
date.format("M月D日(ddd)"); // "9月30日(月)"
```

### Chinese (zh-cn)

```typescript
import { fdu, registerLocale } from "@pyyupsk/fdu";
import { zhCn } from "@pyyupsk/fdu/locale/zh-cn";

registerLocale("zh-cn", zhCn);
const date = fdu("2025-09-30").locale("zh-cn");

date.format("YYYY年MMMM"); // "2025年九月"
date.format("YYYY年M月D日"); // "2025年9月30日"
date.format("dddd"); // "星期一"
```

## Creating Custom Locales

You can create your own locale configuration:

```typescript
import { registerLocale } from "@pyyupsk/fdu";
import type { LocaleConfig } from "@pyyupsk/fdu";

const myLocale: LocaleConfig = {
  name: "my-locale",
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
  monthsShort: [
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
    "M7",
    "M8",
    "M9",
    "M10",
    "M11",
    "M12",
  ],
  weekdays: ["Day0", "Day1", "Day2", "Day3", "Day4", "Day5", "Day6"],
  weekdaysShort: ["D0", "D1", "D2", "D3", "D4", "D5", "D6"],
  weekdaysMin: ["0", "1", "2", "3", "4", "5", "6"],
  weekStart: 1, // 0=Sunday, 1=Monday
  ordinal: (n) => `${n}.`,
  meridiem: (hour, minute, isLower) => {
    if (hour < 12) return isLower ? "am" : "AM";
    return isLower ? "pm" : "PM";
  },
};

registerLocale("my-locale", myLocale);
```

### LocaleConfig Properties

```typescript
interface LocaleConfig {
  name: string; // Locale identifier
  months: readonly string[]; // 12 month names
  monthsShort?: readonly string[]; // 12 short month names (optional)
  weekdays: readonly string[]; // 7 weekday names (Sunday-Saturday)
  weekdaysShort?: readonly string[]; // 7 short weekday names (optional)
  weekdaysMin?: readonly string[]; // 7 minimal weekday names (optional)
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // First day of week
  formats?: LocaleFormats; // Predefined format patterns
  relativeTime?: RelativeTimeConfig; // Relative time expressions
  ordinal?: (n: number, period?: string) => string; // Ordinal formatter
  meridiem?: (hour: number, minute: number, isLower?: boolean) => string; // AM/PM
}
```

## Import Paths

All locales can be imported from their respective paths:

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

::: tip
Locales are tree-shakable. Only import and register the locales you actually use to keep your bundle size small.
:::

## Best Practices

1. **Only register locales you need** - This keeps your bundle size small
2. **Register locales once** - Typically at app initialization
3. **Use instance-level locales** - When displaying multiple locales on the same page
4. **Use global locale** - When your entire app uses a single locale
5. **Lazy load locales** - For larger apps, load locales on demand

```typescript
// Good: Lazy load locale when needed
async function switchToSpanish() {
  const { es } = await import("@pyyupsk/fdu/locale/es");
  registerLocale("es", es);
  locale("es");
}
```
