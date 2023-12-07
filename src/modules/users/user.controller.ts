import {
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Param,
  Body,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { UserSevices } from './user.service';
import { ResponseMessage, ResponseStatus } from 'src/interfaces/global.type';
import { CreateUserDto } from '../../typedto/userDto';
import { DeleteUserDto } from './user.dto';
import { Public } from '../utils/guard/guard.jwt.metadata';

@Controller('user')
export class UserController {
  constructor(private userServices: UserSevices) {}

  @Public()
  @Get()
  async getUser() {
    try {
      return {
        data: await this.userServices.getUsers(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      console.log(id);
      return {
        data: await this.userServices.getUserById(id),
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
  @Delete(':id')
  async deleteUser(@Param(':id', ParseIntPipe) deleteUserDto: DeleteUserDto) {
    try {
      return {
        data: await this.userServices.deleteUser(deleteUserDto),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }
}
