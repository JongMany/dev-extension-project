import RankUI from "@/app/(main)/rank/_components/RankUI";
import { Rank } from "@/entities/ranking";
import { formatSecondsToTime } from "@/utils/date/date";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function WeeklyRanking() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Rank[]>(["rank", "WEEK"]) || [];

  return <RankUI title="주간 랭킹" rankData={data} />;
}
