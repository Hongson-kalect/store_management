import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTransactionRecordParams } from './transactionRecord.type';
import { TransactionRecord } from 'src/typeOrm/entities/TransactionRecord';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class TransactionRecordService {
  constructor(
    @InjectRepository(TransactionRecord)
    private transactionRecordRepo: Repository<TransactionRecord>,
  ) {}

  getTransactionRecords = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams.id?.length > 0) {
      return await this.transactionRecordRepo.find({
        where: {
          id: In(getCartParams.id),
        },
      });
    }

    return await this.transactionRecordRepo.find();
  };

  getTransactionRecordById = async (id: number) => {
    const building = await this.transactionRecordRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createTransactionRecord = async (
    createTransactionRecordParams: CreateTransactionRecordParams,
  ) => {
    // const newLogin = this.typeRepo.create({
    //   name: createTransactionRecordParams.name,
    //   describe: createTransactionRecordParams.describe,
    // });

    // const saved = await this.typeRepo.save(newLogin);
    return createTransactionRecordParams;
  };
}
