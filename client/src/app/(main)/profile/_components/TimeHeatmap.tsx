"use client";
import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import "cal-heatmap/cal-heatmap.css";
import { useEffect } from "react";
import { format, min } from "date-fns";
import { useFetch } from "@/lib/extendedFetch";
import {
  convertProgrammingTime,
  getCurrentYear,
  getEndOfYear,
  getStartOfYear,
  makeTimeStamp,
} from "@/utils/date/date";

const option = {
  range: 12,
  date: {
    start: new Date(2024, 1, 1),
    locale: "ko",
    timezone: "Asia/Seoul",
  },
  data: {
    type: "json",
    // x: "date",
    x: (d: any) => {
      console.log(d.date);
      return d.date;
    },
    y: (d: any) => d.time,
  },
  domain: { type: "month" },
  subDomain: { type: "ghDay", width: 15, height: 15 },
  scale: {
    color: {
      type: "diverging",
      domain: [0, 10],
      scheme: "BuRd",
    },
  },
};

export default function TimeHeatmap({ email }: { email: string }) {
  const { fetch } = useFetch();
  const cal = new CalHeatmap();

  cal.on("click", () => {
    // console.log("click");
  });

  // const currentYear = new Date().getFullYear();
  // const start = startOfYear(new Date(currentYear, 0, 1));
  // const end = endOfYear(new Date(currentYear, 11, 31));
  // 시작일부터 종료일까지 모든 날짜를 배열로 만듭니다.
  // const allDates = eachDayOfInterval({ start, end });

  // 날짜를 보기 좋게 형식화합니다.
  // const formattedDates = allDates.map((date) => format(date, "yyyy/MM/dd"));

  // console.log(formattedDates);

  useEffect(() => {
    async function fetchData() {
      const currentYear = getCurrentYear();

      const startDayOfYear = format(getStartOfYear(currentYear), "yyyy-MM-dd");
      const endDayOfYear = format(getEndOfYear(currentYear), "yyyy-MM-dd");
      const response = await fetch(
        `time/${email}/from/${startDayOfYear}/to/${endDayOfYear}`
      );
      const data = await response.json();
      return data.data;
    }

    async function paint() {
      if (typeof window !== "undefined") {
        // console.log("paint", new Date());
        const response = await fetchData();
        const data = [
          // { date: "2024/03/01", time: 6 },
          // { date: "2024/03/20", time: 6 },
          // { date: "2024/03/21", time: 3 },
          // { date: "2024/03/22", time: 5 },
          // { date: "2024/03/23", time: 5 },
          // { date: "2024/03/24", time: 60 },
          ...response,
        ]; // 예시 데이터
        // console.log(data);
        // const data = response.data;
        // console.log(parseISO(format(data[0].date, "yyyy-MM-dd")), data[0].date);
        const timeZone = "Asia/Seoul";

        cal.paint(
          {
            range: 12,
            date: {
              start: new Date(Date.UTC(2024, 0, 1)),
              locale: "ko",
              timezone: timeZone,
            },
            data: {
              source: data,
              type: "json",
              // x: "date",
              // x: (d: any) => new Date(d.date),
              // x: (d: any) => new Date(d.date.replace(/\//g, "-")).getTime(),
              x: (d: any) => makeTimeStamp(d.date),
              y: (d: any) => d.time,
            },
            domain: { type: "month" },
            subDomain: { type: "ghDay", width: 15, height: 15 },
            scale: {
              color: {
                type: "diverging",
                // domain: [0, 10, 30, 60, 120, 180, 240, 300],
                domain: [0, 240],
                scheme: "BuRd",
              },
              // opacity: {
              //   baseColor: "#71b747",
              //   type: "linear",
              //   domain: [0, 310],
              // },
            },
          },
          [
            [
              Tooltip,
              {
                enabled: true,
                text: (_: number, value: number, date: any) => {
                  // console.log(date);
                  // console.log(new Date(dayjsDate.$d));
                  // const [month, day] = format(date.$d, "MM-dd").split("-");
                  console.log(value);
                  const [month, day] = format(new Date(date), "MM-dd").split(
                    "-"
                  );
                  return makeTimeTooltip(date, value);
                  return `${month}월 ${day}일의 프로그래밍 시간 - ${
                    value ?? 0
                  }분`;
                },
              } as any,
            ],
          ]
        );
      }
    }
    paint();
  }, []);

  return (
    // w-full
    <div id="cal-heatmap" className="mx-auto"></div>
  );
}

function makeTimeTooltip(date: any, value: number) {
  const [month, day] = format(new Date(date), "MM-dd").split("-");
  return `${month}월 ${day}일의 프로그래밍 시간 - ${convertProgrammingTime(
    value
  )}`;
}

// // 123.124 => 0.124
// function convertProgrammingTime(floatNum: number = 0) {
//   if (!floatNum) return "00시간 00분 00초";
//   const intNum = parseInt(`${floatNum}`); // 123
//   const secondInt = ((floatNum - intNum) * 60).toFixed(2);
//   const minuteInt = intNum % 60;
//   const hourInt = parseInt(`${(intNum - minuteInt) / 60}`);
//   return `${hourInt ?? "00"}시간 ${minuteInt ?? "00"}분 ${secondInt ?? "00"}초`;
// }
