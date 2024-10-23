import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getStartOfYear(currentYear: number) {
  return startOfYear(new Date(currentYear, 0, 1));
}

export function getEndOfYear(currentYear: number) {
  return endOfYear(new Date(currentYear, 11, 31));
}

/* 2024-02-03 형태 */
export function makeTimeStamp(dateString: string, separator: "/" | "-" = "-") {
  return new Date(dateString.replace(/\//g, separator)).getTime();
}

// 이번주 월요일 구하기
export function getThisWeekMonday(today: Date = new Date()) {
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  return monday;
}

// 이번주 일요일 구하기
export function getThisWeekSunday(today: Date = new Date()) {
  const sunday = endOfWeek(today, { weekStartsOn: 1 });
  return sunday;
}

// 이번달 첫날 구하기
export function getThisMonthFirstDay(today: Date = new Date()) {
  const firstDay = startOfMonth(today);
  return firstDay;
}

// 이번달 마지막날 구하기
export function getThisMonthLastDay(today: Date = new Date()) {
  const lastDay = endOfMonth(today);
  return lastDay;
}

// 이번년도 첫날 구하기 (1월 1일)
export function getThisYearFirstDay(today: Date = new Date()) {
  const firstDay = startOfYear(today);
  return firstDay;
}

// 이번년도 마지막날 구하기 (12월 31일)
export function getThisYearLastDay(today: Date = new Date()) {
  const lastDay = endOfYear(today);
  return lastDay;
}

// 시간 변환
// 123.124 => 0.124
export function convertProgrammingTime(floatNum: number = 0) {
  if (!floatNum) return "00시간 00분 00초";
  const intNum = parseInt(`${floatNum}`); // 123
  const secondInt = ((floatNum - intNum) * 60).toFixed(2);
  const minuteInt = intNum % 60;
  const hourInt = parseInt(`${(intNum - minuteInt) / 60}`);
  return `${hourInt ?? "00"}시간 ${minuteInt ?? "00"}분 ${secondInt ?? "00"}초`;
}

// 초 -> 시간 변환
export function formatSecondsToTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(secs.toFixed(2)).padStart(2, "0");

  return `${formattedHours}시간 ${formattedMinutes}분 ${formattedSeconds}초`;
}
