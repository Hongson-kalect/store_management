import { Module } from '@nestjs/common';
import { UserModules } from '../../users/user.module';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeOrm/entities/User';
import { Device } from 'src/typeOrm/entities/Device';
import { Confirm } from 'src/typeOrm/entities/Confirm';
import { AppJwtModule } from '../jwt/jwt.module';
import { HistoryRequestModule } from '../../historyRequest/historyRequest.module';
import { GuardJwt } from './guard.jwt';
// import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UserModules,
    AppJwtModule,
    HistoryRequestModule,
    TypeOrmModule.forFeature([User, Device, Confirm]),
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 10,
    //     limit:5
    //   }
    // ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GuardJwt,
    },
  ],
})
export class GuardJwtModule {}
