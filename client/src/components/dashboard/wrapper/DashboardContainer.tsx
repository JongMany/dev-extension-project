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
  const {data, isFetching, isError} = useFetchProgrammingTime();

  return (
      <section className="grid grid-cols-2">
        <QueryBasedRenderer isLoading={isFetching} isError={isError} data={data} Loader={<Hourglass/>}
                            ErrorComponent={<>Error...</>} EmptyView={<>Emtpy View</>}>
          <div className="col-span-2">
            <DashboardCard>
              <ProgramTimeSeriesChart/>
            </DashboardCard>
          </div>
          <div>
            <DashboardCard>
              <ProgramLanguageRatesChart/>
            </DashboardCard>
          </div>
          <div>
            <DashboardCard>
              <ProjectDepsChart/>
            </DashboardCard>
          </div>
          <div className="col-span-2">
            <DashboardCard>
              <HierarchyChart/>
            </DashboardCard>
          </div>
        </QueryBasedRenderer>
      </section>
  );
}
