import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { FeeService } from './fee.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';
import { CreateFeeDto } from './fee.dto.';

@Controller('fee')
export class FeeController {
  constructor(private feeService: FeeService) {}

  @Public()
  @Get()
  async getFee() {
    try {
      return {
        data: await this.feeService.getFees(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async createFee(@Body() createFeeDto: CreateFeeDto) {
    //continue
    try {
      return {
        data: await this.feeService.createFee(createFeeDto),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async deleteFee(@Param('id', ParseIntPipe) id: number) {
    try {
      return {
        data: await this.feeService.deleteFee(id),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
