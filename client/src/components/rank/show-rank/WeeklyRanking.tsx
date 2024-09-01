
import { Rank } from "@/entities/ranking";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import RankUI from "@components/rank/show-rank/RankUI";

export default function WeeklyRanking() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Rank[]>(["rank", "WEEK"]) || [];

  return <RankUI title="주간 랭킹" rankData={data} />;
}
