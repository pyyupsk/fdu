# valueOf()

Gets the Unix timestamp in milliseconds.

## Signature

```typescript
valueOf(): number
```

## Returns

`number` - Unix timestamp (milliseconds since January 1, 1970 UTC)

## Examples

### Basic Usage

```typescript
const date = fdu("2025-09-30");
console.log(date.valueOf()); // 1727712000000
```

### Comparison

```typescript
const date1 = fdu("2025-09-30");
const date2 = fdu("2025-10-01");

console.log(date1.valueOf() < date2.valueOf()); // true
```

### Create from Timestamp

```typescript
const timestamp = fdu("2025-09-30").valueOf();
const restored = fdu(timestamp);

console.log(restored.format("YYYY-MM-DD")); // 2025-09-30
```

## Day.js Comparison

| Feature              | fdu | Day.js | Notes                            |
| -------------------- | --- | ------ | -------------------------------- |
| `valueOf()`          | ✅  | ✅     | Same API                         |
| Returns milliseconds | ✅  | ✅     | Same behavior                    |
| `unix()`             | ❌  | ✅     | Day.js: returns seconds (not ms) |

::: tip
Use `diff()` for more readable time differences instead of manual timestamp subtraction.
:::

## Related

- [fdu()](/docs/api-reference/creation/fdu) - Create from timestamp
- [diff()](/docs/api-reference/comparison/diff) - Calculate difference
- [toDate()](/docs/api-reference/conversion/to-date) - JavaScript Date
