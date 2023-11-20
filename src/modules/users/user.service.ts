import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeOrm/entities/User';
import { CreateUserParams } from 'src/interfaces/user.type';
import { SigninParams } from 'src/interfaces/auth.type';

@Injectable()
export class UserSevices {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser() {
    const user = await this.userRepository.find({
      relations: ['profile', 'record'],
    });
    return user;
  }

  async getUserByid(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['profile', 'record'],
      where: {
        id: id,
      },
    });

    if (!user) throw new HttpException('', 400);
    return user;
  }

  async findUser(signInParams: SigninParams) {
    const user = await this.userRepository.findOne({
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
}
