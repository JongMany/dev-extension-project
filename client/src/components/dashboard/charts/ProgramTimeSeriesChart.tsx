"use client";
import { useDuration } from "@/store/duration/useDuration";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { MouseEvent, useState } from "react";
import LineChart, {DefaultLineProp, LangaugeLineProp} from "@components/shared/charts/LineChart";
import {languageMapper} from "@/constants/languageMapper";
import {useIntervalDate} from "@hooks/shared/useIntervalDate";
import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";


type ChartOption = "ALL" | "LANGUAGE" | "PROJECT";

export default function ProgramTimeSeriesChart() {
  const [chartOption, setChartOption] = useState<ChartOption>("ALL");
  const queryClient = useQueryClient();
  const dates = useIntervalDate();
  const { duration } = useDuration();
  const programData =
    queryClient.getQueryData<UserProgrammingInfoResponseDTO[]>(["programmingTime", duration]) ||
    [];

  // 빈 날짜에 해당하는 데이터를 채워넣어야 함
  // const filledProgramData = fillEmptyDay(programData, dates);

  const selectChartOption = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLButtonElement) {
      console.log(event.target.name);
      setChartOption(event.target.name as ChartOption);
    }
  };

  const timeSeriesData = fillEmptyDatesAndConvertProgramDataToTimeSeries(
    programData,
    dates
  );

  const timeSeriesDataPerLanguage =
    fillEmptytDatesAndConvertProgramDataToTimeSeriesByLanguage(
      programData,
      dates
    );

  console.log(timeSeriesDataPerLanguage);

  return (
    <div>
      <div onClick={selectChartOption} className="flex text-xl gap-x-2">
        <button
          className={`${
            chartOption === "ALL"
              ? "font-bold underline underline-offset-4"
              : ""
          }`}
          name="ALL"
        >
          전체
        </button>
        <button  className={`${
            chartOption === "LANGUAGE"
              ? "font-bold underline underline-offset-4"
              : ""
          }`} name="LANGUAGE">
          언어별
        </button>
        {/* <button name="PROJECT">프로젝트별</button> */}
      </div>
      {chartOption === "ALL" && <LineChart data={timeSeriesData} />}
      {chartOption === "LANGUAGE" && (
        <LineChart data={timeSeriesDataPerLanguage} />
      )}
    </div>
  );
}

function fillEmptyDay(programData: UserProgrammingInfoResponseDTO[], dates: string[]) {
  const result: UserProgrammingInfoResponseDTO[] = [];
  const programDateSet = new Set(
    programData.map((data) => format(data.programDay, "yyyy-MM-dd"))
  );
  for (const date of dates) {
    if (programDateSet.has(date)) {
      const data = programData
        .filter((d) => format(d.programDay, "yyyy-MM-dd") === date)
        .map((item) => ({
          ...item,
          programDay: format(item.programDay, "yyyy-MM-dd"),
          language:
            languageMapper[
              item.programLanguage as keyof typeof languageMapper
            ] || "other",
        }));
      result.push(...data);
    } else {
      result.push({
        programDay: date,
        programDuration: 0,
        programLanguage: "none",
        project: [],
        programmingTime: 0,
        fileName: "",
      });
    }
  }

  return result;
}

function fillEmptyDatesAndConvertProgramDataToTimeSeries(
  programData: UserProgrammingInfoResponseDTO[],
  dates: string[]
): DefaultLineProp {
  const filledProgramData = fillEmptyDay(programData, dates);
  const timeSeriesData = filledProgramData.reduce((acc, cur) => {
    const date = cur.programDay;

    acc[date] = (acc[date] || 0) + cur.programDuration;
    return acc;
  }, {} as Record<string, number>);
  const result = Object.entries(timeSeriesData).map(([date, duration]) => ({
    date,
    duration,
    language: "전체",
  }));
  // console.log(result);
  // return result;
  return { data: result, option: "ALL" };
}

type ProgramDataByLanguage = {
  date: string;
  duration: number;
  language: string;
};
function fillEmptyDayByLanguage(
  programData: ProgramDataByLanguage[],
  dates: string[],
  language: string
) {
  const result: ProgramDataByLanguage[] = [];
  const programDateSet = new Set(
    programData.map((data) => format(data.date, "yyyy-MM-dd"))
  );
  for (const date of dates) {
    if (programDateSet.has(date)) {
      const data = programData
        .filter((d) => format(d.date, "yyyy-MM-dd") === date)
        .map((item) => ({
          ...item,
          programDay: format(item.date, "yyyy-MM-dd"),
          language:
            languageMapper[item.language as keyof typeof languageMapper] ||
            "other",
        }));
      result.push(...data);
    } else {
      result.push({
        date,
        duration: 0,
        language,
      });
    }
  }

  return result;
}

const fillEmptytDatesAndConvertProgramDataToTimeSeriesByLanguage = (
  programData: UserProgrammingInfoResponseDTO[],
  dates: string[]
): LangaugeLineProp => {
  /* 언어별로 데이터 모으기 */

  const timeSeriesData = programData.reduce((acc, cur) => {
    const language = cur.programLanguage;
    if (acc[language] === undefined) {
      acc[language] = [];
    }
    const data = {
      language: cur.programLanguage,
      date: cur.programDay,
      duration: cur.programDuration,
    };
    acc[language].push(data);
    return acc;
  }, {} as Record<string, { language: string; date: string; duration: number }[]>);

  /* 언어별로 모인 데이터를 날짜별로 재가공 */
  const result = Object.entries(timeSeriesData)
    .map(([language, value]) => {
      const timeObjectByDate = value.reduce((acc, cur) => {
        const date = cur.date;

        acc[date] = (acc[date] || 0) + cur.duration;
        return acc;
      }, {} as Record<string, number>);

      const data = Object.entries(timeObjectByDate).map(([date, duration]) => ({
        date,
        duration,
        language,
      }));
      return {
        [language]: data,
      };
    })
    .reduce((acc, cur) => {
      const key = Object.keys(cur)[0];
      const value = Object.values(cur)[0];
      console.log(key, value);
      /* Mapper사용 */
      const language =
        languageMapper[key as keyof typeof languageMapper] || "other";
      console.log("LANGUAGE", language);
      // acc[language] = fillEmptyDayByLanguage(value, dates, value[0].language);
      acc[language] = fillEmptyDayByLanguage(
        value,
        dates,
        languageMapper[value[0].language as keyof typeof languageMapper] ||
          "other"
      );
      return acc;
    }, {});

  return { data: result, option: "LANGUAGE" };
};
