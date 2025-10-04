# isValid()

Checks if the date instance is valid.

## Signature

```typescript
isValid(): boolean
```

## Returns

`boolean` - `true` if the date is valid, `false` otherwise

## Examples

### Valid Dates

```typescript
fdu("2025-09-30").isValid(); // true
fdu(new Date()).isValid(); // true
fdu(1727712000000).isValid(); // true
```

### Invalid Dates

```typescript
fdu("invalid-date").isValid(); // false
fdu("2025-13-45").isValid(); // false (invalid month/day)
fdu("not a date").isValid(); // false
fdu(NaN).isValid(); // false
```

### Validation Before Use

```typescript
function formatDate(input: string): string {
  const date = fdu(input);

  if (!date.isValid()) {
    return "Invalid date";
  }

  return date.format("MMMM DD, YYYY");
}

console.log(formatDate("2025-09-30")); // "September 30, 2025"
console.log(formatDate("invalid")); // "Invalid date"
```

## Day.js Comparison

| Feature          | fdu | Day.js | Notes                    |
| ---------------- | --- | ------ | ------------------------ |
| `isValid()`      | ✅  | ✅     | Same API                 |
| Validation logic | ✅  | ✅     | Both check Date validity |

::: warning
Always validate user input dates before using them in calculations or formatting.
:::

## Related

- [fdu()](/docs/api-reference/creation/fdu) - Create date instance
- [format()](/docs/api-reference/formatting/format) - Format dates
