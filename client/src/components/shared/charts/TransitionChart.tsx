"use client";
import ReactECharts from "echarts-for-react";
import { ChangeEvent, useState } from "react";

// https://echarts.apache.org/examples/en/editor.html?c=treemap-sunburst-transition
export type HierarchyData = {
  name: string;
  children: HierarchyData[];
  value: number;
  size: number; // value와 size는 같은 값
};

type Props = {
  hierarchyData: HierarchyData;
};

function makeTreemapOption(hierarchyData: HierarchyData) {
  return {
   
    series: [
      {
        type: "treemap",
        id: "echarts-package-size",
        animationDurationUpdate: 1000,
        roam: false,
        nodeClick: undefined,
        data: hierarchyData.children,
        universalTransition: true,
        label: {
          show: true,
        },
        breadcrumb: {
          show: false,
        },
      },
    ],
  };
}

function makeSunburstOption(hierarchyData: HierarchyData) {
  return {
    series: [
      {
        type: "sunburst",
        id: "echarts-package-size",
        radius: ["20%", "90%"],
        animationDurationUpdate: 1000,
        nodeClick: undefined,
        data: hierarchyData.children,
        universalTransition: true,
        itemStyle: {
          borderWidth: 1,
          borderColor: "rgba(255,255,255,.5)",
        },
        label: {
          show: false,
          // show: true,
          // rotate: "radial",
        },
        tooltip: {
          formatter: function (params: any) {
            return `${params.data.name || 'UNKNOWN'}`
          },
        },
      },
    ],
    tooltip: {
      formatter: function (params: any) {
        return `${params.data.name || 'UNKNOWN'}`
      },
    },
  };
}
type Option = "TREE" | "SUNBURST";
export default function TransitionChart({ hierarchyData }: Props) {
  const [transitionOption, setTransitionOption] = useState<Option>("TREE");
  const treemapOption = makeTreemapOption(hierarchyData);
  const sunburstOption = makeSunburstOption(hierarchyData);

  const changeOptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTransitionOption(e.target.value as Option);
  };

  const option = transitionOption === "TREE" ? treemapOption : sunburstOption;

  return (
    <div>
      <nav>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                id="horizontal-list-radio-license"
                type="radio"
                value="TREE"
                name="transition-option"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                defaultChecked={true}
                onChange={changeOptionHandler}
              />
              <label
                htmlFor="horizontal-list-radio-license"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                TreeMap
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                id="horizontal-list-radio-id"
                type="radio"
                value="SUNBURST"
                name="transition-option"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={changeOptionHandler}
              />
              <label
                htmlFor="horizontal-list-radio-id"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                SunburstMap
              </label>
            </div>
          </li>
        </ul>
      </nav>
      <ReactECharts
        className="w-[600px]"
        option={option}
        style={{ height: "400px" }}
      />
    </div>
  );
}
