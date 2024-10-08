import {ConflictException, Injectable, InternalServerErrorException,} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {FindUserDto} from 'src/auth/dto/findUser.dto';
import {SignupDto} from 'src/auth/dto/signup.dto';
import {User, UserDocument} from 'src/user/domain/schema/user.schema';
import * as bcrypt from 'bcryptjs';
import {CheckDuplicate} from 'src/auth/dto/checkDuplicate.dto';
import {UserRepositoryPort} from "../../application/port/out/user.repository.port";

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findOne(findUserDto: FindUserDto) {
    const { email, apiKey } = findUserDto;
    return this.userModel.findOne({email, apiKey});
  }

  async checkDuplicate(input: CheckDuplicate) {
    const user = await this.userModel.findOne(input);
    return !!user;
  }
  async getAllGoalIds(email: string) {
    const user = await this.userModel.findOne({ email });
    const goals = user.get('goal');
    return goals;
  }

  async updateAccessToken(email: string, accessToken: string) {
    return this.userModel.updateOne({email}, {accessToken});
    // return await this.userModel.updateOne({ email }, { accessToken });
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({email});
    // return await this.userModel.findOne({ email });
  }

  async updateRefreshToken(email: string, refreshToken: string) {
    return this.userModel.updateOne({email}, {refreshToken});
    // return await this.userModel.updateOne({ email }, { refreshToken });
  }

  async createUser(signupDto: SignupDto, profileId: string) {
    const { nickname, email, apiKey, password } = signupDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await this.userModel.create({
        nickname,
        email,
        apiKey,
        password: hashedPassword,
        profile: profileId,
      });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        throw new ConflictException('Already exists user');
      } else {
        throw new InternalServerErrorException();
      }
    }
    // const user = new this.userModel({ nickname, email, apiKey, password });
    // return user.save();
  }

  async saveProgrammingTime(apiKey: string, timeModel: any) {
    return this.userModel.updateOne(
        {apiKey},
        {$push: {developTime: timeModel._id}},
    );
  }

  async getApiKeyByEmail(email: string) {
    try {
      const user = await this.findUserByEmail(email);
      return user.get('apiKey');
    } catch (err) {
      return null;
    }
  }

  async getEmailByApiKey(apiKey: string) {
    try {
      const user = await this.userModel.findOne({
        apiKey,
      });
      return { email: user.get('email'), nickname: user.get('nickname') };
    } catch (err) {
      return null;
    }
  }
}
