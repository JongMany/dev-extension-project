import {format} from "date-fns";
import {convertProgrammingTime} from "@utils/shared/date/date";

export function makeTimeTooltip(date: string|Date, value: number) {
  const [month, day] = format(new Date(date), "MM-dd").split("-");
  return `${month}월 ${day}일의 프로그래밍 시간 - ${convertProgrammingTime(
      value
  )}`;
}