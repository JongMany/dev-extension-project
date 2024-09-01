"use client";

import useGetRankData from "@/app/(main)/rank/_libs/useGetRankData";
import RankCard from "@components/rank/show-rank/RankCard";
import DailyRanking from "@components/rank/show-rank/DailyRanking";
import WeeklyRanking from "@components/rank/show-rank/WeeklyRanking";
import MonthlyRanking from "@components/rank/show-rank/MonthlyRanking";

export default function RankContainer() {
  const queries = useGetRankData();
  // animate-[bouncing_1s_ease-in-out] delay-300
  return (
    <section className="flex justify-around gap-x-8 animate-droping">
      <RankCard>
        <DailyRanking />
      </RankCard>
      <RankCard>
        <WeeklyRanking />
      </RankCard>
      <RankCard>
        <MonthlyRanking />
      </RankCard>
    </section>
  );
}
