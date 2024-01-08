import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTransactionInfoParams } from './transactionInfo.type';
import { TransactionInfo } from 'src/typeOrm/entities/TransactionInfo';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class TransactionInfoService {
  constructor(
    @InjectRepository(TransactionInfo)
    private transactionInfoRepo: Repository<TransactionInfo>,
  ) {}

  getTransactionInfos = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.transactionInfoRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.transactionInfoRepo.find();
  };

  getTransactionInfoById = async (id: number) => {
    const building = await this.transactionInfoRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createTransactionInfo = async (
    createTransactionInfoParams: CreateTransactionInfoParams,
  ) => {
    // const newLogin = this.typeRepo.create({
    //   name: createTransactionInfoParams.name,
    //   describe: createTransactionInfoParams.describe,
    // });

    // const saved = await this.typeRepo.save(newLogin);
    return createTransactionInfoParams;
  };
}
