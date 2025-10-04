# toDate()

Converts the fdu instance to a JavaScript Date object.

## Signature

```typescript
toDate(): Date
```

## Returns

`Date` - JavaScript Date object

## Examples

### Basic Conversion

```typescript
const fduDate = fdu("2025-09-30");
const jsDate = fduDate.toDate();

console.log(jsDate instanceof Date); // true
console.log(jsDate.getFullYear()); // 2025
```

### Use with Native APIs

```typescript
const date = fdu("2025-09-30T14:30:00").toDate();

// Use with Date methods
console.log(date.toLocaleDateString()); // "9/30/2025" (locale-dependent)
console.log(date.getTime()); // 1727712600000
```

## Day.js Comparison

| Feature             | fdu | Day.js | Notes         |
| ------------------- | --- | ------ | ------------- |
| `toDate()`          | ✅  | ✅     | Same API      |
| Returns native Date | ✅  | ✅     | Same behavior |

## Related

- [fdu()](/docs/api-reference/creation/fdu) - Create from Date
- [toISOString()](/docs/api-reference/conversion/to-iso-string) - ISO 8601 string
- [valueOf()](/docs/api-reference/conversion/value-of) - Unix timestamp
