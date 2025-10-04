# fdu()

Creates a new date-time instance from various input types.

## Signature

```typescript
function fdu(input?: FduInput): FduInstance;
```

## Parameters

- `input` (optional) - The date input. Can be:
  - `undefined` - Current date/time
  - `string` - ISO 8601 date string
  - `number` - Unix timestamp (milliseconds)
  - `Date` - JavaScript Date object
  - `FduInstance` - Another fdu instance (clone)

## Returns

`FduInstance` - A new date-time instance

## Examples

### Current Date/Time

```typescript
const now = fdu();
console.log(now.format("YYYY-MM-DD HH:mm:ss"));
```

### From String

```typescript
// ISO 8601 string
const date1 = fdu("2025-09-30");
const date2 = fdu("2025-09-30T14:30:00");
const date3 = fdu("2025-09-30T14:30:00.000Z");

console.log(date1.format("YYYY-MM-DD")); // 2025-09-30
```

### From Timestamp

```typescript
// Unix timestamp in milliseconds
const date = fdu(1727712600000);
console.log(date.format("YYYY-MM-DD")); // 2025-09-30
```

### From Date Object

```typescript
const jsDate = new Date("2025-09-30");
const date = fdu(jsDate);
console.log(date.format("YYYY-MM-DD")); // 2025-09-30
```

### Clone Instance

```typescript
const original = fdu("2025-09-30");
const cloned = fdu(original);

console.log(cloned.format("YYYY-MM-DD")); // 2025-09-30
console.log(original === cloned); // false (different instances)
```

## Validation

Always check if a date is valid when parsing user input:

```typescript
const validDate = fdu("2025-09-30");
console.log(validDate.isValid()); // true

const invalidDate = fdu("invalid-date");
console.log(invalidDate.isValid()); // false
```

## Day.js Comparison

| Feature               | fdu | Day.js | Notes                                      |
| --------------------- | --- | ------ | ------------------------------------------ |
| `fdu()` / `dayjs()`   | ✅  | ✅     | Current date/time                          |
| String parsing        | ✅  | ✅     | ISO 8601 format                            |
| Custom format parsing | ❌  | ✅     | Day.js supports custom formats with plugin |
| Timestamp parsing     | ✅  | ✅     | Unix timestamp (ms)                        |
| Date object parsing   | ✅  | ✅     | JavaScript Date                            |
| Clone                 | ✅  | ✅     | Pass existing instance                     |
| Array parsing         | ❌  | ✅     | Day.js: `dayjs([2020, 0, 1])`              |
| Object parsing        | ❌  | ✅     | Day.js: `dayjs({ year: 2020 })`            |

::: tip
fdu focuses on standard ISO 8601 parsing. For custom formats, consider preprocessing your strings to ISO 8601 format.
:::

## Related

- [format()](/docs/api-reference/formatting/format) - Format dates as strings
- [isValid()](/docs/api-reference/conversion/is-valid) - Check if date is valid
- [toDate()](/docs/api-reference/conversion/to-date) - Convert to JavaScript Date
