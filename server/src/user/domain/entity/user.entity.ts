import { Types } from 'mongoose';

export interface UserEntity extends Document {
  nickname: string;
  email: string;
  apiKey: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  developTime: Types.ObjectId[];
  goal: Types.ObjectId[];
  profile: Types.ObjectId;
}
