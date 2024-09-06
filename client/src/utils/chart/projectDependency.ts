import {ProjectDependencyLinkVO} from "@/models/programming-info/vo/projectDependencyLink.vo";

const findDuplicateElementIndex = (deps: ProjectDependencyLinkVO[]) => {
  if (deps.length === 0) return -1;
  let minLength = Math.min(...deps.map((depArr) => depArr.length));
  let prefixLength = 0;

  for (let i = 0; i < minLength; i++) {
    let value = deps[0][i];
    if (deps.every((arr) => arr[i] === value)) {
      prefixLength++;
    } else {
      break;
    }
  }
  return prefixLength;
};
export const filterDuplicatedDependencies = (deps: ProjectDependencyLinkVO[]) => {
  const prefixLength = findDuplicateElementIndex(deps);
  return deps.map((dep) => dep.slice(prefixLength));
};

// 배열을 문자열로 변환하여 중복을 제거하는 함수
export function removeDuplicateInDependencyPath(dependencyLinks: ProjectDependencyLinkVO[]) {
  let dependencyLinkSet = new Set<string>();

  return dependencyLinks.filter((arr) => {
    let dependencyLink = JSON.stringify(arr);
    if (!dependencyLinkSet.has(dependencyLink)) {
      dependencyLinkSet.add(dependencyLink);
      return true;
    }
    return false;
  });
}

