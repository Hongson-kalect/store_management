import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { RoomPriceService } from './roomPrice.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';

@Controller('type')
export class RoomPriceController {
  constructor(private typeService: RoomPriceService) {}

  @Public()
  @Get()
  async getHistoryRequest() {
    try {
      return {
        data: await this.typeService.getRoomPrices(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
