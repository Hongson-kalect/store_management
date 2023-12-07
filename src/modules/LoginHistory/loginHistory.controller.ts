import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { LoginHistoryService } from './loginHistory.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';

@Controller('login-history')
export class LoginHistoryController {
  constructor(private loginHistoryService: LoginHistoryService) {}

  @Public()
  @Get()
  async getHistoryRequest() {
    try {
      return {
        data: await this.loginHistoryService.getLoginHistorys(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
