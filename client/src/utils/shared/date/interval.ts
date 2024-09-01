import { Duration } from "@/entities/duration";
import {
  getThisMonthFirstDay,
  getThisMonthLastDay,
  getThisWeekMonday,
  getThisWeekSunday,
  getThisYearFirstDay,
  getThisYearLastDay,
} from "@utils/shared/date/date";
import { format } from "date-fns";

export function getFromDate(duration: Duration) {
  let from;
  switch (duration) {
    case "WEEK":
      from = getThisWeekMonday();
      break;
    case "MONTH":
      from = getThisMonthFirstDay();
      break;
    case "YEAR":
      from = getThisYearFirstDay();
      break;
  }

  return format(from, "yyyy-MM-dd");
}

export function getToDate(duration: Duration) {
  let to;
  switch (duration) {
    case "WEEK":
      to = getThisWeekSunday();
      break;
    case "MONTH":
      to = getThisMonthLastDay();
      break;
    case "YEAR":
      to = getThisYearLastDay();
      break;
  }

  return format(to, "yyyy-MM-dd");
}
