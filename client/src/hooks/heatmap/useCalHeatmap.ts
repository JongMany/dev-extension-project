import CalHeatmap from "cal-heatmap";
import {useEffect} from "react";
import {makeTimeStamp} from "@utils/shared/date/date";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import {makeTimeTooltip} from "@utils/calendar/makeTimeToolTip";
import {HeatmapProgramTimeResponseDTO} from "@/models/heatmap-time/dto/response/heatmapTime.dto";
import {useFetchHeatmapData} from "@hooks/heatmap/useFetchHeatmapData";

export const useCalHeatmap = (email: string) => {
  const {isFetching, data: heatmapData} = useFetchHeatmapData(email);
  const cal = new CalHeatmap();
  cal.on("click", () => {
  });

  useEffect(() => {
    async function paint() {
      if (typeof window !== "undefined") {
        const timeZone = "Asia/Seoul";
        await cal.paint(
            {
              range: 12,
              date: {
                start: new Date(Date.UTC(2024, 0, 1)),
                locale: "ko",
                timezone: timeZone,
              },
              data: {
                source: heatmapData,
                type: "json",
                x: (d: HeatmapProgramTimeResponseDTO) => makeTimeStamp(d.date),
                y: (d: HeatmapProgramTimeResponseDTO) => d.time,
              },
              domain: {type: "month"},
              subDomain: {type: "ghDay", width: 15, height: 15},
              scale: {
                color: {
                  type: "diverging",
                  // domain: [0, 10, 30, 60, 120, 180, 240, 300],
                  domain: [0, 240],
                  scheme: "BuRd",
                },
              },
            },
            [
              [
                Tooltip,
                {
                  enabled: true,
                  text: (_: number, value: number, date: any) => {
                    return makeTimeTooltip(date, value);
                  },
                } as any,
              ],
            ]
        );
      }
    }

    if(!isFetching) {
      paint();
    }

  }, [isFetching, heatmapData]);

  return {cal};
}