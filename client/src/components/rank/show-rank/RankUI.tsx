
import { Rank } from "@/entities/ranking";
import { formatSecondsToTime } from "@utils/shared/date/date";
import Link from "next/link";
import React from "react";
import {getRankTextColor, getRankUserNameColor} from "@utils/rank/make-ranking-style/rankStyle";

type Props = {
  title: "일간 랭킹" | "주간 랭킹" | "월간 랭킹";
  rankData: Rank[];
};

export default function RankUI({ title, rankData }: Props) {
  return (
    <div className="flex flex-col items-center px-4">
      <h1 className="font-semibold text-[24px] mb-2">{title}</h1>
      {/* 데이터가 있을 때 */}
      {rankData.length > 0 && (
        <ul className="w-full">
          {rankData.map((rank, index) => (
            <li key={rank.email} className="mb-3">
              <Link href={`/profile/${rank.email}`}>
                <div className="flex flex-col items-center rounded-lg px-2 py-1 bg-[#d1fae5]">
                  <div className="flex w-full items-baseline">
                    <RankText rank={index + 1} />
                    <span
                      className={`flex-1 ${getRankUserNameColor(
                        index + 1
                      )} flex justify-center`}
                    >
                      {rank.nickname}
                    </span>
                  </div>
                  <div className="flex gap-x-2 items-baseline">
                    <span className="font-semibold text-[14px]">
                      프로그래밍한 시간
                    </span>
                    <span className="text-[12px]">
                      {formatSecondsToTime(rank.developmentTime)}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* 데이터가 없을 때 */}
      {rankData.length === 0 && (
        <div>
          <p className="">오늘 여러분이 랭커가 되어 보시는건 어떠신가요?</p>
        </div>
      )}
    </div>
  );
}

function RankText({ rank }: { rank: number }) {
  if (rank >= 1 && rank <= 3) {
    return (
      <span className={`${getRankTextColor(rank)}`}>
        <span>{rank}등</span>
        <span className="icon-[fluent--sparkle-24-regular]"></span>
      </span>
    );
  } else {
    <span className={`${getRankTextColor(rank)}`}>
      <span>{rank}등</span>
    </span>;
  }
}
