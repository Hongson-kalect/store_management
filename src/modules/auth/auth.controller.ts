import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './guard.metadata';
import { SigninDto } from 'src/typedto/auth.dto';
import {
  ResponseData,
  ResponseMessage,
  ResponseStatus,
} from 'src/interfaces/global.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SigninDto) {
    return new ResponseData(
      await this.authService.signIn(signInDto),
      ResponseStatus.SUCCESS,
      ResponseMessage.SUCCESS,
    );
  }

  @Get('test')
  protectedRoute(@Request() req) {
    console.log(req.user);
    return 'hello world';
  }

  @Public()
  @Get('pl')
  publicRoute() {
    console.log('public');
    return 'public ROute';
  }
}
