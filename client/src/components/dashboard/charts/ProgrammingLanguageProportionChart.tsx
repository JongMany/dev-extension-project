"use client";


import { useDuration } from "@/store/duration/useDuration";
import { useQueryClient } from "@tanstack/react-query";
import PieChartContainer from "@components/shared/charts/PieChartContainer";
import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";


export default function ProgrammingLanguageProportionChart() {
  const queryClient = useQueryClient();
  const { duration } = useDuration();
  const programData =
    queryClient.getQueryData<UserProgrammingInfoResponseDTO[]>(["programmingTime", duration]) ||
    [];

  const languageRates = convertProgramDataToLanguageRates(programData);

  return <PieChartContainer data={languageRates} />;
}

function convertProgramDataToLanguageRates(programData: UserProgrammingInfoResponseDTO[]) {
  const languageMap = programData.reduce((acc, cur) => {
    const language =
      languageMapper[cur.programLanguage as keyof typeof languageMapper] ||
      languageMapper.other;
    acc[language] = (acc[language] || 0) + cur.programDuration;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(languageMap).map(([language, duration]) => ({
    language,
    // languageMapper[language as keyof typeof languageMapper] ||
    // languageMapper.other,
    duration: duration,
  }));
}

const languageMapper = {
  js: "JavaScript",
  jsx: "JavaScript",
  ts: "TypeScript",
  tsx: "TypeScript",
  ipynb: "Python",
  py: "Python",
  java: "Java",
  kt: "Kotlin",
  swift: "Swift",
  go: "Go",
  rb: "Ruby",
  php: "Php",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  sql: "SQL",
  shell: "Shell",
  sh: "Shell",
  json: "json",
  geojson: "json",
  xml: "xml",
  yml: "yaml",
  yaml: "yaml",
  md: "markdown",
  txt: "text",
  other: "other",
};
