import {TimePayload} from "../../../domain/dto/saveProgrammingTime.dto";


import {Optional} from "typescript-optional";
import Time from "../../../domain/model/time.model";

export abstract class TimeRepositoryPort {
  abstract saveProgrammingTime(apiKey: string, payload: TimePayload): Promise<Optional<Time>>;
  abstract getTimeDuringPeriod([from, to]: [string, string], apiKey: string):  Promise<Time[]>;
  abstract getAllRank([from, to]: [string, string]): Promise<any[]>;
  abstract getRanking([from, to]: [string, string]): Promise<any[]>;
}