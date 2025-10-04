import type { LocaleConfig } from "../../core/types";

export const sv: LocaleConfig = {
  name: "sv",
  months: [
    "januari",
    "februari",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december",
  ],
  monthsShort: [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec",
  ],
  weekdays: [
    "söndag",
    "måndag",
    "tisdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lördag",
  ],
  weekdaysShort: ["sön", "mån", "tis", "ons", "tor", "fre", "lör"],
  weekdaysMin: ["sö", "må", "ti", "on", "to", "fr", "lö"],
  weekStart: 1,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY-MM-DD",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY [kl.] HH:mm",
    LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
  },
  ordinal: (n) => {
    const b = n % 10;
    const o = b === 1 || b === 2 ? "a" : "e";
    return n + o;
  },
};
