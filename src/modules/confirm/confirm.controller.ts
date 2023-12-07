import { Body, Controller, HttpStatus, Post, Get, Param } from '@nestjs/common';
import { ConfirmService } from './confirm.service';
import { ResponseData, ResponseMessage } from 'src/interfaces/global.type';
import { VerifyDto } from './confirm.type';
import { Public } from '../utils/guard/guard.jwt.metadata';

@Controller('confirm')
export class ConfirmController {
  constructor(private confirmService: ConfirmService) {}

  @Public()
  @Get()
  async getConfirm() {
    return new ResponseData(
      await this.confirmService.getConfirms(),
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
    );
  }

  @Public()
  @Get('new-device/:id')
  async verifyNewDevice(@Param('new-device/:id') id: string) {
    return new ResponseData(
      await this.confirmService.confirmNewDevice(id),
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
    );
  }

  @Public()
  @Post()
  async verify(@Body() verifyDto: VerifyDto) {
    return new ResponseData(
      await this.confirmService.verifyConfirm(verifyDto),
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
    );
  }
}
