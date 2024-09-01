import React from "react";

export default function RankHeader() {
  return (
    <nav className="px-3 mb-5">
      <h1>
        <span className="text-[32px] font-bold mb-4 text-transparent gradient-text animate-gradient">
          프로그래밍 랭킹 💻
        </span>
      </h1>
      <p className="text-[24px]">전국 최고의 프로그래밍 덕후를 찾아보자</p>
      <p className="text-[14px]">
        한국시간 오전 9시 기준으로 데이터가 집계됩니다.
      </p>
    </nav>
  );
}
