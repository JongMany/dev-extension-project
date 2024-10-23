import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";
import {format} from "date-fns";
import {languageMapper} from "@/constants/languageMapper";
import {ProgrammingLanguageExt} from "@/models/programming-info/vo/programmingLanguageProportion.vo";
import {ProgrammingActiveData} from "@/models/programming-info/vo/programmingLanguageDurationTrend.vo";

export function fillDefaultForInactiveDatesForAllLanguages(programData: UserProgrammingInfoResponseDTO[], dateSequence: string[]) {
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
                languageMapper[item.programmingLanguage as ProgrammingLanguageExt] || "other",
          }));
      result.push(...data);
    } else {
      result.push({
        programDay: date,
        programDuration: 0,
        programmingLanguage: "none",
        project: [],
        programmingTime: 0,
        fileName: "",
      });
    }
  }
  return result;
}

export const groupByProgrammingLanguage = (userProgrammingInfoResponseDTO: UserProgrammingInfoResponseDTO[]) => {
  return userProgrammingInfoResponseDTO.reduce((acc, cur) => {
    const language = cur.programmingLanguage;
    if (acc[language] === undefined) {
      acc[language] = [];
    }
    const data = {
      language: cur.programmingLanguage,
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
}

export function fillDefaultForInactiveDatesForEachLanguage(
    programData: ProgrammingActiveData[],
    dates: string[],
    language: string
) {
  const result: ProgrammingActiveData[] = [];
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