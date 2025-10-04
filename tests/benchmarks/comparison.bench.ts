import dayjs from "dayjs";
import { bench, describe } from "vitest";
import { fdu } from "../../src";

const TEST_DATE = "2025-09-30T14:35:45.123Z";
const TEST_TIMESTAMP = Date.parse(TEST_DATE);

describe("Date Creation", () => {
  bench("fd - create from string", () => {
    fdu(TEST_DATE);
  });

  bench("dayjs - create from string", () => {
    dayjs(TEST_DATE);
  });

  bench("fd - create from timestamp", () => {
    fdu(TEST_TIMESTAMP);
  });

  bench("dayjs - create from timestamp", () => {
    dayjs(TEST_TIMESTAMP);
  });

  bench("fd - create from Date", () => {
    fdu(new Date(TEST_DATE));
  });

  bench("dayjs - create from Date", () => {
    dayjs(new Date(TEST_DATE));
  });
});

describe("Formatting", () => {
  const fdDate = fdu(TEST_DATE);
  const dayjsDate = dayjs(TEST_DATE);

  bench("fd - format YYYY-MM-DD", () => {
    fdDate.format("YYYY-MM-DD");
  });

  bench("dayjs - format YYYY-MM-DD", () => {
    dayjsDate.format("YYYY-MM-DD");
  });

  bench("fd - format YYYY-MM-DD HH:mm:ss", () => {
    fdDate.format("YYYY-MM-DD HH:mm:ss");
  });

  bench("dayjs - format YYYY-MM-DD HH:mm:ss", () => {
    dayjsDate.format("YYYY-MM-DD HH:mm:ss");
  });

  bench("fd - format MMMM DD, YYYY", () => {
    fdDate.format("MMMM DD, YYYY");
  });

  bench("dayjs - format MMMM DD, YYYY", () => {
    dayjsDate.format("MMMM DD, YYYY");
  });

  bench("fd - complex format", () => {
    fdDate.format("dddd, MMMM DD, YYYY [at] HH:mm:ss A");
  });

  bench("dayjs - complex format", () => {
    dayjsDate.format("dddd, MMMM DD, YYYY [at] HH:mm:ss A");
  });
});

describe("Escaped Text Formatting", () => {
  const fdDate = fdu(TEST_DATE);

  bench("fd - baseline (no escaped text)", () => {
    fdDate.format("YYYY-MM-DD HH:mm:ss");
  });

  bench("fd - simple escaped text", () => {
    fdDate.format("YYYY-MM-DD [at] HH:mm:ss");
  });

  bench("fd - complex escaped text", () => {
    fdDate.format("[Year] YYYY [Month] MMMM [Day] DD");
  });
});

describe("Date Manipulation", () => {
  const fdDate = fdu(TEST_DATE);
  const dayjsDate = dayjs(TEST_DATE);

  bench("fd - add 3 days", () => {
    fdDate.add(3, "day");
  });

  bench("dayjs - add 3 days", () => {
    dayjsDate.add(3, "day");
  });

  bench("fd - subtract 7 days", () => {
    fdDate.subtract(7, "day");
  });

  bench("dayjs - subtract 7 days", () => {
    dayjsDate.subtract(7, "day");
  });

  bench("fd - add 1 month", () => {
    fdDate.add(1, "month");
  });

  bench("dayjs - add 1 month", () => {
    dayjsDate.add(1, "month");
  });

  bench("fd - add 1 year", () => {
    fdDate.add(1, "year");
  });

  bench("dayjs - add 1 year", () => {
    dayjsDate.add(1, "year");
  });

  bench("fd - chained operations", () => {
    fdDate.add(1, "month").subtract(3, "day").add(2, "hour");
  });

  bench("dayjs - chained operations", () => {
    dayjsDate.add(1, "month").subtract(3, "day").add(2, "hour");
  });
});

