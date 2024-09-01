"use client";

import RankCard from "@components/rank/show-rank/RankCard";
import DailyRanking from "@components/rank/show-rank/DailyRanking";
import WeeklyRanking from "@components/rank/show-rank/WeeklyRanking";
import MonthlyRanking from "@components/rank/show-rank/MonthlyRanking";
import useGetRankData from "@hooks/rank/useGetRankData";

export default function RankContainer() {
  const queries = useGetRankData();

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
