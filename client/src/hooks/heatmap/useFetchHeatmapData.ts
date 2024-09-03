import {useFetch} from "@hooks/shared/useFetch";
import {useEffect, useState} from "react";
import {getCurrentYear, getEndOfYear, getStartOfYear} from "@utils/shared/date/date";
import {format} from "date-fns";
import {HeatmapProgramTimeResponseDTO} from "@/models/heatmap-time/dto/response/heatmapTime.dto";

export const useFetchHeatmapData = (email: string) => {
  const {fetch} = useFetch();
  const [loadStatus, setLoadStatus] = useState<'none'|'loading'|'finish'|'error'>('none');
  const [heatmapData, setHeatmapData] = useState<HeatmapProgramTimeResponseDTO[]>([]);
  useEffect(() => {
    async function fetchData() {
      setLoadStatus('loading');
      const currentYear = getCurrentYear();
      const startDayOfYear = format(getStartOfYear(currentYear), "yyyy-MM-dd");
      const endDayOfYear = format(getEndOfYear(currentYear), "yyyy-MM-dd");
      try {
        const response = await fetch(
            `/api/v1/time/${email}/from/${startDayOfYear}/to/${endDayOfYear}`
        );
        const data = await response.json() as { data: HeatmapProgramTimeResponseDTO[] };
        setHeatmapData(data.data);
        setLoadStatus('finish');
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoadStatus('error');
        return [];
      }
    }
    fetchData();
  }, []);

  return {
    heatmapData,
    loadStatus
  }
}