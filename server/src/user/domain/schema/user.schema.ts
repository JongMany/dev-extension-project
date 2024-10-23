import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { Goal } from 'src/goal/goal.schema';
import { Profile } from 'src/profile/profile.schema';
import { TimeSchemaModel } from 'src/time/domain/schema/time.schema';

@Schema()
// export class User extends Document {
export class User {
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  apiKey: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop()
  @IsString()
  accessToken: string;

  @Prop()
  @IsString()
  refreshToken: string;

  @Prop({ type: [Types.ObjectId], ref: TimeSchemaModel.name })
  developTime: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: Goal.name })
  goal: Types.ObjectId[];

  @Prop({ required: true, type: Types.ObjectId, ref: Profile.name })
  profile: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
