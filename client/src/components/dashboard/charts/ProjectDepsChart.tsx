"use client";

import { useDuration } from "@/store/duration/useDuration";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import GraphChart from "@components/shared/charts/GraphChart";
import {filterDuplicatedDependencies} from "@utils/chart/graph";
import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";


export default function ProjectDepsChart() {
  const queryClient = useQueryClient();
  const { duration } = useDuration();
  const programData =
    queryClient.getQueryData<UserProgrammingInfoResponseDTO[]>(["programmingTime", duration]) ||
    [];

  const depsLink = makeDepsGraphItems(programData);

  return (
    <div>
      <GraphChart depsData={depsLink} />
    </div>
  );
}

// 배열을 문자열로 변환하여 중복을 제거하는 함수
export function removeDuplicateIn2DArray(arr2D: string[][]) {
  let arrayStringSet = new Set();

  return arr2D.filter((arr) => {
    let stringifiedArray = JSON.stringify(arr);
    if (!arrayStringSet.has(stringifiedArray)) {
      arrayStringSet.add(stringifiedArray);
      return true;
    }
    return false;
  });
}

function makeDepsGraphItems(programData: UserProgrammingInfoResponseDTO[]) {
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
