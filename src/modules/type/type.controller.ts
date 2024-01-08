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
import { TypeService } from './type.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';
import { ApiTags } from '@nestjs/swagger';
import { CreateTypeDto } from './type.dto.';

@ApiTags('Type')
@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Public()
  @Get(':id')
  async getTypeById(@Param('id', ParseIntPipe) id: number) {
    try {
      return {
        data: await this.typeService.getTypes({ id: [id] }),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Get()
  async getType() {
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

  @Public()
  @Post()
  async createType(@Body() createTypeDto: CreateTypeDto) {
    try {
      return {
        data: await this.typeService.createType(createTypeDto),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
  @Public()
  @Delete(':id')
  async deleteType(@Param('id', ParseIntPipe) id: number) {
    try {
      return {
        data: await this.typeService.deleteType(id),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
