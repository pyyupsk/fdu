# toISOString()

Converts the date to an ISO 8601 formatted string.

## Signature

```typescript
toISOString(): string
```

## Returns

`string` - ISO 8601 formatted string (UTC timezone)

## Examples

### Basic Usage

```typescript
const date = fdu("2025-09-30T14:30:45.123");
console.log(date.toISOString());
// "2025-09-30T14:30:45.123Z"
```

### Always UTC

```typescript
const date = fdu("2025-09-30");
console.log(date.toISOString());
// Always ends with 'Z' (UTC timezone)
```

## Day.js Comparison

| Feature         | fdu | Day.js | Notes            |
| --------------- | --- | ------ | ---------------- |
| `toISOString()` | ✅  | ✅     | Same API         |
| ISO 8601 format | ✅  | ✅     | Same output      |
| UTC timezone    | ✅  | ✅     | Both output UTC  |
| `toJSON()`      | ❌  | ✅     | Day.js has alias |

::: tip
For custom formats, use `format()` instead of `toISOString()`.
:::

## Related

- [format()](/docs/api-reference/formatting/format) - Custom format
- [toDate()](/docs/api-reference/conversion/to-date) - JavaScript Date
- [valueOf()](/docs/api-reference/conversion/value-of) - Unix timestamp
