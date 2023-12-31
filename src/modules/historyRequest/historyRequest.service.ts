import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestHis } from 'src/typeOrm/entities/RequestHis';
import { In, Repository } from 'typeorm';
import { CreateHistoryParams } from './historyRequest.type';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class HistoryRequestService {
  constructor(
    @InjectRepository(RequestHis)
    private historyRequestRepo: Repository<RequestHis>,
  ) {}

  getHistoryRequests = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.historyRequestRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.historyRequestRepo.find();
  };

  getHistoryRequestById = async (id: number) => {
    const building = await this.historyRequestRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createHistoryRequest = async (createHistoryParams: CreateHistoryParams) => {
    console.log(1);
    const newRequest = this.historyRequestRepo.create({
      user: createHistoryParams.user,
      url: createHistoryParams.url,
      params: createHistoryParams.params,
    });
    console.log(newRequest);

    const saved = await this.historyRequestRepo.save(newRequest);
    return saved.id;
  };

  requestSuccess = async (id: number) => {
    await this.historyRequestRepo.save({ id: id, isSucess: true });
  };

  deleteHistoryRequest = async (id: number) => {
    const request = await this.historyRequestRepo.findOneBy({ id: id });
    if (!request)
      throw new HttpException('No History Request Found', HttpStatus.NOT_FOUND);
  };
}
