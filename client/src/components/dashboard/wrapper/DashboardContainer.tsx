"use client";

import React from "react";
import DashboardCard from "@components/dashboard/wrapper/DashboardCard";
import ProgrammingDurationTrendGraph from "@components/dashboard/charts/ProgrammingDurationTrendGraph";
import ProgrammingLanguageProportionChart from "@components/dashboard/charts/ProgrammingLanguageProportionChart";
import ProjectDependencyChart from "@components/dashboard/charts/ProjectDependencyChart";
import ProjectHierarchyChart from "@components/dashboard/charts/ProjectHierarchyChart";
import useFetchProgrammingTime from "@hooks/dashboard/useFetchProgrammingTime";
import {Hourglass} from "@components/shared/loader/Hourglass";
import QueryBasedRenderer from "@components/shared/query-based-renderer/QueryBasedRenderer";

export default function DashboardContainer() {
  const {data, isFetching, isError} = useFetchProgrammingTime();
  console.log(isError, data, isFetching)
  return (
      <section className="grid grid-cols-2">
        <QueryBasedRenderer isLoading={isFetching} isError={isError} data={data} Loader={<Hourglass/>}
                            ErrorComponent={<>Error...</>} EmptyView={<>Empty View</>}>
          <div className="col-span-2">
            <DashboardCard>
              <ProgrammingDurationTrendGraph/>
            </DashboardCard>
          </div>
          <div>
            <DashboardCard>
              <ProgrammingLanguageProportionChart/>
            </DashboardCard>
          </div>
          <div>
            <DashboardCard>
              <ProjectDependencyChart/>
            </DashboardCard>
          </div>
          <div className="col-span-2">
            <DashboardCard>
              <ProjectHierarchyChart/>
            </DashboardCard>
          </div>
        </QueryBasedRenderer>
      </section>
  );
}
