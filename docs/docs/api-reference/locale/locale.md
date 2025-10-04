# locale()

Gets or sets the locale for a date instance, or sets the global default locale.

## Instance Method

### Signature

```typescript
// Get current locale
locale(): string

// Set locale (returns new instance)
locale(name: string): FduInstance
```

### Parameters

- `name` - Locale code (e.g., `'en'`, `'es'`, `'fr'`)

### Returns

- Getter: `string` - Current locale code
- Setter: `FduInstance` - New instance with locale set

### Examples

#### Get Current Locale

```typescript
const date = fdu("2025-09-30");
console.log(date.locale()); // "en" (default)
```

#### Set Instance Locale

```typescript
import { registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

registerLocale("es", es);

const date = fdu("2025-01-15");
const spanishDate = date.locale("es");

console.log(spanishDate.format("MMMM")); // "enero"
console.log(date.format("MMMM")); // "January" (original unchanged)
```

#### Chain Locale Changes

```typescript
import { registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";
import { fr } from "@pyyupsk/fdu/locale/fr";

registerLocale("es", es);
registerLocale("fr", fr);

const date = fdu("2025-01-15");

date.locale("es").format("MMMM"); // "enero"
date.locale("fr").format("MMMM"); // "janvier"
```

## Global Function

### Signature

```typescript
import { locale } from '@pyyupsk/fdu';

locale(name: string): void
```

### Parameters

- `name` - Locale code to set as global default

### Examples

#### Set Global Default

```typescript
import { locale, registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

registerLocale("es", es);
locale("es");

// All new instances use Spanish
fdu("2025-01-15").format("MMMM"); // "enero"
fdu("2025-02-15").format("MMMM"); // "febrero"
```

## Supported Locales

- `en` - English (default)
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `ru` - Russian
- `ja` - Japanese
- `ko` - Korean
- `zh-cn` - Chinese (Simplified)
- `th` - Thai

## Day.js Comparison

| Feature                | fdu | Day.js | Notes                   |
| ---------------------- | --- | ------ | ----------------------- |
| `.locale()` getter     | ✅  | ✅     | Get current locale      |
| `.locale(name)` setter | ✅  | ✅     | Set instance locale     |
| Global `locale(name)`  | ✅  | ✅     | Set default locale      |
| Built-in locales       | 11  | 100+   | Day.js has more locales |
| Locale auto-loading    | ❌  | ✅     | Day.js can auto-load    |
| Custom locales         | ✅  | ✅     | Both support custom     |

::: tip
Always register locales before using them. Unregistered locales will fall back to English with a console warning.
:::

## Related

- [registerLocale()](/docs/api-reference/locale/register-locale) - Register new locale
- [Localization Guide](/docs/localization) - Complete locale guide
- [format()](/docs/api-reference/formatting/format) - Format with locale
