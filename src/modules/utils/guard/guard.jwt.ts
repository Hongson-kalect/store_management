import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppJwtService } from '../jwt/jwt.service';

import { UserSevices } from '../../users/user.service';
import { IS_PUBLIC_KEY } from './guard.jwt.metadata';

@Injectable()
export class GuardJwt implements CanActivate {
  constructor(
    private appJwtService: AppJwtService,
    private userServices: UserSevices,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.appJwtService.verifyToken(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      const user = await this.userServices.getUserById(payload.id);
      if (!user)
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = user;
      request['userId'] = payload.id;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
