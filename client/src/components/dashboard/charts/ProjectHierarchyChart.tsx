"use client";

import { useDuration } from "@/store/duration/useDuration";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import TransitionChart from "@components/shared/charts/TransitionChart";
import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";
import {toProjectHierarchyVO} from "@/models/programming-info/formatModel";

interface ProjectData {
  project: string[];
  duration: number;
}

export default function ProjectHierarchyChart() {
  const queryClient = useQueryClient();
  const { duration } = useDuration();
  const userProgrammingInfoResponseDTOs =
    queryClient.getQueryData<UserProgrammingInfoResponseDTO[]>(["programmingTime", duration]) ||
    [];

  const projectHierarchyVO = toProjectHierarchyVO(userProgrammingInfoResponseDTOs);

  return (
    <div>
      <TransitionChart hierarchyData={projectHierarchyVO} />
    </div>
  );
}







