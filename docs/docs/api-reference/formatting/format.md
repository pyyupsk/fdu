# format()

Formats the date as a string using tokens.

## Signature

```typescript
format(pattern: string): string
```

## Parameters

- `pattern` - Format string with tokens (e.g., `'YYYY-MM-DD'`)

## Returns

`string` - Formatted date string

## Examples

### Basic Formatting

```typescript
const date = fdu("2025-09-30T14:30:45");

date.format("YYYY-MM-DD"); // "2025-09-30"
date.format("DD/MM/YYYY"); // "30/09/2025"
date.format("MMMM DD, YYYY"); // "September 30, 2025"
date.format("HH:mm:ss"); // "14:30:45"
```

### Escaped Text

Use square brackets `[...]` for literal text:

```typescript
date.format("[Today is] YYYY-MM-DD");
// "Today is 2025-09-30"

date.format("YYYY-MM-DD [at] HH:mm");
// "2025-09-30 at 14:30"
```

### Localized Formatting

```typescript
import { registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

registerLocale("es", es);

const date = fdu("2025-01-15");
date.locale("es").format("MMMM DD, YYYY");
// "enero 15, 2025"
```

## Format Tokens

### Year

- `YYYY` - 4-digit year (2025)
- `YY` - 2-digit year (25)

### Month

- `MMMM` - Full month name (September)
- `MMM` - Abbreviated month (Sep)
- `MM` - 2-digit month (09)
- `M` - Month number (9)

### Day of Month

- `DD` - 2-digit day (30)
- `Do` - Day with ordinal (30th)
- `D` - Day number (30)

### Day of Week

- `dddd` - Full weekday (Monday)
- `ddd` - Abbreviated weekday (Mon)
- `dd` - Minimal weekday (Mo)
- `d` - Day of week number (1)

### Hour

- `HH` - 24-hour, 2-digit (14)
- `H` - 24-hour (14)
- `hh` - 12-hour, 2-digit (02)
- `h` - 12-hour (2)

### Minute

- `mm` - 2-digit minute (30)
- `m` - Minute (30)

### Second

- `ss` - 2-digit second (45)
- `s` - Second (45)

### Millisecond

- `SSS` - 3-digit millisecond (123)

### AM/PM

- `A` - Uppercase (AM/PM)
- `a` - Lowercase (am/pm)

For complete token reference, see [Formatting Guide](/docs/formatting).

## Day.js Comparison

| Feature                           | fdu | Day.js | Notes                              |
| --------------------------------- | --- | ------ | ---------------------------------- |
| Basic tokens (YYYY, MM, DD, etc.) | ✅  | ✅     | Same syntax                        |
| Escaped text `[...]`              | ✅  | ✅     | Same syntax                        |
| Localized formatting              | ✅  | ✅     | Requires locale registration       |
| Predefined formats (L, LL, LLL)   | ❌  | ✅     | Day.js has locale-specific presets |
| Week of year (w, ww)              | ❌  | ✅     | Not implemented in fdu             |
| Quarter (Q)                       | ❌  | ✅     | Not implemented in fdu             |
| Day of year (DDD, DDDD)           | ❌  | ✅     | Not implemented in fdu             |
| Unix timestamp (X, x)             | ❌  | ✅     | Use `.valueOf()` instead           |
| Timezone (Z, ZZ)                  | ❌  | ✅     | Not implemented in fdu             |

::: tip
For timezone support, consider using the native `Intl.DateTimeFormat` API or a specialized timezone library.
:::

## Related

- [Formatting Guide](/docs/formatting) - Complete token reference
- [Localization](/docs/localization) - Use different languages
- [toISOString()](/docs/api-reference/conversion/to-iso-string) - ISO 8601 format
