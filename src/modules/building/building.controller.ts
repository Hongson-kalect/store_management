import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Body,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { BuildingService } from './building.service';
import {
  CustomRequest,
  ResponseMessage,
  ResponseStatus,
} from 'src/interfaces/global.type';
import { CreateBuildingDto, GetBuildingDto } from './building.dto.';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Building')
@Controller('building')
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  @Public()
  @Get()
  async getBuilding(@Query() getBuildingDto: GetBuildingDto) {
    try {
      return {
        data: await this.buildingService.getBuilding(getBuildingDto),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBody({ type: CreateBuildingDto })
  @Public()
  @Get(':id')
  async getBuildingById(@Param('id', ParseIntPipe) id: number) {
    try {
      return {
        data: await this.buildingService.getBuildingById(id),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async createBuilding(
    @Body() createBuildingDto: CreateBuildingDto,
    @Request() { user }: CustomRequest,
  ) {
    try {
      return {
        data: await this.buildingService.createBuilding({
          user: user,
          ...createBuildingDto,
        }),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
