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
  EntireLanguageDurationTrendVO, ProgrammingActiveData, ProgrammingActiveDataPerLanguage,
  SeparateLanguageDurationTrendVO
} from "@/models/programming-info/vo/programmingLanguageDurationTrend.vo";
import {pipe} from "@utils/shared/common/pipe";
import {
  toEntireLanguageDurationTrendVO,
  toProgrammingActiveDataListPerLanguage, toSeparateLanguageDurationTrendVO
} from "@/models/programming-info/formatModel";
import {
  fillDefaultForInactiveDatesForAllLanguages,
  fillDefaultForInactiveDatesForEachLanguage,
  groupByProgrammingLanguage
} from "@utils/chart/data-format/durationTrend";


// 프로젝트는 아직 구현 안됨
type ProgrammingDurationTrendGraphOption = "ALL" | "LANGUAGE" | "PROJECT";

export default function ProgrammingDurationTrendGraph() {
  const [chartOption, setChartOption] = useState<ProgrammingDurationTrendGraphOption>("ALL");
  const queryClient = useQueryClient();
  const dates = useIntervalDate();
  const {duration} = useDuration();
  const userProgrammingInfoResponseDTO =
      queryClient.getQueryData<UserProgrammingInfoResponseDTO[]>(["programmingTime", duration]) ||
      [];

  const selectChartOption = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLButtonElement) {
      setChartOption(event.target.name as ProgrammingDurationTrendGraphOption);
    }
  };


  const timeSeriesData = toEntireLanguageDurationTrendVO(
      fillDefaultForInactiveDatesForAllLanguages(userProgrammingInfoResponseDTO, dates)
  );

  console.log(
      pipe(
          groupByProgrammingLanguage,
          toProgrammingActiveDataListPerLanguage,
      )(userProgrammingInfoResponseDTO)
  )

  const timeSeriesDataPerLanguage =
      toSeparateLanguageDurationTrendVO(
          pipe(
              groupByProgrammingLanguage,
              toProgrammingActiveDataListPerLanguage,
          )(userProgrammingInfoResponseDTO),
          dates,
          fillDefaultForInactiveDatesForEachLanguage
      );


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




