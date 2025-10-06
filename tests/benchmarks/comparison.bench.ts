import { fdu } from "@pyyupsk/fdu";
import {
  add as dateFnsAdd,
  format as dateFnsFormat,
  isBefore as dateFnsIsBefore,
  parse as dateFnsParse,
} from "date-fns";
import dayjs from "dayjs";
import { DateTime } from "luxon";
import { bench, describe } from "vitest";

const TEST_DATE = "2025-09-30T14:35:45.123Z";

describe("Library Comparison: Date Parsing", () => {
  const referenceDate = new Date();

  bench("@pyyupsk/fdu - parse ISO string", () => {
    fdu(TEST_DATE);
  });

  bench("Day.js - parse ISO string", () => {
    dayjs(TEST_DATE);
  });

  bench("date-fns - parse ISO string", () => {
    dateFnsParse(TEST_DATE, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", referenceDate);
  });

  bench("Luxon - parse ISO string", () => {
    DateTime.fromISO(TEST_DATE);
  });
});

describe("Library Comparison: Date Formatting", () => {
  const fduDate = fdu(TEST_DATE);
  const dayjsDate = dayjs(TEST_DATE);
  const nativeDate = new Date(TEST_DATE);
  const luxonDate = DateTime.fromISO(TEST_DATE);

  bench("@pyyupsk/fdu - format YYYY-MM-DD HH:mm:ss", () => {
    fduDate.format("YYYY-MM-DD HH:mm:ss");
  });

  bench("Day.js - format YYYY-MM-DD HH:mm:ss", () => {
    dayjsDate.format("YYYY-MM-DD HH:mm:ss");
  });

  bench("date-fns - format yyyy-MM-dd HH:mm:ss", () => {
    dateFnsFormat(nativeDate, "yyyy-MM-dd HH:mm:ss");
  });

  bench("Luxon - format yyyy-MM-dd HH:mm:ss", () => {
    luxonDate.toFormat("yyyy-MM-dd HH:mm:ss");
  });
});

describe("Library Comparison: Date Manipulation", () => {
  const fduDate = fdu(TEST_DATE);
  const dayjsDate = dayjs(TEST_DATE);
  const nativeDate = new Date(TEST_DATE);
  const luxonDate = DateTime.fromISO(TEST_DATE);

  bench("@pyyupsk/fdu - add 1 day", () => {
    fduDate.add(1, "day");
  });

  bench("Day.js - add 1 day", () => {
    dayjsDate.add(1, "day");
  });

  bench("date-fns - add 1 day", () => {
    dateFnsAdd(nativeDate, { days: 1 });
  });

  bench("Luxon - add 1 day", () => {
    luxonDate.plus({ days: 1 });
  });
});

describe("Library Comparison: Date Comparison", () => {
  const fduDate1 = fdu("2025-09-30");
  const fduDate2 = fdu("2025-10-01");
  const dayjsDate1 = dayjs("2025-09-30");
  const dayjsDate2 = dayjs("2025-10-01");
  const nativeDate1 = new Date("2025-09-30");
  const nativeDate2 = new Date("2025-10-01");
  const luxonDate1 = DateTime.fromISO("2025-09-30");
  const luxonDate2 = DateTime.fromISO("2025-10-01");

  bench("@pyyupsk/fdu - isBefore", () => {
    fduDate1.isBefore(fduDate2);
  });

  bench("Day.js - isBefore", () => {
    dayjsDate1.isBefore(dayjsDate2);
  });

  bench("date-fns - isBefore", () => {
    dateFnsIsBefore(nativeDate1, nativeDate2);
  });

  bench("Luxon - isBefore", () => {
    luxonDate1 < luxonDate2;
  });
});

describe("Library Comparison: Complex Workflow", () => {
  bench("@pyyupsk/fdu - parse, format, manipulate", () => {
    const date = fdu("2025-09-30");
    if (date) {
      date.format("YYYY-MM-DD");
      const future = date.add(7, "day");
      future.isBefore(fdu());
    }
  });

  bench("Day.js - parse, format, manipulate", () => {
    const date = dayjs("2025-09-30");
    date.format("YYYY-MM-DD");
    const future = date.add(7, "day");
    future.isBefore(dayjs());
  });

  bench("date-fns - parse, format, manipulate", () => {
    const date = new Date("2025-09-30");
    dateFnsFormat(date, "yyyy-MM-dd");
    const future = dateFnsAdd(date, { days: 7 });
    dateFnsIsBefore(future, new Date());
  });

  bench("Luxon - parse, format, manipulate", () => {
    const date = DateTime.fromISO("2025-09-30");
    date.toFormat("yyyy-MM-dd");
    const future = date.plus({ days: 7 });
    future < DateTime.now();
  });
});

describe("Library Comparison: Batch Operations", () => {
  bench("@pyyupsk/fdu - create and format 100 dates", () => {
    for (let i = 0; i < 100; i++) {
      const date = fdu(TEST_DATE);
      if (date) {
        date.format("YYYY-MM-DD");
      }
    }
  });

  bench("Day.js - create and format 100 dates", () => {
    for (let i = 0; i < 100; i++) {
      const date = dayjs(TEST_DATE);
      date.format("YYYY-MM-DD");
    }
  });

  bench("date-fns - create and format 100 dates", () => {
    for (let i = 0; i < 100; i++) {
      const date = new Date(TEST_DATE);
      dateFnsFormat(date, "yyyy-MM-dd");
    }
  });

  bench("Luxon - create and format 100 dates", () => {
    for (let i = 0; i < 100; i++) {
      const date = DateTime.fromISO(TEST_DATE);
      date.toFormat("yyyy-MM-dd");
    }
  });
});
