import {TimePayload} from "../../../domain/dto/saveProgrammingTime.dto";

export abstract class TimeServicePort {
  abstract saveProgrammingTime(apiKey: string, payload: TimePayload): Promise<{ status: string }>;

  abstract getTimesDuringPeriod(email: string, [from, to]: [string, string]): Promise<{ date: string, time: number }[]>

  abstract getProgrammingDataDuringPeriod(
      email: string,
      [from, to]: [string, string],
  ): Promise< {programmingLanguage: string, programDay: Date, programDuration: number, programmingDate: Date, fileName: string, project: string[]}[]>;

  abstract findMyRank(email: string, [from, to]: [string, string]):  Promise<any[] | {email: string, nickname: string, totalDuration: any, rank: any}>;
  abstract getRanking([from, to]: [string, string]): Promise<{email: any, nickname: any, totalDuration: any}[]>;

}