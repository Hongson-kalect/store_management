import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserSevices } from './user.service';
import { User } from 'src/typeOrm/entities/User';
import { UserInfo } from 'src/typeOrm/entities/UserInfo';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo])],
  controllers: [UserController],
  providers: [UserSevices],
  exports: [UserSevices],
})
export class UserModules {}
