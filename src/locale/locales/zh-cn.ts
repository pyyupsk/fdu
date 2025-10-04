import type { LocaleConfig } from "../../core/types";

export const zhCn: LocaleConfig = {
  name: "zh-cn",
  weekdays: [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ],
  weekdaysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  weekdaysMin: ["日", "一", "二", "三", "四", "五", "六"],
  months: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  monthsShort: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  weekStart: 1,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY/MM/DD",
    LL: "YYYY年M月D日",
    LLL: "YYYY年M月D日 HH:mm",
    LLLL: "dddd, YYYY年M月D日 HH:mm",
  },
  relativeTime: {
    future: "%s内",
    past: "%s前",
    s: "几秒",
    m: "1分钟",
    mm: "%d分钟",
    h: "1小时",
    hh: "%d小时",
    d: "1天",
    dd: "%d天",
    M: "1个月",
    MM: "%d个月",
    y: "1年",
    yy: "%d年",
  },
  ordinal: (n, period) => {
    if (period === "W") {
      return `${n}周`;
    }
    return `${n}日`;
  },
  meridiem: (hour) => {
    if (hour < 6) {
      return "凌晨";
    }
    if (hour < 9) {
      return "早上";
    }
    if (hour < 12) {
      return "上午";
    }
    if (hour === 12) {
      return "中午";
    }
    if (hour < 18) {
      return "下午";
    }
    return "晚上";
  },
};
