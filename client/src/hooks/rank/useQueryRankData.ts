import { RankEntity } from "@/entities/ranking";
import { useFetch } from "@/lib/extendedFetch";
import {
  getThisMonthFirstDay,
  getThisMonthLastDay,
  getThisWeekMonday,
  getThisWeekSunday,
} from "@utils/shared/date/date";
import { useQueries } from "@tanstack/react-query";
import { format } from "date-fns";

export default function useQueryRankData() {
  const { fetch } = useFetch();
  const today = new Date();

  const weekStart = getThisWeekMonday();
  const weekEnd = getThisWeekSunday();

  const monthStart = getThisMonthFirstDay();
  const monthEnd = getThisMonthLastDay();

  const dates = [
    {
      title: "DAY",
      from: today,
      to: today,
    },
    {
      title: "WEEK",
      from: weekStart,
      to: weekEnd,
    },
    {
      title: "MONTH",
      from: monthStart,
      to: monthEnd,
    },
  ];

  // console.log(today, weekStart, monthStart);

  const fetchRank = async (from: string, to: string) => {
    try {
      const response = await fetch(`api/v1/time/rank/from/${from}/to/${to}`, {
        method: "GET",
      });
      const data = (await response.json()) as { data: RankEntity[] };
      return data.data.map((item) => ({
        email: item.email,
        developmentTime: item.totalDuration / 1000,
        nickname: item.nickname,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return useQueries({
    queries: dates.map(({ title, from, to }) => ({
      queryKey: ["rank", title],
      queryFn: () =>
        fetchRank(format(from, "yyyy-MM-dd"), format(to, "yyyy-MM-dd")),
      staleTime: 1000 * 60 * 10, // 10분
    })),
  });
}
