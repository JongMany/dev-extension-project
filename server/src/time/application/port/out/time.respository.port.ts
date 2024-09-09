import {TimePayload} from "../../../domain/dto/saveProgrammingTime.dto";


import {Optional} from "typescript-optional";
import Time from "../../../domain/model/time.model";
import {ClientSession} from "mongoose";

export abstract class TimeRepositoryPort {
  abstract saveProgrammingTime(apiKey: string, payload: TimePayload, session: ClientSession): Promise<Optional<Time>>;

  abstract getTimeDuringPeriod([from, to]: [string, string], apiKey: string): Promise<Time[]>;

  abstract getAllRank([from, to]: [string, string]): Promise<any[]>;

  abstract getRanking([from, to]: [string, string]): Promise<any[]>;

  abstract removeProgrammingTime(apiKey: string, developTimeToRemove: string, session: ClientSession);

  abstract startTransaction();

  abstract commitTransaction(session: ClientSession);

  abstract abortTransaction(session: ClientSession);
}