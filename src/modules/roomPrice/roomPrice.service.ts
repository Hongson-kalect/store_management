import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoomPriceParams } from './roomPrice.type';
import { RoomPrice } from 'src/typeOrm/entities/RoomPrice';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class RoomPriceService {
  constructor(
    @InjectRepository(RoomPrice)
    private roomPriceRepo: Repository<RoomPrice>,
  ) {}

  getRoomPrices = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams.id?.length > 0) {
      return await this.roomPriceRepo.find({
        where: {
          id: In(getCartParams.id),
        },
      });
    }

    return await this.roomPriceRepo.find();
  };

  getRoomPriceById = async (id: number) => {
    const building = await this.roomPriceRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createRoomPrice = async (createRoomPriceParams: CreateRoomPriceParams) => {
    // const newLogin = this.typeRepo.create({
    //   name: createRoomPriceParams.name,
    //   describe: createRoomPriceParams.describe,
    // });

    // const saved = await this.typeRepo.save(newLogin);
    return createRoomPriceParams;
  };
}
