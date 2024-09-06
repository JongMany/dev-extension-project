import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';
import { Model } from 'mongoose';
import { TimePayload } from 'src/time/domain/dto/saveProgrammingTime.dto';
import { TimeSchemaModel } from 'src/time/domain/schema/time.schema';
import { ko } from 'date-fns/locale';
import {TimeRepositoryPort} from "../../application/port/out/time.respository.port";
import {TimeEntity} from "../../domain/entity/time.entity";
import TimeMapper from "../../mapper/time.mapper";
@Injectable()

export class TimeRepository implements TimeRepositoryPort{
  constructor(
    @InjectModel(TimeSchemaModel.name)
    private timeModel: Model<TimeEntity>,
  ) {}

  async saveProgrammingTime(apiKey: string, payload: TimePayload) {
    try {
      const currentDate = new Date();
      const current = format(currentDate, 'yyyy-MM-dd HH:mm:ss', {
        locale: ko,
      });
      const programDay = format(currentDate, 'yyyy-MM-dd', { locale: ko });
      const time = new this.timeModel({
        apiKey,
        // programmingDate: payload.currentTime,
        programmingDate: current,
        programDay: programDay,
        programDuration: payload.programmingTime,
        programLanguage: payload.extensionName,
        fileName: payload.fileName,
        project: payload.docs,
      });

      await time.save();
      return TimeMapper.toDomain(time);
    } catch (err) {
      console.log('save time error', err);
      throw new Error(err);
    }
  }

  async getTimeDuringPeriod([from, to]: [string, string], apiKey: string) {
    const times = await this.timeModel.find({
      programDay: { $gte: from, $lte: to },
      apiKey,
    });
    return TimeMapper.toDomains(times);
    // return time;
  }

  async getAllRank([from, to]: [string, string]) {
    const time = await this.timeModel.aggregate([
      {
        $match: {
          programDay: { $gte: new Date(from), $lte: new Date(to) },
        },
      },
      {
        $group: {
          _id: { apiKey: '$apiKey' },
          totalDuration: { $sum: '$programDuration' },
        },
      },
      {
        $sort: { totalDuration: -1 },
      },
      {
        $setWindowFields: {
          partitionBy: null, // 전체 집합에 대해 순위를 매깁니다
          sortBy: { totalDuration: -1 },
          output: {
            rank: {
              $denseRank: {},
            },
          },
        },
      },
    ]);
    console.log("allRank", time);
    return time;
  }

  async getRanking([from, to]: [string, string]) {
    // console.log(from, to);

    const time = await this.timeModel.aggregate([
      {
        $match: {
          programDay: { $gte: new Date(from), $lte: new Date(to) },
        },
      },
      {
        $group: {
          _id: { apiKey: '$apiKey' },
          totalDuration: { $sum: '$programDuration' },
        },
      },
      {
        $sort: { totalDuration: -1 },
      },
      {
        $limit: 20,
      },
    ]);
    console.log("myRank", time);
    return time;
  }
}
