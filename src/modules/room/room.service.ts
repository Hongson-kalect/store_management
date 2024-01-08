import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoomParams } from './room.type';
import { Room } from 'src/typeOrm/entities/Room';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
  ) {}

  getRooms = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.roomRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.roomRepo.find();
  };

  getRoomById = async (id: number) => {
    const building = await this.roomRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createRoom = async (createRoomParams: CreateRoomParams) => {
    // const newLogin = this.typeRepo.create({
    //   name: createRoomParams.name,
    //   describe: createRoomParams.describe,
    // });

    // const saved = await this.typeRepo.save(newLogin);
    return createRoomParams;
  };
}
