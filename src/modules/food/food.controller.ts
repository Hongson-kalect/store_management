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
import { FoodService } from './food.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';
import { CreateFoodDto } from './food.dto.';

@Controller('type')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Public()
  @Get()
  async getFood() {
    try {
      return {
        data: await this.foodService.getFoods(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
  @Public()
  @Post()
  async createFood(@Body() createFoodDto: CreateFoodDto) {
    try {
      return {
        data: await this.foodService.createFood(createFoodDto),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
  @Public()
  @Delete(':id')
  async deleteFood(@Param('id', ParseIntPipe) id: number) {
    try {
      return {
        data: await this.foodService.deleteFood(id),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
