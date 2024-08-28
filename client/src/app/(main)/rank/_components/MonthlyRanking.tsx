import RankUI from "@/app/(main)/rank/_components/RankUI";
import { Rank } from "@/entities/ranking";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function MonthlyRanking() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Rank[]>(["rank", "MONTH"]) || [];

  return <RankUI title="월간 랭킹" rankData={data} />;
}
