# Get Date/Time Components

Query individual date and time components.

## Methods

### year()

Gets the 4-digit year.

```typescript
year(): number
```

**Example:**

```typescript
fdu("2025-09-30").year(); // 2025
```

---

### month()

Gets the month (0-indexed, where 0 = January).

```typescript
month(): number
```

**Example:**

```typescript
fdu("2025-09-30").month(); // 8 (September)
fdu("2025-01-15").month(); // 0 (January)
```

---

### date()

Gets the day of the month (1-31).

```typescript
date(): number
```

**Example:**

```typescript
fdu("2025-09-30").date(); // 30
fdu("2025-09-05").date(); // 5
```

---

### day()

Gets the day of the week (0-6, where 0 = Sunday).

```typescript
day(): number
```

**Example:**

```typescript
fdu("2025-09-30").day(); // 1 (Monday)
fdu("2025-09-28").day(); // 0 (Sunday)
```

---

### hour()

Gets the hour (0-23).

```typescript
hour(): number
```

**Example:**

```typescript
fdu("2025-09-30T14:30:00").hour(); // 14
fdu("2025-09-30T09:00:00").hour(); // 9
```

---

### minute()

Gets the minute (0-59).

```typescript
minute(): number
```

**Example:**

```typescript
fdu("2025-09-30T14:30:00").minute(); // 30
fdu("2025-09-30T14:05:00").minute(); // 5
```

---

### second()

Gets the second (0-59).

```typescript
second(): number
```

**Example:**

```typescript
fdu("2025-09-30T14:30:45").second(); // 45
fdu("2025-09-30T14:30:05").second(); // 5
```

---

### millisecond()

Gets the millisecond (0-999).

```typescript
millisecond(): number
```

**Example:**

```typescript
fdu("2025-09-30T14:30:45.123").millisecond(); // 123
fdu("2025-09-30T14:30:45.007").millisecond(); // 7
```

## Complete Example

```typescript
const date = fdu("2025-09-30T14:30:45.123");

console.log({
  year: date.year(), // 2025
  month: date.month(), // 8
  date: date.date(), // 30
  day: date.day(), // 1
  hour: date.hour(), // 14
  minute: date.minute(), // 30
  second: date.second(), // 45
  millisecond: date.millisecond(), // 123
});
```

## Day.js Comparison

| Method             | fdu | Day.js | Notes                                       |
| ------------------ | --- | ------ | ------------------------------------------- |
| `year()`           | ✅  | ✅     | Same                                        |
| `month()`          | ✅  | ✅     | Both 0-indexed                              |
| `date()`           | ✅  | ✅     | Same                                        |
| `day()`            | ✅  | ✅     | Both 0-6 (Sun-Sat)                          |
| `hour()`           | ✅  | ✅     | Same                                        |
| `minute()`         | ✅  | ✅     | Same                                        |
| `second()`         | ✅  | ✅     | Same                                        |
| `millisecond()`    | ✅  | ✅     | Same                                        |
| **Setters**        | ❌  | ✅     | Day.js: `year(2020)`, `month(0)`, etc.      |
| `week()`           | ❌  | ✅     | Day.js supports week of year                |
| `quarter()`        | ❌  | ✅     | Day.js supports quarter                     |
| `dayOfYear()`      | ❌  | ✅     | Day.js supports day of year                 |
| `weekday()`        | ❌  | ✅     | Day.js locale-aware day of week             |
| `isoWeekday()`     | ❌  | ✅     | Day.js ISO weekday (1-7)                    |
| `weekYear()`       | ❌  | ✅     | Day.js week year                            |
| `isoWeek()`        | ❌  | ✅     | Day.js ISO week                             |
| `isoWeeksInYear()` | ❌  | ✅     | Day.js ISO weeks in year                    |
| `get(unit)`        | ❌  | ✅     | Day.js: `get('year')`, `get('month')`, etc. |
| `set(unit, value)` | ❌  | ✅     | Day.js: `set('year', 2020)`, etc.           |

::: tip
fdu is **read-only** for querying. To modify values, use `add()` or `subtract()` methods.
:::

## Related

- [format()](/docs/api-reference/formatting/format) - Format as string
- [add()](/docs/api-reference/manipulation/add) - Add time
- [subtract()](/docs/api-reference/manipulation/subtract) - Subtract time
