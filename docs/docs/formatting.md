# Formatting

The `format()` method allows you to convert dates into human-readable strings using format tokens.

## Basic Usage

```typescript
import { fdu } from "@pyyupsk/fdu";

const date = fdu("2025-09-30T14:30:45.123");

date.format("YYYY-MM-DD"); // "2025-09-30"
date.format("MMMM DD, YYYY"); // "September 30, 2025"
date.format("h:mm A"); // "2:30 PM"
```

## Format Tokens

### Year

| Token  | Output | Description  |
| ------ | ------ | ------------ |
| `YYYY` | 2025   | 4-digit year |
| `YY`   | 25     | 2-digit year |

```typescript
fdu("2025-09-30").format("YYYY"); // "2025"
fdu("2025-09-30").format("YY"); // "25"
```

### Month

| Token  | Output    | Description            |
| ------ | --------- | ---------------------- |
| `MMMM` | September | Full month name        |
| `MMM`  | Sep       | Abbreviated month name |
| `MM`   | 09        | 2-digit month (01-12)  |
| `M`    | 9         | Month number (1-12)    |

```typescript
fdu("2025-09-30").format("MMMM"); // "September"
fdu("2025-09-30").format("MMM"); // "Sep"
fdu("2025-09-30").format("MM"); // "09"
fdu("2025-09-30").format("M"); // "9"
```

::: tip
Month names are localized. See [Localization](/guide/localization) for details.
:::

### Day of Month

| Token | Output | Description             |
| ----- | ------ | ----------------------- |
| `DD`  | 30     | 2-digit day (01-31)     |
| `Do`  | 30th   | Day with ordinal suffix |
| `D`   | 30     | Day number (1-31)       |

```typescript
fdu("2025-09-05").format("DD"); // "05"
fdu("2025-09-05").format("Do"); // "5th"
fdu("2025-09-05").format("D"); // "5"
```

### Day of Week

| Token  | Output | Description                        |
| ------ | ------ | ---------------------------------- |
| `dddd` | Monday | Full weekday name                  |
| `ddd`  | Mon    | Abbreviated weekday name           |
| `dd`   | Mo     | Minimal weekday name               |
| `d`    | 1      | Day of week (0=Sunday, 6=Saturday) |

```typescript
fdu("2025-09-30").format("dddd"); // "Monday"
fdu("2025-09-30").format("ddd"); // "Mon"
fdu("2025-09-30").format("dd"); // "Mo"
fdu("2025-09-30").format("d"); // "1"
```

::: tip
Weekday names are localized. See [Localization](/guide/localization) for details.
:::

### Hour (24-hour)

| Token | Output | Description          |
| ----- | ------ | -------------------- |
| `HH`  | 14     | 2-digit hour (00-23) |
| `H`   | 14     | Hour (0-23)          |

```typescript
fdu("2025-09-30T14:30:00").format("HH"); // "14"
fdu("2025-09-30T14:30:00").format("H"); // "14"
fdu("2025-09-30T09:30:00").format("HH"); // "09"
fdu("2025-09-30T09:30:00").format("H"); // "9"
```

### Hour (12-hour)

| Token | Output | Description          |
| ----- | ------ | -------------------- |
| `hh`  | 02     | 2-digit hour (01-12) |
| `h`   | 2      | Hour (1-12)          |

```typescript
fdu("2025-09-30T14:30:00").format("hh"); // "02"
fdu("2025-09-30T14:30:00").format("h"); // "2"
fdu("2025-09-30T09:30:00").format("hh"); // "09"
fdu("2025-09-30T09:30:00").format("h"); // "9"
```

### Minute

| Token | Output | Description            |
| ----- | ------ | ---------------------- |
| `mm`  | 30     | 2-digit minute (00-59) |
| `m`   | 30     | Minute (0-59)          |

```typescript
fdu("2025-09-30T14:30:00").format("mm"); // "30"
fdu("2025-09-30T14:05:00").format("mm"); // "05"
fdu("2025-09-30T14:05:00").format("m"); // "5"
```

