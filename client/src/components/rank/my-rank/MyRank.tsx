"use client";
import React, { MouseEvent, useState } from "react";

import useQueryMyRank from "@hooks/rank/useQueryMyRank";
import {RankDuration} from "@/models/rank/vo/duration.vo";
import {periodLabels} from "@/constants/rankMapper";
import QueryBasedRenderer from "@components/shared/query-based-renderer/QueryBasedRenderer";
import {selectedButtonStyle} from "@utils/rank/make-ranking-style/selectedButtonStyle";
import {Curation} from "@components/rank/my-rank/Curation";

const defaultBtnStyle = "transition-all duration-300";

export default function MyRank() {
  const [selectedDuration, setSelectedDuration] = useState<RankDuration>("DAY");
  const { isLoading, isError, data } = useQueryMyRank(selectedDuration);

  const selectRankDuration = (e: MouseEvent<HTMLButtonElement>) => {
    const duration = e.currentTarget.name as RankDuration;
    setSelectedDuration(duration);
  };

  return (
    <section className="w-full border-4 mt-8 rounded-md px-4 pt-6 pb-3">
      <h2 className="font-bold text-[22px] text-center border-b-2 pb-3">
        My {periodLabels[selectedDuration]} 랭킹
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
            <QueryBasedRenderer isLoading={isLoading} isError={isError} data={data} Loader={<>로딩 중...</>} ErrorComponent={<>에러</>} EmptyView={<>텅.</>}>
              <Curation rankData={data} selectedDuration={selectedDuration}/>
            </QueryBasedRenderer>
          </div>
        </div>
      </div>
    </section>
  );
}




