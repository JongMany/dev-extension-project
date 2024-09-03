"use client";
import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import "cal-heatmap/cal-heatmap.css";
import {useEffect} from "react";
import {format} from "date-fns";

import {
  getCurrentYear,
  getEndOfYear,
  getStartOfYear,
  makeTimeStamp,
} from "@utils/shared/date/date";
import {useFetch} from "@hooks/shared/useFetch";
import {makeTimeTooltip} from "@utils/calendar/makeTimeToolTip";
import {useCalHeatmap} from "@hooks/heatmap/useCalHeatmap";

export default function TimeHeatmap({email}: { email: string }) {
  const {cal} = useCalHeatmap(email);
  // const {fetch} = useFetch();
  // const cal = new CalHeatmap();
  //
  // cal.on("click", () => {
  // });


  // useEffect(() => {
  //   async function fetchData() {
  //     const currentYear = getCurrentYear();
  //
  //     const startDayOfYear = format(getStartOfYear(currentYear), "yyyy-MM-dd");
  //     const endDayOfYear = format(getEndOfYear(currentYear), "yyyy-MM-dd");
  //     const response = await fetch(
  //         `api/v1/time/${email}/from/${startDayOfYear}/to/${endDayOfYear}`
  //     );
  //     const data = await response.json();
  //     return data.data;
  //   }
  //
  //   async function paint() {
  //     if (typeof window !== "undefined") {
  //       // console.log("paint", new Date());
  //       const response = await fetchData();
  //       const data = [
  //         ...response,
  //       ]; // 예시 데이터
  //
  //       const timeZone = "Asia/Seoul";
  //
  //       cal.paint(
  //           {
  //             range: 12,
  //             date: {
  //               start: new Date(Date.UTC(2024, 0, 1)),
  //               locale: "ko",
  //               timezone: timeZone,
  //             },
  //             data: {
  //               source: data,
  //               type: "json",
  //               // x: "date",
  //               // x: (d: any) => new Date(d.date),
  //               // x: (d: any) => new Date(d.date.replace(/\//g, "-")).getTime(),
  //               x: (d: any) => makeTimeStamp(d.date),
  //               y: (d: any) => d.time,
  //             },
  //             domain: {type: "month"},
  //             subDomain: {type: "ghDay", width: 15, height: 15},
  //             scale: {
  //               color: {
  //                 type: "diverging",
  //                 // domain: [0, 10, 30, 60, 120, 180, 240, 300],
  //                 domain: [0, 240],
  //                 scheme: "BuRd",
  //               },
  //             },
  //           },
  //           [
  //             [
  //               Tooltip,
  //               {
  //                 enabled: true,
  //                 text: (_: number, value: number, date: any) => {
  //                   // console.log(date);
  //                   // console.log(new Date(dayjsDate.$d));
  //                   // const [month, day] = format(date.$d, "MM-dd").split("-");
  //                   console.log(value);
  //                   const [month, day] = format(new Date(date), "MM-dd").split(
  //                       "-"
  //                   );
  //                   return makeTimeTooltip(date, value);
  //                 },
  //               } as any,
  //             ],
  //           ]
  //       );
  //     }
  //   }
  //
  //   paint();
  // }, []);

  return (
      <div id="cal-heatmap" className="mx-auto"></div>
  );
}


