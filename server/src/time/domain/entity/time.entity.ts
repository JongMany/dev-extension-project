import {Document} from "mongoose";
// export type TimeEntity = Time & Document;
export interface TimeEntity extends Document {
  programDuration: number;
  programDay: Date; // 날짜
  programmingDate: Date; //프로그래밍한 시각
  apiKey: string;
  programLanguage: string;
  fileName: string;
  project: string[];
}