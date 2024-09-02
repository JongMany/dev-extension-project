"use client";

import React from "react";
import DashboardCard from "@components/dashboard/charts/DashboardCard";
import ProgramTimeSeriesChart from "@components/dashboard/charts/ProgramTimeSeriesChart";
import ProgramLanguageRatesChart from "@components/dashboard/charts/ProgramLanguageRatesChart";
import ProjectDepsChart from "@components/dashboard/charts/ProjectDepsChart";
import HierarchyChart from "@components/dashboard/charts/HierarchyChart";
import useFetchProgrammingTime from "@hooks/dashboard/useFetchProgrammingTime";

export default function DashboardContainer() {
  const { data, isFetching, isError } = useFetchProgrammingTime();

  // TODO: 로딩 처리
  if (isFetching) return <div>로딩</div>;

  // TODO: 에러 처리
  if (isError) return <div>에러</div>;

  return (
    <section className="grid grid-cols-2">
        <div className="col-span-2">
        <DashboardCard>
          {isFetching && <>로딩 중...</>}
          {isError && <>에러 발생</>}
          {data && <ProgramTimeSeriesChart />}
        </DashboardCard>
      </div>
      {/* <div className="flex w-full"> */}
      <div>
      <DashboardCard>
        {isFetching && <>로딩 중...</>}
        {isError && <>에러 발생</>}
        {data && <ProgramLanguageRatesChart />}
      </DashboardCard>
      </div>
      <div>
      <DashboardCard>
        {isFetching && <>로딩 중...</>}
        {isError && <>에러 발생</>}
        {data && <ProjectDepsChart />}
      </DashboardCard>
      </div>
      {/* </div> */}

    
      <div className="col-span-2">
        <DashboardCard>
          {isFetching && <>로딩 중...</>}
          {isError && <>에러 발생</>}
          {data && <HierarchyChart />}
        </DashboardCard>
      </div>
    </section>
  );
}
