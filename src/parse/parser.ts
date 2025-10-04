export function parse(input: string | number | Date): Date {
  if (input instanceof Date) {
    return new Date(input.getTime());
  }
  if (typeof input === "number" || typeof input === "string") {
    return new Date(input);
  }
  return new Date(NaN);
}
