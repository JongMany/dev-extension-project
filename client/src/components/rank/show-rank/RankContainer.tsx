"use client";

import RankCard from "@components/rank/show-rank/RankCard";
import DailyRanking from "@components/rank/show-rank/DailyRanking";
import WeeklyRanking from "@components/rank/show-rank/WeeklyRanking";
import MonthlyRanking from "@components/rank/show-rank/MonthlyRanking";
import useQueryRankData from "@hooks/rank/useQueryRankData";

export default function RankContainer() {
  const queries = useQueryRankData();

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
