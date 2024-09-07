import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { TimePayload } from 'src/time/domain/dto/saveProgrammingTime.dto';
import { UserRepository } from 'src/user/adapter/out/user.repository';
import {TimeServicePort} from "../application/port/in/time.service.port";
import {TimeRepositoryPort} from "../application/port/out/time.respository.port";
import Time from "../domain/model/time.model";
import {ProgrammingTimeByDateDTO, ProgrammingTimeByDateMap} from "../domain/dto/programmingTimeByDate.dto";



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

  async getProgrammingTimeByDateList(email: string, [from, to]: [string, string]) {
    try {
      const userApiKey = await this.userRepository.getApiKeyByEmail(email);
      if (!userApiKey) {
        return [];
      }

      const times = await this.timeRepositoryPort.getTimeDuringPeriod(
        [from, to],
        userApiKey,
      );
      const programmingTimeByDate: ProgrammingTimeByDateMap = this.aggregateTimesByDate(times);
      return this.convertProgrammingTimeByDateToProgrammingTimeDTO(programmingTimeByDate)
    } catch (err) {
      console.error('Error fetching times during period:', err);
      throw new Error('Failed to retrieve programming times.');
    }
  }

  // 날짜별로 프로그래밍 시간을 합산하는 함수
  private aggregateTimesByDate(times: Time[]): ProgrammingTimeByDateMap {
    return times.reduce((acc, cur) => {
      const day = format(cur.getProgramDay(), 'yyyy-MM-dd');
      acc[day] = (acc[day] || 0) + cur.getProgramDuration();
      return acc;
    }, {} as ProgrammingTimeByDateMap);
  }

  // 합산된 시간을 포맷에 맞춰 변환하는 함수
  private convertProgrammingTimeByDateToProgrammingTimeDTO(programmingTimeByDate: ProgrammingTimeByDateMap): ProgrammingTimeByDateDTO[] {
    return Object.entries(programmingTimeByDate).map(([date, programDuration]) => ({
      date,
      time: programDuration / (1000 * 60), // 시간을 분 단위로 변환
    }));
  }
  async getProgrammingDataDuringPeriod(
    email: string,
    [from, to]: [string, string],
  ) {
    try {
      const userApiKey = await this.userRepository.getApiKeyByEmail(email);
      if (userApiKey) {
        const times = await this.timeRepositoryPort.getTimeDuringPeriod(
            [from, to],
            userApiKey,
        );
        return times.map((time) => time.getTimeObject());
      } else {
        return [];
      }

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
