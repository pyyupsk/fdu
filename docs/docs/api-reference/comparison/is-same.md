# isSame()

Checks if the date is the same as another date, with optional unit granularity.

## Signature

```typescript
isSame(other: FduInstance, unit?: UnitType): boolean
```

## Parameters

- `other` - Date to compare with
- `unit` (optional) - Granularity of comparison

## Returns

`boolean` - `true` if dates are the same

## Examples

### Exact Comparison

```typescript
const date1 = fdu("2025-09-30T14:30:00");
const date2 = fdu("2025-09-30T14:30:00");
const date3 = fdu("2025-09-30T10:00:00");

date1.isSame(date2); // true (exact match)
date1.isSame(date3); // false (different times)
```

### Unit-based Comparison

```typescript
const date1 = fdu("2025-09-30T14:30:00");
const date2 = fdu("2025-09-30T10:00:00");

date1.isSame(date2, "day"); // true (same day)
date1.isSame(date2, "hour"); // false (different hours)
date1.isSame(date2, "month"); // true (same month)
date1.isSame(date2, "year"); // true (same year)
```

### Cross-month Comparison

```typescript
const jan31 = fdu("2025-01-31");
const feb1 = fdu("2025-02-01");

jan31.isSame(feb1, "month"); // false
jan31.isSame(feb1, "year"); // true
```

## Supported Units

- `year` or `y`
- `month` or `M`
- `day` or `d`
- `hour` or `h`
- `minute` or `m`
- `second` or `s`

## Day.js Comparison

| Feature              | fdu | Day.js | Notes                                                                           |
| -------------------- | --- | ------ | ------------------------------------------------------------------------------- |
| `isSame(date)`       | ✅  | ✅     | Exact comparison                                                                |
| `isSame(date, unit)` | ✅  | ✅     | Same API                                                                        |
| Supported units      | ⚠️  | ✅     | fdu: year, month, day, hour, minute, second<br>Day.js: also week, quarter, date |

## Related

- [isBefore()](/docs/api-reference/comparison/is-before) - Check if before
- [isAfter()](/docs/api-reference/comparison/is-after) - Check if after
- [diff()](/docs/api-reference/comparison/diff) - Calculate difference
