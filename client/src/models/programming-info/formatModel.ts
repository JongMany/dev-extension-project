import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";
import {
  ProgrammingLanguage, ProgrammingLanguageExt,
  ProgrammingLanguageProportionVO
} from "@/models/programming-info/vo/programmingLanguageProportion.vo";
import {languageMapper} from "@/constants/languageMapper";
import {
  EntireLanguageDurationTrendVO,
  ProgrammingActiveData, ProgrammingActiveDataPerLanguage, SeparateLanguageDurationTrendVO
} from "@/models/programming-info/vo/programmingLanguageDurationTrend.vo";

export function convertProgramDataToLanguageProportion(userProgrammingInfoResponseDTOs: UserProgrammingInfoResponseDTO[]): ProgrammingLanguageProportionVO[] {

  const aggregatedProgrammingTimeData: Record<ProgrammingLanguage, number> = aggregateProgrammingTimeByLanguage(userProgrammingInfoResponseDTOs);

  return Object.entries(aggregatedProgrammingTimeData).map(([language, duration]) => ({
    language,
    duration: duration,
  }));
}

function aggregateProgrammingTimeByLanguage(userProgrammingInfoResponseDTOs: UserProgrammingInfoResponseDTO[]) {
  return userProgrammingInfoResponseDTOs.reduce((acc, cur) => {
    const language: ProgrammingLanguage =
        languageMapper[cur.programLanguage as ProgrammingLanguageExt] ||
        languageMapper.other;
    acc[language] = (acc[language] || 0) + cur.programDuration;
    return acc;
  }, {} as Record<ProgrammingLanguage, number>);
}

export function toEntireLanguageDurationTrendVO(
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

export function toProgrammingActiveDataListPerLanguage(programmingInfoByLanguageDTO: Record<string, ProgrammingActiveData[]>): ProgrammingActiveDataPerLanguage[] {
  return Object.entries(programmingInfoByLanguageDTO)
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
      });
}

export const toSeparateLanguageDurationTrendVO = (
    programmingActiveDataListPerLanguage: ProgrammingActiveDataPerLanguage[],
    dates: string[],
    fillDefaultForInactiveDatesForEachLanguage: (programData: ProgrammingActiveData[],
                                                 dates: string[],
                                                 language: string) => ProgrammingActiveData[],
): SeparateLanguageDurationTrendVO => {

  const result: ProgrammingActiveDataPerLanguage = programmingActiveDataListPerLanguage.reduce((acc, cur) => {
    const key = Object.keys(cur)[0];
    const value = Object.values(cur)[0];

    const programLanguage =
        languageMapper[key as keyof typeof languageMapper] || "other";

    acc[programLanguage] = fillDefaultForInactiveDatesForEachLanguage(
        value,
        dates,
        languageMapper[value[0].language as keyof typeof languageMapper] ||
        "other"
    );
    return acc;
  }, {});

  return {data: result, option: "LANGUAGE"};
};