import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { HistoryRequestService } from './historyRequest.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';

@Controller('history-request')
export class HistoryRequestController {
  constructor(private historyRequestService: HistoryRequestService) {}

  @Public()
  @Get()
  async getHistoryRequest() {
    try {
      return {
        data: await this.historyRequestService.getHistoryRequests(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
