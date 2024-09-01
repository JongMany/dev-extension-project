import { type RankDuration } from "@/entities/duration";
import { MyRank, MyRankEntity } from "@/entities/ranking";
import { useFetch } from "@/lib/extendedFetch";
import {
  getThisMonthFirstDay,
  getThisMonthLastDay,
  getThisWeekMonday,
  getThisWeekSunday,
} from "@utils/shared/date/date";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

export default function useGetMyRank(duration: RankDuration) {
  const { fetch } = useFetch();
  const { data: session } = useSession();

  const fetchMyRank = async () => {
    const email = session?.user.email!;
    const { from, to } = getFromTo(duration);

    const response = await fetch(
      `api/v1/time/myRank/${email}/from/${from}/to/${to}`
    );
    const data = (await response.json()) as { data: MyRankEntity };

    if (!data) return null;

    const result = {
      email: data.data.email,
      developmentTime: data.data.totalDuration / 1000,
      nickname: data.data.nickname,
      rank: data.data.rank,
    };
    return result as MyRank;
  };

  return useQuery({
    queryKey: ["myRank", duration],
    queryFn: () => fetchMyRank(),
    staleTime: 1000 * 60 * 2,
  });
}

function getFromTo(duration: RankDuration) {
  const today = new Date();

  if (duration === "DAY") {
    return {
      from: format(today, "yyyy-MM-dd"),
      to: format(today, "yyyy-MM-dd"),
    };
  }

  if (duration === "WEEK") {
    return {
      from: format(getThisWeekMonday(today), "yyyy-MM-dd"),
      to: format(getThisWeekSunday(today), "yyyy-MM-dd"),
    };
  }

  if (duration === "MONTH") {
    return {
      from: format(getThisMonthFirstDay(today), "yyyy-MM-dd"),
      to: format(getThisMonthLastDay(today), "yyyy-MM-dd"),
    };
  }

  throw new Error("Invalid duration");
}
