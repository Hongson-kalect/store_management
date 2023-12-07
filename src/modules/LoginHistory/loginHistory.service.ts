import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateLoginHistoryParams } from './loginHistory.type';
import { LoginHis } from 'src/typeOrm/entities/LoginHis';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class LoginHistoryService {
  constructor(
    @InjectRepository(LoginHis)
    private loginHistoryRepo: Repository<LoginHis>,
  ) {}

  getLoginHistorys = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams.id?.length > 0) {
      return await this.loginHistoryRepo.find({
        where: {
          id: In(getCartParams.id),
        },
      });
    }

    return await this.loginHistoryRepo.find();
  };

  getLoginHistoryById = async (id: number) => {
    const building = await this.loginHistoryRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createLoginHistory = async (
    createLoginHistoryParams: CreateLoginHistoryParams,
  ) => {
    const newLogin = this.loginHistoryRepo.create({
      user: createLoginHistoryParams.user,
      device: createLoginHistoryParams.device,
      ipAddress: createLoginHistoryParams.ipAddress,
      token: createLoginHistoryParams.token,
    });

    const saved = await this.loginHistoryRepo.save(newLogin);
    return saved.id;
  };
}
