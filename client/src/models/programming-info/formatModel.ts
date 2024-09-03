import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";
import {
  ProgrammingLanguage, ProgrammingLanguageExt,
  ProgrammingLanguageProportionVO
} from "@/models/programming-info/vo/programmingLanguageProportion.vo";
import {languageMapper} from "@/constants/languageMapper";

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
