export type FduInstance = {
  format(pattern: string): string;
  add(value: number, unit: UnitType): FduInstance;
  subtract(value: number, unit: UnitType): FduInstance;
  isBefore(other: FduInstance): boolean;
  isAfter(other: FduInstance): boolean;
  isSame(other: FduInstance, unit?: UnitType): boolean;
  diff(other: FduInstance, unit?: UnitType): number;
  year(): number;
  month(): number;
  date(): number;
  hour(): number;
  minute(): number;
  second(): number;
  millisecond(): number;
  day(): number;
  locale(): string;
  locale(name: string): FduInstance;
  toDate(): Date;
  toISOString(): string;
  valueOf(): number;
  isValid(): boolean;
};

export type FduInput = Date | string | number | FduInstance | undefined;

export type UnitType =
  | "year"
  | "y"
  | "month"
  | "M"
  | "week"
  | "w"
  | "day"
  | "d"
  | "hour"
  | "h"
  | "minute"
  | "m"
  | "second"
  | "s"
  | "millisecond"
  | "ms";

export type LocaleFormats = {
  LT?: string;
  LTS?: string;
  L?: string;
  LL?: string;
  LLL?: string;
  LLLL?: string;
};

export type RelativeTimeConfig = {
  future?: string;
  past?: string;
  s?: string;
  m?: string;
  mm?: string;
  h?: string;
  hh?: string;
  d?: string;
  dd?: string;
  M?: string;
  MM?: string;
  y?: string;
  yy?: string;
};

export type LocaleConfig = {
  name: string;
  months: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  monthsShort?: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  weekdays: readonly [string, string, string, string, string, string, string];
  weekdaysShort?: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  weekdaysMin?: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  formats?: LocaleFormats;
  relativeTime?: RelativeTimeConfig;
  ordinal?: (n: number, period?: string) => string;
  meridiem?: (hour: number, minute: number, isLower?: boolean) => string;
};

export function normalizeUnit(unit: UnitType): UnitType {
  const unitMap: Record<string, UnitType> = {
    y: "year",
    M: "month",
    w: "week",
    d: "day",
    h: "hour",
    m: "minute",
    s: "second",
    ms: "millisecond",
  };
  return unitMap[unit] || unit;
}
