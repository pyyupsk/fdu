# add()

Adds the specified amount of time to the date.

## Signature

```typescript
add(value: number, unit: UnitType): FduInstance
```

## Parameters

- `value` - Amount to add (can be negative)
- `unit` - Time unit: `'year'|'y'|'month'|'M'|'week'|'w'|'day'|'d'|'hour'|'h'|'minute'|'m'|'second'|'s'|'millisecond'|'ms'`

## Returns

`FduInstance` - New instance with added time (immutable)

## Examples

### Add Days

```typescript
const date = fdu("2025-09-30");

date.add(1, "day").format("YYYY-MM-DD"); // 2025-10-01
date.add(7, "days").format("YYYY-MM-DD"); // 2025-10-07
date.add(1, "d").format("YYYY-MM-DD"); // 2025-10-01 (shorthand)
```

### Add Months

```typescript
const date = fdu("2025-09-30");

date.add(1, "month").format("YYYY-MM-DD"); // 2025-10-30
date.add(3, "M").format("YYYY-MM-DD"); // 2025-12-30
```

### Add Years

```typescript
const date = fdu("2025-09-30");

date.add(1, "year").format("YYYY-MM-DD"); // 2026-09-30
date.add(5, "y").format("YYYY-MM-DD"); // 2030-09-30
```

### Add Time Units

```typescript
const date = fdu("2025-09-30T10:00:00");

date.add(1, "hour").format("HH:mm:ss"); // 11:00:00
date.add(30, "minute").format("HH:mm:ss"); // 10:30:00
date.add(45, "second").format("HH:mm:ss"); // 10:00:45
```

### Add Weeks

```typescript
const date = fdu("2025-09-30");

date.add(1, "week").format("YYYY-MM-DD"); // 2025-10-07
date.add(2, "w").format("YYYY-MM-DD"); // 2025-10-14
```

### Method Chaining

```typescript
fdu("2025-09-30")
  .add(1, "month")
  .add(2, "day")
  .add(3, "hour")
  .format("YYYY-MM-DD HH:mm");
// 2025-11-01 03:00
```

### Immutability

```typescript
const original = fdu("2025-09-30");
const modified = original.add(1, "day");

console.log(original.format("YYYY-MM-DD")); // 2025-09-30 (unchanged)
console.log(modified.format("YYYY-MM-DD")); // 2025-10-01 (new instance)
```

## Unit Aliases

| Full          | Shorthand |
| ------------- | --------- |
| `year`        | `y`       |
| `month`       | `M`       |
| `week`        | `w`       |
| `day`         | `d`       |
| `hour`        | `h`       |
| `minute`      | `m`       |
| `second`      | `s`       |
| `millisecond` | `ms`      |

## Day.js Comparison

| Feature                         | fdu | Day.js | Notes                                     |
| ------------------------------- | --- | ------ | ----------------------------------------- |
| `add(value, unit)`              | ✅  | ✅     | Same API                                  |
| Years, months, weeks, days      | ✅  | ✅     | Same behavior                             |
| Hours, minutes, seconds, ms     | ✅  | ✅     | Same behavior                             |
| Unit shorthands (y, M, d, etc.) | ✅  | ✅     | Same syntax                               |
| Plural units ('days', 'months') | ❌  | ✅     | fdu: use singular only                    |
| Immutability                    | ✅  | ✅     | Both return new instances                 |
| Negative values                 | ✅  | ✅     | Works in both (adds negative = subtracts) |

::: tip
Use `subtract()` for better readability when subtracting time, instead of `add()` with negative values.
:::

## Related

- [subtract()](/docs/api-reference/manipulation/subtract) - Subtract time
- [diff()](/docs/api-reference/comparison/diff) - Calculate difference between dates
