import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleParams } from './role.type';
import { Role } from 'src/typeOrm/entities/Role';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  getRoles = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.roleRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.roleRepo.find();
  };

  getRoleById = async (id: number) => {
    const building = await this.roleRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createRole = async (createRoleParams: CreateRoleParams) => {
    // const newLogin = this.typeRepo.create({
    //   name: createRoleParams.name,
    //   describe: createRoleParams.describe,
    // });

    // const saved = await this.typeRepo.save(newLogin);
    return createRoleParams;
  };
}
