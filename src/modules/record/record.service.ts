import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRecordParams } from './record.type';
import { Record } from 'src/typeOrm/entities/Record';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepo: Repository<Record>,
  ) {}

  getRecords = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.recordRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.recordRepo.find();
  };

  getRecordById = async (id: number) => {
    const building = await this.recordRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createRecord = async (createRecordParams: CreateRecordParams) => {
    // const newLogin = this.typeRepo.create({
    //   name: createRecordParams.name,
    //   describe: createRecordParams.describe,
    // });

    // const saved = await this.typeRepo.save(newLogin);
    return createRecordParams;
  };
}