### Second

| Token | Output | Description            |
| ----- | ------ | ---------------------- |
| `ss`  | 45     | 2-digit second (00-59) |
| `s`   | 45     | Second (0-59)          |

```typescript
fdu("2025-09-30T14:30:45").format("ss"); // "45"
fdu("2025-09-30T14:30:05").format("ss"); // "05"
fdu("2025-09-30T14:30:05").format("s"); // "5"
```

### Millisecond

| Token | Output | Description                   |
| ----- | ------ | ----------------------------- |
| `SSS` | 123    | 3-digit millisecond (000-999) |

```typescript
fdu("2025-09-30T14:30:45.123").format("SSS"); // "123"
fdu("2025-09-30T14:30:45.007").format("SSS"); // "007"
```

### AM/PM

| Token | Output | Description        |
| ----- | ------ | ------------------ |
| `A`   | AM/PM  | Uppercase meridiem |
| `a`   | am/pm  | Lowercase meridiem |

```typescript
fdu("2025-09-30T14:30:00").format("A"); // "PM"
fdu("2025-09-30T09:30:00").format("A"); // "AM"
fdu("2025-09-30T14:30:00").format("a"); // "pm"
```

::: tip
AM/PM display can be customized per locale using the `meridiem` function.
:::

## Escaped Text

Text enclosed in square brackets `[...]` is treated as literal text and won't be formatted:

```typescript
const date = fdu("2025-09-30T14:30:00");

date.format("[Today is] YYYY-MM-DD");
// "Today is 2025-09-30"

date.format("YYYY-MM-DD [at] HH:mm");
// "2025-09-30 at 14:30"

date.format("[Year:] YYYY [Month:] MM [Day:] DD");
// "Year: 2025 Month: 09 Day: 30"
```

## Common Patterns

### ISO 8601

```typescript
date.format("YYYY-MM-DD"); // "2025-09-30"
date.format("YYYY-MM-DDTHH:mm:ss"); // "2025-09-30T14:30:45"
```

### US Format

```typescript
date.format("MM/DD/YYYY"); // "09/30/2025"
date.format("MMMM D, YYYY"); // "September 30, 2025"
date.format("MMM D, YYYY [at] h:mm A"); // "Sep 30, 2025 at 2:30 PM"
```

### European Format

```typescript
date.format("DD/MM/YYYY"); // "30/09/2025"
date.format("D MMMM YYYY"); // "30 September 2025"
date.format("dddd, D MMMM YYYY"); // "Monday, 30 September 2025"
```

### Time Only

```typescript
date.format("HH:mm"); // "14:30" (24-hour)
date.format("HH:mm:ss"); // "14:30:45" (24-hour with seconds)
date.format("h:mm A"); // "2:30 PM" (12-hour)
date.format("h:mm:ss a"); // "2:30:45 pm" (12-hour with seconds)
```

### Full Date and Time

```typescript
date.format("dddd, MMMM D, YYYY [at] h:mm A");
// "Monday, September 30, 2025 at 2:30 PM"

date.format("YYYY-MM-DD HH:mm:ss");
// "2025-09-30 14:30:45"

date.format("ddd, MMM D, YYYY - h:mm A");
// "Mon, Sep 30, 2025 - 2:30 PM"
```

## Localized Formatting

Different locales may display dates differently. See the [Localization guide](/guide/localization) for details:

```typescript
import { registerLocale } from "@pyyupsk/fdu";
import { es } from "@pyyupsk/fdu/locale/es";

registerLocale("es", es);

const date = fdu("2025-09-30");

// English
date.format("MMMM D, YYYY"); // "September 30, 2025"

// Spanish
date.locale("es").format("MMMM D, YYYY"); // "septiembre 30, 2025"
```

## Performance Tips

::: tip
For best performance:

- Reuse format strings when formatting many dates
- Avoid complex patterns with many escaped sections
- Use simpler tokens when possible (e.g., `M` instead of `MMMM` if you don't need the full name)
  :::
