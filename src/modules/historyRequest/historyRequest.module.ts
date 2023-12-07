import { Module } from '@nestjs/common';
import { HistoryRequestController } from './historyRequest.controller';
import { HistoryRequestService } from './historyRequest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestHis } from 'src/typeOrm/entities/RequestHis';

@Module({
  imports: [TypeOrmModule.forFeature([RequestHis])],
  controllers: [HistoryRequestController],
  providers: [HistoryRequestService],
  exports: [HistoryRequestService],
})
export class HistoryRequestModule {}
