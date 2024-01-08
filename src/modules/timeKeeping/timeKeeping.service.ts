import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTimeKeepingParams } from './timeKeeping.type';
import { TimeKeeping } from 'src/typeOrm/entities/TimeKeeping';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class TimeKeepingService {
  constructor(
    @InjectRepository(TimeKeeping)
    private timeKeepingRepo: Repository<TimeKeeping>,
  ) {}

  getTimeKeepings = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.timeKeepingRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.timeKeepingRepo.find();
  };

  getTimeKeepingById = async (id: number) => {
    const building = await this.timeKeepingRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createTimeKeeping = async (
    createTimeKeepingParams: CreateTimeKeepingParams,
  ) => {
    // const newLogin = this.typeRepo.create({
    //   name: createTimeKeepingParams.name,
    //   describe: createTimeKeepingParams.describe,
    // });

    // const saved = await this.typeRepo.save(newLogin);
    return createTimeKeepingParams;
  };
}
