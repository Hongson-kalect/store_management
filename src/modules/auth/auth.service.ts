import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSevices } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { SigninParams } from 'src/interfaces/auth.type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeOrm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserSevices,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signIn(signinParams: SigninParams): Promise<any> {
    const user = await this.usersService.findUser(signinParams);

    if (!user) throw new NotFoundException();
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, created_at, refreshToken, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object

    user.refreshToken = await this.jwtService.signAsync(result, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });
    this.userRepository.save(user);

    return {
      access_token: await this.jwtService.signAsync(result, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '1h',
      }),
    };
  }
}
