import {TimePayload} from "../../../dto/saveTime.dto";
import {Document, Types} from "mongoose";
import {Time, TimeDocuemnt} from "../../../domain/schema/time.schema";

export abstract class TimeRepositoryPort {
  abstract saveProgrammingTime(apiKey: string, payload: TimePayload): Promise<Document<unknown, {}, TimeDocuemnt> & Time & Document<any, any, any> & { _id: Types.ObjectId }>;
  abstract getTimeDuringPeriod([from, to]: [string, string], apiKey: string):  Promise<any[]>;
  abstract getAllRank([from, to]: [string, string]): Promise<any[]>;
  abstract getRanking([from, to]: [string, string]): Promise<any[]>;
}