"use client";


import { useDuration } from "@/store/useDuration";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import TransitionChart, {HierarchyData} from "@components/shared/charts/TransitionChart";
import {IProgramData} from "@/models/programming-info/entity/programData.entity";
interface ProjectData {
  project: string[];
  duration: number;
}

export default function HierarchyChart() {
  const queryClient = useQueryClient();
  const { duration } = useDuration();
  const programData =
    queryClient.getQueryData<IProgramData[]>(["programmingTime", duration]) ||
    [];
  const hierarchyData = getHierarchyData(programData);

  return (
    <div>
      <TransitionChart hierarchyData={hierarchyData} />
    </div>
  );
}

// 동일한 경로까지는 제거
function removeCommonPrefix(programData: ProjectData[]) {
  if (programData.length === 0) return programData;

  // 첫 번째 객체의 project 배열을 기준으로 공통 접두사 길이 찾기
  let minLength = Math.min(...programData.map((obj) => obj.project.length));
  let commonPrefixLength = 0;

  for (let i = 0; i < minLength; i++) {
    let allMatch = programData.every(
      (obj) => obj.project[i] === programData[0].project[i]
    );
    if (allMatch) {
      commonPrefixLength++;
    } else {
      break;
    }
  }

  // 각 객체의 project 배열에서 공통 접두사 제거
  programData.forEach((obj) => {
    obj.project = obj.project.slice(commonPrefixLength);
  });

  return programData;
}

function getHierarchyData(programData: IProgramData[]): HierarchyData {
  const projectAndDuration = programData.map((data) => {
    return {
      project: [...data.project, `${data.fileName}.${data.programLanguage}`],
      duration: data.programDuration,
    };
  });
  removeCommonPrefix(projectAndDuration);

  return buildHierarchy(projectAndDuration);
}

// 계층구졸르 만들어줌
function buildHierarchy(
  objects: { project: string[]; duration: number }[]
): HierarchyData {
  const root: HierarchyData = { name: "root", children: [], value: 0, size: 0 };
  let roots: { [key: string]: any } = {};

  objects.forEach((obj) => {
    let path = obj.project;
    let current = roots;

    path.forEach((part, index) => {
      if (!current[part]) {
        current[part] = { name: part, children: [], value: 0, size: 0 };
      }

      if (index === path.length - 1) {
        current[part].value += obj.duration;
        current[part].size += obj.duration;
      } else {
        if (!current[part].childrenMap) {
          current[part].childrenMap = {};
        }
        current = current[part].childrenMap;
      }
    });
  });

  function convertToHierarchy(node: any): HierarchyData {
    if (node.childrenMap) {
      node.children = Object.values(node.childrenMap).map(convertToHierarchy);
      delete node.childrenMap;
      node.value = node.children.reduce(
        (sum: number, child: HierarchyData) => sum + child.value,
        0
      );
      node.size = node.value;
    }
    return node;
  }

  root.children =  Object.values(roots).map(convertToHierarchy);
  root.value = root.children.reduce((sum, child) => sum + child.value, 0);
  root.size = root.value;

  return root;
}
