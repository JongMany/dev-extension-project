import Link from "next/link";
import React from "react";
import { GiStopwatch } from "react-icons/gi";

export const StudyLogIcon = () => {
  return (
    <div className="text-4xl font-bold">
      <Link href="/main">
        <div className="flex gap-x-2">
          <GiStopwatch />
          <span>StudyLog</span>
        </div>
      </Link>
    </div>
  );
};