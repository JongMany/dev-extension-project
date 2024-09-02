"use client";

import { useDuration } from "@/store/duration/useDuration";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import GraphChart from "@components/shared/charts/GraphChart";
import {filterDuplicatedDependencies} from "@utils/chart/graph";
import {IProgramData} from "@/models/programming-info/entity/programData.entity";

export default function ProjectDepsChart() {
  const queryClient = useQueryClient();
  const { duration } = useDuration();
  const programData =
    queryClient.getQueryData<IProgramData[]>(["programmingTime", duration]) ||
    [];

  const depsLink = makeDepsGraphItems(programData);

  return (
    <div>
      <GraphChart depsData={depsLink} />
    </div>
  );
}

// 배열을 문자열로 변환하여 중복을 제거하는 함수
export function removeDuplicateIn2DArray(arrs: string[][]) {
  let seen = new Set();
  return arrs.filter((item) => {
    let stringified = JSON.stringify(item);
    if (!seen.has(stringified)) {
      seen.add(stringified);
      return true;
    }
    return false;
  });
}

function makeDepsGraphItems(programData: IProgramData[]) {
  const deps = programData.map((data) => [
    ...data.project,
    `${data.fileName}.${data.programLanguage}`,
  ]);
  if (deps.length === 0) {
    return [];
  }
  if (deps.length === 1) {
    return deps;
  }

  return filterDuplicatedDependencies(removeDuplicateIn2DArray(deps));
}
