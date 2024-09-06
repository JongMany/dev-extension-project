// https://git.hust.cc/echarts-for-react/examples/graph
import ReactECharts from "echarts-for-react";
import {makeDepsGraphLinkAndNode} from "@utils/chart/draw/graph";


const makeGraphChartOption = (depsData: any) => {
  const option = {
    // title: {
    //   text: "프로젝트 의존관계 그래프",
    //   left: "center",
    // },
    legend: {
      // data: ["HTMLElement", "WebGL", "SVG", "CSS", "Other"],
      data: depsData.categories,
      right:0
    },
    series: [
      {
        type: "graph",
        layout: "force",
        animation: false,
        label: {
          normal: {
            position: "right",
            formatter: "{b}",
          },
        },
        roam: true,
        draggable: true,
        data: depsData.nodes,
        // data: depsData.nodes.map(function (node: any, idx: number) {
        //   node.id = idx;
        //   return node;
        // }),
        categories: depsData.categories,
        edges: depsData.links,
        links: depsData.links,
        force: {
          initLayout: "circular",
          // repulsion: 20,
          edgeLength: [20, 15, 12, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5] || 5,
          repulsion: 20,
          gravity: 0.2,
        },
      },
    ],
    tooltip: {
      formatter: function (params: any) {
        const data = params.data;
        console.log(params);
        if (params.dataType === "node") {
          console.log(params);
          const targetRoutes = params.data.id
            .split("->")
            .filter((item: string) => item.length > 0)
            .join(" ➡ ");

          return `파일/폴더 명: ${params.name}<br/>경로: ${targetRoutes} `;
        }
      },
    },
  };
  return option;
};

type Props = {
  depsData: string[][];
};

const GraphChart = ({ depsData }: Props) => {
  const deps = makeDepsGraphLinkAndNode(depsData);
  console.log(deps);
  const webkitDep = {
    type: "force",
    categories: [
      // { name: "HTMLElement", keyword: {}, base: "HTMLElement" },
      // { name: "WebGL", keyword: {}, base: "WebGLRenderingContext" },
      // { name: "SVG", keyword: {}, base: "SVGElement" },
      // { name: "CSS", keyword: {}, base: "CSSRule" },
      // { name: "Other", keyword: {} },
      ...deps.categories,
    ],
    nodes: [
      // ...items
      ...deps.nodes,
    ],
    links: [
      // ...links
      ...deps.links,
    ],
  };
  const option = makeGraphChartOption(webkitDep);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-semibold text-[20px]">프로젝트 의존성 그래프</h1>
      <ReactECharts
        className="w-[600px]"
        option={option}
        style={{ height: "400px" }}
      />
    </div>
  );
};
export default GraphChart;
