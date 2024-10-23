import {CheckDuplicate} from "../../../../auth/dto/checkDuplicate.dto";
import {Types, UpdateWriteOpResult, Document} from "mongoose";
import {SignupDto} from "../../../../auth/dto/signup.dto";
import {User, UserDocument} from "../../../domain/schema/user.schema";

export abstract class UserRepositoryPort {
  abstract checkDuplicate(input: CheckDuplicate): Promise<boolean>;

  abstract getAllGoalIds(email: string): Promise<Types.ObjectId[]>;

  abstract updateAccessToken(email: string, accessToken: string): Promise<UpdateWriteOpResult>;

  abstract updateRefreshToken(email: string, refreshToken: string): Promise<UpdateWriteOpResult>;

  abstract createUser(signupDto: SignupDto, profileId: string): Promise<void>;

  abstract saveProgrammingTime(apiKey: string, timeModel: any): Promise<UpdateWriteOpResult>;

  abstract getApiKeyByEmail(email: string): Promise<string>;

  abstract getEmailByApiKey(apiKey: string): Promise<{ email: string, nickname: string }>;

  abstract findUserByEmail(email: string): Promise<Document<unknown, {}, UserDocument> & User & Document<any, any, any> & { _id: Types.ObjectId }>;
}