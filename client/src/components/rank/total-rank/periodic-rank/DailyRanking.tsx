"use client";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import RankUI from "@components/rank/total-rank/wrapper/RankUI";
import {Rank} from "@/models/rank/entity/ranking";

export default function DailyRanking() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Rank[]>(["rank", "DAY"]) || [];

  return <RankUI title="일간 랭킹" rankData={data} />;
}
