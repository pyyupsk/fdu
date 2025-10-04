# subtract()

Subtracts the specified amount of time from the date.

## Signature

```typescript
subtract(value: number, unit: UnitType): FduInstance
```

## Parameters

- `value` - Amount to subtract
- `unit` - Time unit: `'year'|'y'|'month'|'M'|'week'|'w'|'day'|'d'|'hour'|'h'|'minute'|'m'|'second'|'s'|'millisecond'|'ms'`

## Returns

`FduInstance` - New instance with subtracted time (immutable)

## Examples

### Subtract Days

```typescript
const date = fdu("2025-09-30");

date.subtract(1, "day").format("YYYY-MM-DD"); // 2025-09-29
date.subtract(7, "day").format("YYYY-MM-DD"); // 2025-09-23
```

### Subtract Months

```typescript
const date = fdu("2025-09-30");

date.subtract(1, "month").format("YYYY-MM-DD"); // 2025-08-30
date.subtract(3, "M").format("YYYY-MM-DD"); // 2025-06-30
```

### Subtract Years

```typescript
const date = fdu("2025-09-30");

date.subtract(1, "year").format("YYYY-MM-DD"); // 2024-09-30
date.subtract(5, "y").format("YYYY-MM-DD"); // 2020-09-30
```

### Combine with add()

```typescript
fdu("2025-09-30").add(1, "month").subtract(2, "day").format("YYYY-MM-DD");
// 2025-10-28
```

## Day.js Comparison

| Feature                 | fdu | Day.js | Notes                     |
| ----------------------- | --- | ------ | ------------------------- |
| `subtract(value, unit)` | ✅  | ✅     | Same API                  |
| All time units          | ✅  | ✅     | Same behavior             |
| Immutability            | ✅  | ✅     | Both return new instances |

## Related

- [add()](/docs/api-reference/manipulation/add) - Add time
- [diff()](/docs/api-reference/comparison/diff) - Calculate difference
