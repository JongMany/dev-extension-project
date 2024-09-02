"use client";

import React from "react";
import DashboardCard from "@components/dashboard/wrapper/DashboardCard";
import ProgramTimeSeriesChart from "@components/dashboard/charts/ProgramTimeSeriesChart";
import ProgramLanguageRatesChart from "@components/dashboard/charts/ProgramLanguageRatesChart";
import ProjectDepsChart from "@components/dashboard/charts/ProjectDepsChart";
import HierarchyChart from "@components/dashboard/charts/HierarchyChart";
import useFetchProgrammingTime from "@hooks/dashboard/useFetchProgrammingTime";
import {Hourglass} from "@components/shared/loader/Hourglass";
import QueryBasedRenderer from "@components/shared/query-based-renderer/QueryBasedRenderer";

export default function DashboardContainer() {
  const { data, isFetching, isError } = useFetchProgrammingTime();

  // TODO: 로딩 처리 - 어디서 관리하는게 나음?
  // if (isFetching) return <Hourglass />;

  // TODO: 에러 처리
  // if (isError) return <div>에러</div>;

  return (
    <section className="grid grid-cols-2">
        <div className="col-span-2">
        <DashboardCard>
          <QueryBasedRenderer isLoading={isFetching} isError={isError} data={data} Loader={<Hourglass/>} ErrorComponent={<>Error...</>} EmptyView={<>Emtpy View</>}>
            <ProgramTimeSeriesChart />
          </QueryBasedRenderer>
        </DashboardCard>
      </div>
      {/* <div className="flex w-full"> */}
      <div>
      <DashboardCard>
        <QueryBasedRenderer isLoading={isFetching} isError={isError} data={data} Loader={<Hourglass/>} ErrorComponent={<>Error...</>} EmptyView={<>Emtpy View</>}>
          <ProgramLanguageRatesChart />
        </QueryBasedRenderer>

      </DashboardCard>
      </div>
      <div>
      <DashboardCard>
        <QueryBasedRenderer isLoading={isFetching} isError={isError} data={data} Loader={<Hourglass/>} ErrorComponent={<>Error...</>} EmptyView={<>Emtpy View</>}>
          <ProjectDepsChart />
        </QueryBasedRenderer>
      </DashboardCard>
      </div>
      {/* </div> */}

    
      <div className="col-span-2">
        <DashboardCard>
          <QueryBasedRenderer isLoading={isFetching} isError={isError} data={data} Loader={<Hourglass/>} ErrorComponent={<>Error...</>} EmptyView={<>Emtpy View</>}>
            <HierarchyChart />
          </QueryBasedRenderer>
        </DashboardCard>
      </div>
    </section>
  );
}
