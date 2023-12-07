import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModules } from '../users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeOrm/entities/User';
import { Device } from 'src/typeOrm/entities/Device';
import { Confirm } from 'src/typeOrm/entities/Confirm';

import { AppJwtModule } from '../utils/jwt/jwt.module';
import { MailModule } from '../utils/mail/mail.module';
import { HistoryRequestModule } from '../historyRequest/historyRequest.module';
import { LoginHistoryModule } from '../LoginHistory/loginHistory.module';
// import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    AppJwtModule,
    MailModule,
    UserModules,
    HistoryRequestModule,
    LoginHistoryModule,
    TypeOrmModule.forFeature([User, Device, Confirm]),
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 10,
    //     limit:5
    //   }
    // ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
