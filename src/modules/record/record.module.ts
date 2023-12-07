import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordController } from './record.controller';
import { Record } from 'src/typeOrm/entities/Record';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService],
})
export class RecordModule {}
