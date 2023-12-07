import { Module } from '@nestjs/common';
import { TransactionRecordService } from './transactionRecord.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRecordController } from './transactionRecord.controller';
import { TransactionRecord } from 'src/typeOrm/entities/TransactionRecord';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionRecord])],
  controllers: [TransactionRecordController],
  providers: [TransactionRecordService],
  exports: [TransactionRecordService],
})
export class TransactionRecordModule {}
