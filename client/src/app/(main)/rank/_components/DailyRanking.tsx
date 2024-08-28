"use client";
import RankUI from "@/app/(main)/rank/_components/RankUI";
import { getRankTextColor } from "@/app/(main)/rank/_utils/rankStyle";
import { Rank } from "@/entities/ranking";

import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function DailyRanking() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Rank[]>(["rank", "DAY"]) || [];

  return <RankUI title="일간 랭킹" rankData={data} />;
}
