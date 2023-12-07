import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Confirm } from 'src/typeOrm/entities/Confirm';
import { ConfirmService } from './confirm.service';
import { ConfirmController } from './confirm.controller';
import { User } from 'src/typeOrm/entities/User';
import { Device } from 'src/typeOrm/entities/Device';

@Module({
  imports: [TypeOrmModule.forFeature([Confirm, User, Device])],
  providers: [ConfirmService],
  controllers: [ConfirmController],
  exports: [ConfirmService],
})
export class ConfirmModule {}
