# isBefore()

Checks if the date is before another date.

## Signature

```typescript
isBefore(other: FduInstance): boolean
```

## Parameters

- `other` - Date to compare with

## Returns

`boolean` - `true` if this date is before the other date

## Examples

### Basic Comparison

```typescript
const date1 = fdu("2025-09-29");
const date2 = fdu("2025-09-30");

date1.isBefore(date2); // true
date2.isBefore(date1); // false
```

### With Time

```typescript
const morning = fdu("2025-09-30T08:00:00");
const afternoon = fdu("2025-09-30T14:00:00");

morning.isBefore(afternoon); // true
```

## Day.js Comparison

| Feature              | fdu | Day.js | Notes                           |
| -------------------- | --- | ------ | ------------------------------- |
| `isBefore(date)`     | ✅  | ✅     | Same API                        |
| Compare milliseconds | ✅  | ✅     | Exact comparison                |
| Unit granularity     | ❌  | ✅     | Day.js: `isBefore(date, 'day')` |

::: tip
For unit-based comparison, use `isSame()` to check if dates are in the same unit period.
:::

## Related

- [isAfter()](/docs/api-reference/comparison/is-after) - Check if after
- [isSame()](/docs/api-reference/comparison/is-same) - Check if same
- [diff()](/docs/api-reference/comparison/diff) - Calculate difference
