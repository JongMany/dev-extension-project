"use client";

import React from "react";
import {useDuration} from "@/store/duration/useDuration";

export default function DashboardHeader() {
  const {duration, setDuration} = useDuration();

  const changeDurationHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const duration = e.target.value as "WEEK" | "MONTH" | "YEAR";
    setDuration(duration);
  };

  return (
      <nav className="py-4 px-2">
        <select defaultValue={duration} onChange={changeDurationHandler}
                className="text-[20px] font-semibold rounded-md px-6 py-1 border-4 border-black">
          <option value="WEEK">이번 주</option>
          <option value="MONTH">이번 달</option>
          <option value="YEAR">올해</option>
        </select>
      </nav>
  );
}
