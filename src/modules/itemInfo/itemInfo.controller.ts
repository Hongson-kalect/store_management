import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { ItemInfoService } from './itemInfo.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';

@Controller('type')
export class ItemInfoController {
  constructor(private typeService: ItemInfoService) {}

  @Public()
  @Get()
  async getHistoryRequest() {
    try {
      return {
        data: await this.typeService.getItemInfos(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
