import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import {UserServicePort} from "../../application/port/in/user.service.port";

@Controller('user')
// @UseGuards(AuthGuard('access'))
export class UserController {
  constructor(private userServicePort: UserServicePort) {}

  @Get('/nickname/:email')
  async getUserNickNameByEmail(
    @Param('email') email: string,
    @Res() res: Response,
  ) {
    try {
      const nickname = await this.userServicePort.getUserNickNameByEmail(email);
      if (nickname) {
        return res.status(200).json({
          nickname,
        });
      } else {
        return res.status(404).json({
          error: '해당 이메일에 대한 유저가 없습니다.',
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: '유저 닉네임을 불러오는 중 에러가 발생했습니다.',
      });
    }
  }

  // @Get('/get-apiKey')
  // getApiKey(@Req() req: Request, @Res() res: Response) {
  //   return res.status(200).json({
  //     good: 'good',
  //   });
  // }
}
