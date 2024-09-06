import {TimePayload} from "../../../dto/saveTime.dto";

export abstract class TimeServicePort {
  abstract saveProgrammingTime(apiKey: string, payload: TimePayload): Promise<{ status: string }>;

  abstract getTimesDuringPeriod(email: string, [from, to]: [string, string]): Promise<{ date: string, time: number }[]>

  abstract getProgrammingDataDuringPeriod(
      email: string,
      [from, to]: [string, string],
  ): Promise<{ fileName: any, programDuration: any, programLanguage: any, project: any, programDay: any, programmingTime: any }[]>;

  abstract findMyRank(email: string, [from, to]: [string, string]):  Promise<any[] | {email: string, nickname: string, totalDuration: any, rank: any}>;
  abstract getRanking([from, to]: [string, string]): Promise<{email: any, nickname: any, totalDuration: any}[]>;

}