import { Module } from '@nestjs/common';
import { TransactionInfoService } from './transactionInfo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionInfoController } from './transactionInfo.controller';
import { TransactionInfo } from 'src/typeOrm/entities/TransactionInfo';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionInfo])],
  controllers: [TransactionInfoController],
  providers: [TransactionInfoService],
  exports: [TransactionInfoService],
})
export class TransactionInfoModule {}
