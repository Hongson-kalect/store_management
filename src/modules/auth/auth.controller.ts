import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseData, ResponseMessage } from 'src/interfaces/global.type';
import { SigninDto, SignupDto } from './auth.type';
import { Public } from '../utils/guard/guard.jwt.metadata';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SigninDto) {
    return new ResponseData(
      await this.authService.signIn(signInDto),
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
    );
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignupDto) {
    return new ResponseData(
      await this.authService.signUp(signUpDto),
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
    );
  }
}
