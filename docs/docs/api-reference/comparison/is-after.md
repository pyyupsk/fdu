# isAfter()

Checks if the date is after another date.

## Signature

```typescript
isAfter(other: FduInstance): boolean
```

## Parameters

- `other` - Date to compare with

## Returns

`boolean` - `true` if this date is after the other date

## Examples

### Basic Comparison

```typescript
const date1 = fdu("2025-09-30");
const date2 = fdu("2025-09-29");

date1.isAfter(date2); // true
date2.isAfter(date1); // false
```

### With Time

```typescript
const afternoon = fdu("2025-09-30T14:00:00");
const morning = fdu("2025-09-30T08:00:00");

afternoon.isAfter(morning); // true
```

## Day.js Comparison

| Feature              | fdu | Day.js | Notes                          |
| -------------------- | --- | ------ | ------------------------------ |
| `isAfter(date)`      | ✅  | ✅     | Same API                       |
| Compare milliseconds | ✅  | ✅     | Exact comparison               |
| Unit granularity     | ❌  | ✅     | Day.js: `isAfter(date, 'day')` |

## Related

- [isBefore()](/docs/api-reference/comparison/is-before) - Check if before
- [isSame()](/docs/api-reference/comparison/is-same) - Check if same
- [diff()](/docs/api-reference/comparison/diff) - Calculate difference
