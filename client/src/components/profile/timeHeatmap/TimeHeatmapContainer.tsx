"use client";


import { useSession } from "next-auth/react";
import { useEffect } from "react";
import TimeHeatmap from "@components/profile/timeHeatmap/TimeHeatmap";

export default function TimeHeatmapContainer({ email }: { email: string }) {
  const { data: session } = useSession();
  useEffect(() => {}, [session?.user.accessToken]);
  if (!session?.user.accessToken || window === undefined) {
    return null;
  }
  return (
    <div className="min-w-[660px] min-h-[250px] flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center gap-y-3 rounded-lg border-4 border-sky-200">
        <h1 className="text-2xl font-bold">프로그래밍 시간</h1>
        {/* flex flex-col justify-center items-center  */}
        <div className="w-full overflow-x-scroll scrollbar-hide">
          <TimeHeatmap email={email} />
        </div>
      </div>
    </div>
  );
}
