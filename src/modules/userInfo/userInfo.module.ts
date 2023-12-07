import { Module } from '@nestjs/common';
import { UserInfoService } from './userInfo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoController } from './userInfo.controller';
import { UserInfo } from 'src/typeOrm/entities/UserInfo';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserInfoController],
  providers: [UserInfoService],
  exports: [UserInfoService],
})
export class UserInfoModule {}
