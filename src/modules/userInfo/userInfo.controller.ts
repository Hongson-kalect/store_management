import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { UserInfoService } from './userInfo.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';

@Controller('type')
export class UserInfoController {
  constructor(private typeService: UserInfoService) {}

  @Public()
  @Get()
  async getHistoryRequest() {
    try {
      return {
        data: await this.typeService.getUserInfo(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
