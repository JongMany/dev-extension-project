"use client";
import { Rank } from "@/entities/ranking";

import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import RankUI from "@components/rank/show-rank/RankUI";

export default function DailyRanking() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Rank[]>(["rank", "DAY"]) || [];

  return <RankUI title="일간 랭킹" rankData={data} />;
}