describe("Comparisons", () => {
  const fdDate1 = fdu("2025-09-30");
  const fdDate2 = fdu("2025-10-01");
  const dayjsDate1 = dayjs("2025-09-30");
  const dayjsDate2 = dayjs("2025-10-01");

  bench("fd - isBefore", () => {
    fdDate1.isBefore(fdDate2);
  });

  bench("dayjs - isBefore", () => {
    dayjsDate1.isBefore(dayjsDate2);
  });

  bench("fd - isAfter", () => {
    fdDate2.isAfter(fdDate1);
  });

  bench("dayjs - isAfter", () => {
    dayjsDate2.isAfter(dayjsDate1);
  });

  bench("fd - diff in days", () => {
    fdDate2.diff(fdDate1, "day");
  });

  bench("dayjs - diff in days", () => {
    dayjsDate2.diff(dayjsDate1, "day");
  });
});

describe("Query Methods", () => {
  const fdDate = fdu(TEST_DATE);
  const dayjsDate = dayjs(TEST_DATE);

  bench("fd - year()", () => {
    fdDate.year();
  });

  bench("dayjs - year()", () => {
    dayjsDate.year();
  });

  bench("fd - month()", () => {
    fdDate.month();
  });

  bench("dayjs - month()", () => {
    dayjsDate.month();
  });

  bench("fd - date()", () => {
    fdDate.date();
  });

  bench("dayjs - date()", () => {
    dayjsDate.date();
  });

  bench("fd - all query methods", () => {
    fdDate.year();
    fdDate.month();
    fdDate.date();
    fdDate.hour();
    fdDate.minute();
    fdDate.second();
    fdDate.millisecond();
  });

  bench("dayjs - all query methods", () => {
    dayjsDate.year();
    dayjsDate.month();
    dayjsDate.date();
    dayjsDate.hour();
    dayjsDate.minute();
    dayjsDate.second();
    dayjsDate.millisecond();
  });
});

describe("Real-world Scenarios", () => {
  bench("fd - complete workflow", () => {
    const date = fdu("2025-09-30");
    if (date) {
      date.format("YYYY-MM-DD");

      const future = date.add(7, "day");
      const past = date.subtract(3, "month");

      past.isBefore(future);
      future.diff(past, "day");
    }
  });

  bench("dayjs - complete workflow", () => {
    const date = dayjs("2025-09-30");

    date.format("YYYY-MM-DD");

    const future = date.add(7, "day");
    const past = date.subtract(3, "month");
    past.isBefore(future);
    future.diff(past, "day");
  });

  bench("fd - booking scenario", () => {
    const bookingDate = fdu("2025-12-25");
    if (bookingDate) {
      bookingDate.format("MMMM DD, YYYY");
      bookingDate.subtract(7, "day");
      bookingDate.diff(fdu(), "day");
      bookingDate.isAfter(fdu());
    }
  });

  bench("dayjs - booking scenario", () => {
    const bookingDate = dayjs("2025-12-25");
    bookingDate.format("MMMM DD, YYYY");
    bookingDate.subtract(7, "day");
    bookingDate.diff(dayjs(), "day");
    bookingDate.isAfter(dayjs());
  });
});

describe("Memory & Bundle Size Impact", () => {
  bench("fd - create 1000 dates", () => {
    for (let i = 0; i < 1000; i++) {
      fdu(TEST_DATE);
    }
  });

  bench("dayjs - create 1000 dates", () => {
    for (let i = 0; i < 1000; i++) {
      dayjs(TEST_DATE);
    }
  });

  bench("fd - format 1000 times", () => {
    const date = fdu(TEST_DATE);
    for (let i = 0; i < 1000; i++) {
      date.format("YYYY-MM-DD HH:mm:ss");
    }
  });

  bench("dayjs - format 1000 times", () => {
    const date = dayjs(TEST_DATE);
    for (let i = 0; i < 1000; i++) {
      date.format("YYYY-MM-DD HH:mm:ss");
    }
  });
});
