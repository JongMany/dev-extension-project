"use client";

import TimeHeatmap from "@components/profile/main/timeHeatmap/TimeHeatmap";
import SessionProvider from "@components/providers/SessionProvider";

export default function TimeHeatmapContainer({email}: { email: string }) {

  return (

      <div className="min-w-[660px] min-h-[250px] flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center gap-y-3 rounded-lg border-4 border-sky-200">
          <h1 className="text-2xl font-bold">프로그래밍 시간</h1>
          <div className="w-full overflow-x-scroll scrollbar-hide">
            <SessionProvider>
              <TimeHeatmap email={email}/>
            </SessionProvider>
          </div>
        </div>
      </div>
  );
}
