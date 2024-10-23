import {MyRank as IMyRank} from "@/models/rank/entity/ranking";
import {RankDuration} from "@/models/rank/vo/duration.vo";
import {timeLabels} from "@/constants/rankMapper";
import {formatSecondsToTime} from "@utils/shared/date/date";
import {getRankTextColor} from "@utils/rank/make-ranking-style/rankStyle";
import React from "react";

export function Curation({
                           rankData,
                           selectedDuration,
                         }: {
  rankData: IMyRank|null|undefined;
  selectedDuration: RankDuration;
}) {
  if (!rankData) return null;
  return (
      <p className="text-[17px]">
        <span className="font-bold text-[20px]">{rankData.nickname}</span>님께서는{" "}
        {timeLabels[selectedDuration]} <br/>
        <span className="font-bold text-[20px]">
        {formatSecondsToTime(rankData.developmentTime)}
      </span>{" "}
        동안 프로그래밍을 하셨으며,
        <br/>
        전체{" "}
        <span className={`${getRankTextColor(rankData.rank)}`}>
        {rankData.rank}등
      </span>
        을 달성하셨습니다.
      </p>
  );
}