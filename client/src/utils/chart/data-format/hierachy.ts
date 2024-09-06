// 동일한 경로까지 제거
import {ProjectDuration, ProjectHierarchyVO} from "@/models/programming-info/vo/projectHierarchy.vo";

export function removeDuplicatePath(programData: ProjectDuration[]) {
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

// 계층구조를 만들어줌
export function buildProjectHierarchyStructure(
    objects: { project: string[]; duration: number }[]
): ProjectHierarchyVO {
  const root: ProjectHierarchyVO = { name: "root", children: [], value: 0, size: 0 };
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

  function convertToHierarchy(node: any): ProjectHierarchyVO {
    if (node.childrenMap) {
      node.children = Object.values(node.childrenMap).map(convertToHierarchy);
      delete node.childrenMap;
      node.value = node.children.reduce(
          (sum: number, child: ProjectHierarchyVO) => sum + child.value,
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
