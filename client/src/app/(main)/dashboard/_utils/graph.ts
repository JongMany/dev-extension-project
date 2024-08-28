const findDuplicateElementIndex = (deps: string[][]) => {
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

export const filterDuplicatedDependencies = (deps: string[][]) => {
  const prefixLength = findDuplicateElementIndex(deps);
  return deps.map((dep) => dep.slice(prefixLength));
};

type Category = {
  name: string;
};
type Link = {
  source: string;
  target: string;
  lineStyle: {
    width?: number;
    curveness?: number;
    length?: number;
  };
  depth: number;
};
type Node = {
  id: string;
  name: string;
  category: number;
  symbolSize?: number;
};

export const makeDepsGraphLinkAndNode = (deps: string[][]) => {
  const nodes: Node[] = [];
  const links: Link[] = [];
  const categories: Category[] = [];
  const categoryIndexMap = {} as Record<string, number>;
  const depsRouteMap = {} as Record<string, boolean>;

  /* 카테고리 구하기 */
  deps.forEach((dep, index) => {
    const category = dep[0];
    if (categoryIndexMap[category] === undefined) {
      categoryIndexMap[category] = categories.length;
      categories.push({ name: category });
    }
  });

  /* 노드와 링크를 구하기 */
  deps.forEach((dep, index) => {
    let route = "";
    deps[index].forEach((value, idx) => {
      if (idx === 0) route = "";
      route += `${value}->`;
      /* 노드를 만들기 */
      if (!depsRouteMap[route]) {
        const nodeName = `${route}`;
        nodes.push({
          id: nodeName,
          name: value,
          category: categoryIndexMap[dep[0]],
          symbolSize: 18 / (idx * 0.3 + 1),
        });
        /* 카테고리 하위 노드는 링크로 연결 */
        if (idx > 0) {
          const splitedRoute = route
            .split("->")
            .filter((item) => item.length > 0);

          const source = `${splitedRoute
            .slice(0, splitedRoute.length - 1)
            .join("->")}->`;

          if (depsRouteMap[source]) {
            // console.log(depsRouteMap, source);
            links.push({
              source,
              target: nodeName,
              lineStyle: {
                width: 2,
                // curveness: 0.2,
                length: 10 / (idx * 0.3)
              },
              depth: idx,
            });
          }
        }
        depsRouteMap[route] = true;
      }
    });
  });

  return {
    nodes,
    links,
    categories,
  };
};
