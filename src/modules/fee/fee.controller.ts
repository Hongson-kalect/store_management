import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { FeeService } from './fee.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';

@Controller('fee')
export class FeeController {
  constructor(private typeService: FeeService) {}

  @Public()
  @Get()
  async getFee() {
    try {
      return {
        data: await this.typeService.getFees(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async createFee() {
    //continue
    try {
      return {
        data: await this.typeService.getFees(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
