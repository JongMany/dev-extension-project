"use client";
import EChartsReact from "echarts-for-react";

export default function MainText() {
  const option = {
    graphic: {
      elements: [
        {
          type: "text",
          left: "center",
          top: "center",
          style: {
            text: "StudyLog",
            fontSize: 80,
            fontWeight: "bold",
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: "transparent",
            stroke: "#000",
            lineWidth: 1,
          },
          keyframeAnimation: {
            duration: 4000,
            // delay: 1500,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: "transparent",
                  lineDashOffset: 200,
                  lineDash: [200, 0],
                },
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: "transparent",
                },
              },
              {
                percent: 1,
                style: {
                  fill: "black",
                },
              },
            ],
          },
        },
      ],
    },
  };
  return <EChartsReact option={option} />;
}
