import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { HistoryRequestService } from './historyRequest.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';
import { CreateHistoryRequestDto } from './historyRequest.dto.';

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

  @Public()
  @Post()
  async createHistoryRequest(
    @Body() createHistoryRequestDto: CreateHistoryRequestDto,
  ) {
    try {
      return {
        data: await this.historyRequestService.createHistoryRequest(
          createHistoryRequestDto,
        ),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {}
  }

  @Public()
  @Delete(':id')
  async deleteHistoryRequest(@Param('id', ParseIntPipe) id: number) {
    try {
      return {
        data: await this.historyRequestService.deleteHistoryRequest(id),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {}
  }
}
