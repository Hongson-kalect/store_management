import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/typeOrm/entities/User';
import { CreateUserParams } from 'src/interfaces/user.type';
import { DeleteUserParams, SigninParams } from './user.type';

@Injectable()
export class UserSevices {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  getUsers = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.userRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
        relations: {
          profile: true,
        },
      });
    }

    const data = await this.userRepo.find();
    console.log(data);
    return data;
  };

  getUserById = async (id: number) => {
    const building = await this.userRepo.findOne({
      where: { id: id },
      relations: {
        carts: true,
        loginHis: true,
        profile: true,
        records: true,
        roles: true,
        devices: true,
        transactions: true,
        requestHis: true,
      },
    });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      relations: ['profile'],
      where: {
        email: email,
      },
    });

    if (!user) return false;
    return user;
  }

  async findUser(signInParams: SigninParams) {
    const user = await this.userRepo.findOne({
      where: {
        username: signInParams.username,
        password: signInParams.password,
      },
    });

    return user;
  }

  async createUser(user: CreateUserParams) {
    console.log(user);

    return user;
  }

  async deleteUser(deleteUserParams: DeleteUserParams) {
    const user = await this.userRepo.findOneBy({
      id: deleteUserParams?.id,
    });

    if (!user) throw new HttpException('No user found', HttpStatus.NOT_FOUND);

    this.userRepo.softRemove(user);
    return 'Delete success';
  }
}
