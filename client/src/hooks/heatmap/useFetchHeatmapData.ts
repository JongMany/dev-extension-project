import {useFetch} from "@hooks/shared/useFetch";
import {useEffect, useState} from "react";
import {getCurrentYear, getEndOfYear, getStartOfYear} from "@utils/shared/date/date";
import {format} from "date-fns";
import {HeatmapProgramTimeResponseDTO} from "@/models/heatmap-time/dto/response/heatmapTime.dto";
import {useQuery} from "@tanstack/react-query";

export const useFetchHeatmapData = (email: string) => {
  const {fetch} = useFetch();
  async function fetchData() {
    const currentYear = getCurrentYear();
    const startDayOfYear = format(getStartOfYear(currentYear), "yyyy-MM-dd");
    const endDayOfYear = format(getEndOfYear(currentYear), "yyyy-MM-dd");
    try {
      const response = await fetch(
          `/api/v1/time/${email}/from/${startDayOfYear}/to/${endDayOfYear}`
      );
      const data = await response.json() as { data: HeatmapProgramTimeResponseDTO[] };
      return data.data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  }
  const {isFetching, isError, data} = useQuery({
    queryKey: ['heatmap', email],
    staleTime: 1000 * 30,
    queryFn: () => fetchData()
  })


  return {
    isFetching, isError, data
  }
}