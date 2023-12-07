import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from '../utils/guard/guard.jwt.metadata';
import { CartService } from './cart.service';
import {
  CustomRequest,
  ResponseMessage,
  ResponseStatus,
} from 'src/interfaces/global.type';
import { CreateCartDto } from './cart.dto.';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Public()
  @Get()
  async getCart() {
    try {
      return {
        data: await this.cartService.getCart(),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Get(':id')
  async getCartById(@Param(':id', ParseIntPipe) id: number) {
    try {
      return {
        data: await this.cartService.getCartById(id),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async createCart(
    @Body() addCartDto: CreateCartDto,
    @Request() { user }: CustomRequest,
  ) {
    try {
      return {
        data: await this.cartService.createCart({ user, ...addCartDto }),
        status: ResponseStatus.SUCCESS,
        message: ResponseMessage.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(ResponseMessage.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
