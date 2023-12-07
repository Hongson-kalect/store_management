import { Module } from '@nestjs/common';
import { LoginHistoryService } from './loginHistory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginHis } from 'src/typeOrm/entities/LoginHis';
import { LoginHistoryController } from './loginHistory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LoginHis])],
  controllers: [LoginHistoryController],
  providers: [LoginHistoryService],
  exports: [LoginHistoryService],
})
export class LoginHistoryModule {}
