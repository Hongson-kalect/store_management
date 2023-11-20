import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserSevices } from './user.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';
import { CreateUserDto } from '../../typedto/userDto';

@Controller('user')
export class UserController {
  constructor(private userServices: UserSevices) {}

  @Get()
  async getUser() {
    try {
      return {
        data: await this.userServices.getUser(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      console.log(id);
      return {
        data: await this.userServices.getUserByid(id),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    try {
      console.log(user);
      return {
        data: await this.userServices.createUser(user),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }
}
