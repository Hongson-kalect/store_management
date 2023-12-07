import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { TypeService } from './type.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';

@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Public()
  @Get()
  async getHistoryRequest() {
    try {
      return {
        data: await this.typeService.getTypes(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
