import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { DeviceService } from './device.service';
import {
  CustomRequest,
  ResponseMessage,
  ResponseStatus,
} from 'src/interfaces/global.type';
import { CreateDeviceDto, DeleteDeviceDTO } from './device.dto.';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Public()
  @Get()
  async getDevide() {
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

  @Post()
  async createDevice(
    @Body() createDeviceDTO: CreateDeviceDto,
    @Request() { userId }: CustomRequest,
  ) {
    try {
      return {
        data: await this.deviceService.createDevice({
          name: createDeviceDTO.name,
          userId,
        }),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async deleteDevice(@Body() deleteDeviceDTO: DeleteDeviceDTO) {
    try {
      return {
        data: await this.deviceService.deleteDevice(deleteDeviceDTO.id),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
