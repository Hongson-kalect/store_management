import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { ProviderService } from './provider.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Provider')
@Controller('provider')
export class ProviderController {
  constructor(private typeService: ProviderService) {}

  @Public()
  @Get()
  async getHistoryRequest() {
    try {
      return {
        data: await this.typeService.getProviders(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
