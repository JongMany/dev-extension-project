"use client";
import React, { MouseEvent, useState } from "react";

import { RankDuration } from "@/entities/duration";
import { formatSecondsToTime } from "@utils/shared/date/date";
import { MyRank as IMyRank } from "@/entities/ranking";


import {getRankTextColor} from "@utils/rank/make-ranking-style/rankStyle";
import useGetMyRank from "@hooks/rank/useGetMyRank";

const rankMapper = {
  DAY: "일간",
  WEEK: "주간",
  MONTH: "월간",
};

const defaultBtnStyle = "transition-all duration-300";

export default function MyRank() {
  const [selectedDuration, setSelectedDuration] = useState<RankDuration>("DAY");
  const { isLoading, isError, data } = useGetMyRank(selectedDuration);

  const selectRankDuration = (e: MouseEvent<HTMLButtonElement>) => {
    const duration = e.currentTarget.name as RankDuration;
    setSelectedDuration(duration);
  };

  return (
    <section className="w-full border-4 mt-8 rounded-md px-4 pt-6 pb-3">
      <h2 className="font-bold text-[22px] text-center border-b-2 pb-3">
        My {rankMapper[selectedDuration]} 랭킹
      </h2>
      <div className="flex justify-between">
        <nav className="py-4">
          <div className=" flex flex-col gap-y-8 w-[200px]">
            <button
              onClick={selectRankDuration}
              name="DAY"
              className={`${defaultBtnStyle} ${selectedButtonStyle(
                selectedDuration,
                "DAY"
              )}`}
            >
              일간
            </button>
            <button
              onClick={selectRankDuration}
              name="WEEK"
              className={`${defaultBtnStyle} ${selectedButtonStyle(
                selectedDuration,
                "WEEK"
              )}`}
            >
              주간
            </button>
            <button
              onClick={selectRankDuration}
              name="MONTH"
              className={`${defaultBtnStyle} ${selectedButtonStyle(
                selectedDuration,
                "MONTH"
              )}`}
            >
              월간
            </button>
          </div>
        </nav>
        <div className="flex-1 py-4 px-8 flex items-center justify-center">
          <div className="w-full h-full bg-sky-100 rounded-xl flex justify-center items-center">
            {isLoading && <p>로딩 중...</p>}
            {isError && <p>에러 발생</p>}
            {data && (
              <Curation rankData={data} selectedDuration={selectedDuration} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function selectedButtonStyle(
  selectedDuration: RankDuration,
  duration: RankDuration
) {
  return selectedDuration === duration ? "font-bold" : "";
}

function Curation({
  rankData,
  selectedDuration,
}: {
  rankData: IMyRank;
  selectedDuration: RankDuration;
}) {
  const durationMapper = {
    DAY: "오늘",
    WEEK: "이번 주에",
    MONTH: "이번 달에",
  };

  return (
    <p className="text-[17px]">
      <span className="font-bold text-[20px]">{rankData.nickname}</span>님께서는{" "}
      {durationMapper[selectedDuration]} <br />
      <span className="font-bold text-[20px]">
        {formatSecondsToTime(rankData.developmentTime)}
      </span>{" "}
      동안 프로그래밍을 하셨으며,
      <br />
      전체{" "}
      <span className={`${getRankTextColor(rankData.rank)}`}>
        {rankData.rank}등
      </span>
      을 달성하셨습니다.
    </p>
  );
}
