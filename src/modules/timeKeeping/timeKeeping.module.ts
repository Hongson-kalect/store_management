import { Module } from '@nestjs/common';
import { TimeKeepingService } from './timeKeeping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeKeepingController } from './timeKeeping.controller';
import { TimeKeeping } from 'src/typeOrm/entities/TimeKeeping';

@Module({
  imports: [TypeOrmModule.forFeature([TimeKeeping])],
  controllers: [TimeKeepingController],
  providers: [TimeKeepingService],
  exports: [TimeKeepingService],
})
export class TimeKeepingModule {}
