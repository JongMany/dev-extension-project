"use client";
import {useDuration} from "@/store/duration/useDuration";
import {useQueryClient} from "@tanstack/react-query";
import {format} from "date-fns";
import {MouseEvent, useState} from "react";
import LineChart, {DefaultLineProp, LangaugeLineProp} from "@components/shared/charts/LineChart";
import {languageMapper} from "@/constants/languageMapper";
import {useIntervalDate} from "@hooks/shared/useIntervalDate";
import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";
import {ProgrammingLanguageExt} from "@/models/programming-info/vo/programmingLanguageProportion.vo";
import {
  EntireLanguageDurationTrendVO, ProgrammingActiveData,
  SeparateLanguageDurationTrendVO
} from "@/models/programming-info/vo/programmingLanguageDurationTrend.vo";


// 프로젝트는 아직 구현 안됨
type ProgrammingDurationTrendGraphOption = "ALL" | "LANGUAGE" | "PROJECT";

export default function ProgrammingDurationTrendGraph() {
  const [chartOption, setChartOption] = useState<ProgrammingDurationTrendGraphOption>("ALL");
  const queryClient = useQueryClient();
  const dates = useIntervalDate();
  const {duration} = useDuration();
  const programData =
      queryClient.getQueryData<UserProgrammingInfoResponseDTO[]>(["programmingTime", duration]) ||
      [];

  const selectChartOption = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLButtonElement) {
      setChartOption(event.target.name as ProgrammingDurationTrendGraphOption);
    }
  };

  const timeSeriesData = convertProgramDataToTimeSeries(
      fillDefaultForInactiveDates(programData, dates)
  );

  const timeSeriesDataPerLanguage =
      fillEmptyDatesAndConvertProgramDataToTimeSeriesByLanguage(
          programData,
          dates
      );
  console.log(timeSeriesDataPerLanguage)

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
          <button className={`${
              chartOption === "LANGUAGE"
                  ? "font-bold underline underline-offset-4"
                  : ""
          }`} name="LANGUAGE">
            언어별
          </button>
          {/* <button name="PROJECT">프로젝트별</button> */}
        </div>
        {chartOption === "ALL" && <LineChart data={timeSeriesData}/>}
        {chartOption === "LANGUAGE" && (
            <LineChart data={timeSeriesDataPerLanguage}/>
        )}
      </div>
  );
}

function fillDefaultForInactiveDates(programData: UserProgrammingInfoResponseDTO[], dateSequence: string[]) {
  const result: UserProgrammingInfoResponseDTO[] = [];
  const activeDates = programData.map((data) => format(data.programDay, "yyyy-MM-dd"))
  const activeDateSet = new Set(activeDates);

  for (const date of dateSequence) {
    if (activeDateSet.has(date)) {
      const data = programData
          .filter((d) => format(d.programDay, "yyyy-MM-dd") === date)
          .map((item) => ({
            ...item,
            programDay: format(item.programDay, "yyyy-MM-dd"),
            language:
                languageMapper[item.programLanguage as ProgrammingLanguageExt] || "other",
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

function convertProgramDataToTimeSeries(
    programData: UserProgrammingInfoResponseDTO[],
): EntireLanguageDurationTrendVO {
  const timeSeriesData = programData.reduce((acc, cur) => {
    const date = cur.programDay;
    acc[date] = (acc[date] || 0) + cur.programDuration;
    return acc;
  }, {} as Record<string, number>);

  const result: ProgrammingActiveData[] = Object.entries(timeSeriesData).map(([date, duration]) => ({
    date,
    duration,
    language: "전체",
  }));

  return {data: result, option: "ALL"};
}

type ProgramDataByLanguage = {
  date: string;
  duration: number;
  language: string;
};

function fillDefaultForInactiveDatesByLanguage(
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
  console.log(result)

  return result;
}

const fillEmptyDatesAndConvertProgramDataToTimeSeriesByLanguage = (
    programData: UserProgrammingInfoResponseDTO[],
    dates: string[]
): SeparateLanguageDurationTrendVO => {
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
  }, {} as Record<string, {
    language: string;
    date: string;
    duration: number
  }[]>);

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
        /* Mapper사용 */
        const language =
            languageMapper[key as keyof typeof languageMapper] || "other";
        // console.log("LANGUAGE", language);
        // acc[language] = fillDefaultForInactiveDatesByLanguage(value, dates, value[0].language);
        acc[language] = fillDefaultForInactiveDatesByLanguage(
            value,
            dates,
            languageMapper[value[0].language as keyof typeof languageMapper] ||
            "other"
        );
        return acc;
      }, {});

  return {data: result, option: "LANGUAGE"};
};
