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
import { ImExportService } from './imExport.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';
import { CreateImExportDto } from './imExport.dto.';

@Controller('type')
export class ImExportController {
  constructor(private typeService: ImExportService) {}

  @Public()
  @Get()
  async getImExport() {
    try {
      return {
        data: await this.typeService.getImExports(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
  @Public()
  @Post()
  async createImExport(@Body() createImExportDto: CreateImExportDto) {
    try {
      return {
        data: await this.typeService.createImExport(createImExportDto),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
  @Public()
  @Delete(':id')
  async deleteImExport(@Param('id', ParseIntPipe) id: number) {
    try {
      return {
        data: await this.typeService.deleteImExport(id),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
