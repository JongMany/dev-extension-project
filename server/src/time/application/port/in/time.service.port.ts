import {TimePayload} from "../../../domain/dto/saveProgrammingTime.dto";
import {ProgrammingInformationDTO} from "../../../domain/dto/programmingInformation.dto";
import {ProgrammingTimeDTO} from "../../../domain/dto/programmingTime.dto";

export abstract class TimeServicePort {
  abstract saveProgrammingTime(apiKey: string, payload: TimePayload): Promise<{ status: string }>;

  abstract getTimesDuringPeriod(email: string, [from, to]: [string, string]): Promise<ProgrammingTimeDTO[]>

  abstract getProgrammingDataDuringPeriod(
      email: string,
      [from, to]: [string, string],
  ): Promise<ProgrammingInformationDTO[]>;

  abstract findMyRank(email: string, [from, to]: [string, string]): Promise<any[] | { email: string, nickname: string, totalDuration: any, rank: any }>;

  abstract getRanking([from, to]: [string, string]): Promise<{ email: any, nickname: any, totalDuration: any }[]>;

}