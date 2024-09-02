"use client";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import RankUI from "@components/rank/show-rank/RankUI";
import {Rank} from "@/models/rank/entity/ranking";

export default function WeeklyRanking() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Rank[]>(["rank", "WEEK"]) || [];

  return <RankUI title="주간 랭킹" rankData={data} />;
}
