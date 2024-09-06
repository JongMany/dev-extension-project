import { Injectable } from '@nestjs/common';
import { eachDayOfInterval, format } from 'date-fns';
import { TimePayload } from 'src/time/domain/dto/saveProgrammingTime.dto';
import { UserRepository } from 'src/user/adapter/out/user.repository';
import {TimeServicePort} from "../application/port/in/time.service.port";
import {TimeRepositoryPort} from "../application/port/out/time.respository.port";

@Injectable()
export class TimeService implements TimeServicePort{
  constructor(
    private readonly timeRepositoryPort: TimeRepositoryPort,
    private readonly userRepository: UserRepository,
  ) {}
  async saveProgrammingTime(apiKey: string, payload: TimePayload) {
    try {
      const timeModel = await this.timeRepositoryPort.saveProgrammingTime(
        apiKey,
        payload,
      );
      await this.userRepository.saveProgrammingTime(apiKey, timeModel);
      return { status: 'OK' };
    } catch (err) {
      console.log('error', err);
      return { status: 'ERROR' };
    }
  }

  async getTimesDuringPeriod(email: string, [from, to]: [string, string]) {
    try {
      const userApiKey = await this.userRepository.getApiKeyByEmail(email);
      if (!userApiKey) {
        return [];
      }
      const allDates = eachDayOfInterval({ start: from, end: to });
      const dates = allDates.map((date) => format(date, 'yyyy/MM/dd'));

      const times = await this.timeRepositoryPort.getTimeDuringPeriod(
        [from, to],
        userApiKey,
      );



      const timeMap: TimeMap = times.reduce((acc, cur) => {

        const day = format(cur.getProgramDay(), 'yyyy-MM-dd');
        if (!acc[day]) {
          acc[day] = cur.getProgramDuration();
        } else {
          acc[day] += cur.getProgramDuration();
        }
        return acc;
      }, {});
      return Object.entries(timeMap).map(([date, programDuration]) => ({
        date,
        time: programDuration / (1000 * 60),
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async getProgrammingDataDuringPeriod(
    email: string,
    [from, to]: [string, string],
  ): Promise<{ programDuration: number; fileName: string; programmingLanguage: string; programDay: Date; project: string[]; programmingDate: Date }[]> {
    try {
      const userApiKey = await this.userRepository.getApiKeyByEmail(email);
      if (!userApiKey) {
        return [];
      }
      // const allDates = eachDayOfInterval({ start: from, end: to });
      // const dates = allDates.map((date) => format(date, 'yyyy/MM/dd'));

      const times = await this.timeRepositoryPort.getTimeDuringPeriod(
        [from, to],
        userApiKey,
      );

      return times.map((time) => time.getTimeObject());
    } catch (err) {
      console.log(err);
    }
  }

  async findMyRank(email: string, [from, to]: [string, string]) {
    try {
      const userApiKey = await this.userRepository.getApiKeyByEmail(email);
      if (!userApiKey) {
        return [];
      }
      const times = await this.timeRepositoryPort.getAllRank([from, to]);
      const result = times.find((time) => time._id.apiKey === userApiKey);
      const user = await this.userRepository.getEmailByApiKey(userApiKey);
      return {
        email: user.email,
        nickname: user.nickname,
        totalDuration: result?.totalDuration || 0,
        rank: result?.rank || 0,
      };
      // return times;
    } catch (err) {
      console.log(err);
    }
  }

  async getRanking([from, to]: [string, string]) {
    try {
      const times = await this.timeRepositoryPort.getRanking([from, to]);
      for (const time of times) {
        const user = await this.userRepository.getEmailByApiKey(
          time._id.apiKey,
        );
        time['email'] = user.email;
        time['nickname'] = user.nickname;
      }
      return times.map((item) => ({
        email: item['email'],
        nickname: item['nickname'],
        totalDuration: item.totalDuration,
      }));
    } catch (err) {
      console.log(err);
    }
  }
}

type TimeMap = {
  [key: string]: number;
};
