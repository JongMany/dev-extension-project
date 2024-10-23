import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import {Response} from 'express';

import {SaveProgrammingTimeDto} from 'src/time/domain/dto/saveProgrammingTime.dto';
import {TimeServicePort} from "../../application/port/in/time.service.port";

@Controller('time')
export class TimeController {
  constructor(private timeServicePort: TimeServicePort) {
  }

  @Post('save')
  async saveProgrammingTime(
      @Body() saveTimeDto: SaveProgrammingTimeDto,
      // @Req() req: Request,
      @Res() res: Response,
  ) {
    try {
      const {apiKey, payload} = saveTimeDto;

      if (!apiKey) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'API KEY 없이 요청을 보냈습니다.'
        });
      } else {
        const result = await this.timeServicePort.saveProgrammingTime(
            apiKey,
            payload,
        );

        if (result.status === 'OK') {
          return res.status(HttpStatus.OK).json({message: 'SUCCESSFUL'});
        } else {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'error',
          });
        }
      }

    } catch (error) {
      return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({message: 'error'});
    }
  }

  @Get('/overall/:email/from/:from/to/:to')
  async getProgrammingTimeInformation(
      @Param('email') email: string,
      @Param('from') from: string,
      @Param('to') to: string,
      @Res() res: Response,
  ) {
    try {
      const result = await this.timeServicePort.getProgrammingDataDuringPeriod(
          email,
          [from, to],
      );
      return res.status(HttpStatus.OK).json({data: result});
    } catch (error) {
      return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({message: 'error'});
    }

  }

  @Get('/:email/from/:from/to/:to')
  async getProgrammingTime(
      @Param('email') email: string,
      @Param('from') from: string,
      @Param('to') to: string,
      @Res() res: Response,
  ) {
    try {
      const result = await this.timeServicePort.getProgrammingTimeByDateList(email, [
        from,
        to,
      ]);
      return res.status(HttpStatus.OK).json({data: result});
    } catch (error) {
      return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({message: 'error'});
    }
  }

  // Ranking은 별도 분리
  @Get('/rank/from/:from/to/:to')
  async getRanking(
      @Param('from') from: string,
      @Param('to') to: string,
      @Res() res: Response,
  ) {
    try {
      const result = await this.timeServicePort.getRanking([from, to]);
      return res.status(HttpStatus.OK).json({data: result});
    } catch (error) {
      return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({message: 'error'});
    }
  }

  @Get('/myRank/:email/from/:from/to/:to')
  async findMyRank(
      @Param('email') email: string,
      @Param('from') from: string,
      @Param('to') to: string,
      @Res() res: Response,
  ) {
    try {
      const result = await this.timeServicePort.findMyRank(email, [from, to]);
      return res.status(HttpStatus.OK).json({data: result});
    } catch (error) {
      return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({message: 'error'});
    }
  }
}
