# diff()

Calculates the difference between two dates in the specified unit.

## Signature

```typescript
diff(other: FduInstance, unit?: UnitType): number
```

## Parameters

- `other` - Date to compare with
- `unit` (optional) - Unit for the difference (default: `'millisecond'`)

## Returns

`number` - Difference in the specified unit

## Examples

### Milliseconds (Default)

```typescript
const date1 = fdu("2025-09-30");
const date2 = fdu("2025-10-01");

date2.diff(date1); // 86400000 (1 day in ms)
```

### Days

```typescript
const start = fdu("2025-09-30");
const end = fdu("2025-10-05");

end.diff(start, "day"); // 5
start.diff(end, "day"); // -5
```

### Months

```typescript
const jan = fdu("2025-01-15");
const mar = fdu("2025-03-15");

mar.diff(jan, "month"); // 2
```

### Years

```typescript
const now = fdu("2025-09-30");
const future = fdu("2030-09-30");

future.diff(now, "year"); // 5
```

### Hours and Minutes

```typescript
const morning = fdu("2025-09-30T08:00:00");
const afternoon = fdu("2025-09-30T14:30:00");

afternoon.diff(morning, "hour"); // 6
afternoon.diff(morning, "minute"); // 390
```

### Negative Differences

```typescript
const later = fdu("2025-10-01");
const earlier = fdu("2025-09-30");

earlier.diff(later, "day"); // -1
```

## Supported Units

- `year` or `y`
- `month` or `M`
- `week` or `w`
- `day` or `d`
- `hour` or `h`
- `minute` or `m`
- `second` or `s`
- `millisecond` or `ms` (default)

## Day.js Comparison

| Feature            | fdu | Day.js | Notes                                           |
| ------------------ | --- | ------ | ----------------------------------------------- |
| `diff(date, unit)` | ✅  | ✅     | Same API                                        |
| All time units     | ✅  | ✅     | Same units supported                            |
| Negative values    | ✅  | ✅     | Both support negative diffs                     |
| Float option       | ❌  | ✅     | Day.js: `diff(date, 'day', true)` returns float |
| Quarter unit       | ❌  | ✅     | Day.js supports `'quarter'`                     |

::: tip
fdu always returns integers (floor). For precise decimal differences, calculate in smaller units (e.g., hours instead of days).
:::

## Related

- [isBefore()](/docs/api-reference/comparison/is-before) - Check if before
- [isAfter()](/docs/api-reference/comparison/is-after) - Check if after
- [isSame()](/docs/api-reference/comparison/is-same) - Check if same
