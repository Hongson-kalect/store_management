import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { DeviceService } from './device.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Public()
  @Get()
  async getHistoryRequest() {
    try {
      return {
        data: await this.deviceService.getDevices(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
