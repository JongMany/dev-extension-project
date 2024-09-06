import {Document} from "mongoose";
import {Time} from "../schema/time.schema";

export type TimeEntity = Time & Document;