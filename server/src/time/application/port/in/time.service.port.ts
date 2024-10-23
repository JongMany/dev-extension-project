import {TimePayload} from "../../../domain/dto/saveProgrammingTime.dto";
import {ProgrammingInformationDTO} from "../../../domain/dto/programmingInformation.dto";
import {ProgrammingTimeByDateDTO} from "../../../domain/dto/programmingTimeByDate.dto";


export abstract class TimeServicePort {
  abstract saveProgrammingTime(apiKey: string, payload: TimePayload): Promise<{ status: string }>;

  abstract getProgrammingTimeByDateList(email: string, [from, to]: [string, string]): Promise<ProgrammingTimeByDateDTO[]>

  abstract getProgrammingDataDuringPeriod(
      email: string,
      [from, to]: [string, string],
  ): Promise<ProgrammingInformationDTO[]>;

  abstract findMyRank(email: string, [from, to]: [string, string]): Promise<any[] | { email: string, nickname: string, totalDuration: any, rank: any }>;

  abstract getRanking([from, to]: [string, string]): Promise<{ email: any, nickname: any, totalDuration: any }[]>;

}