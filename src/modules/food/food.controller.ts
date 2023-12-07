import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { FoodService } from './food.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';

@Controller('type')
export class FoodController {
  constructor(private typeService: FoodService) {}

  @Public()
  @Get()
  async getHistoryRequest() {
    try {
      return {
        data: await this.typeService.getFoods(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
