"use client";

import { useDuration } from "@/store/duration/useDuration";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import GraphChart from "@components/shared/charts/GraphChart";

import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";
import {toProjectDependencyLinkVO} from "@/models/programming-info/formatModel";


export default function ProjectDependencyChart() {
  const queryClient = useQueryClient();
  const { duration } = useDuration();
  const userProgrammingInfoResponseDTOs =
    queryClient.getQueryData<UserProgrammingInfoResponseDTO[]>(["programmingTime", duration]) ||
    [];

  const depsLink = toProjectDependencyLinkVO(userProgrammingInfoResponseDTOs);

  return (
    <div>
      <GraphChart depsData={depsLink} />
    </div>
  );
}

