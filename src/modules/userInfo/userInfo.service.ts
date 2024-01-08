import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserInfoParams } from './userInfo.type';
import { UserInfo } from 'src/typeOrm/entities/UserInfo';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private typeRepo: Repository<UserInfo>,
  ) {}

  getUserInfo = async (getUserInfoParams?: { id?: number | number[] }) => {
    if (typeof getUserInfoParams?.id === 'number') {
      return await this.typeRepo.findOneBy({ id: getUserInfoParams?.id });
    }

    if (getUserInfoParams?.id?.length > 0) {
      return await this.typeRepo.find({
        where: {
          id: In(getUserInfoParams?.id),
        },
      });
    }

    return await this.typeRepo.find();
  };

  createUserInfo = async (createUserInfoParams: CreateUserInfoParams) => {
    // const newLogin = this.typeRepo.create({
    //   name: createUserInfoParams.name,
    //   describe: createUserInfoParams.describe,
    // });

    // const saved = await this.typeRepo.save(newLogin);
    return createUserInfoParams;
  };
}
