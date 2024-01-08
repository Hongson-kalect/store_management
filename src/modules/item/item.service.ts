import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateItemParams } from './item.type';
import { Item } from 'src/typeOrm/entities/Item';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
  ) {}

  getItems = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.itemRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.itemRepo.find();
  };

  getItemById = async (id: number) => {
    const building = await this.itemRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createItem = async (createItemParams: CreateItemParams) => {
    const newLogin = this.itemRepo.create({
      name: createItemParams.name,
      describe: createItemParams.describe,
    });

    const saved = await this.itemRepo.save(newLogin);
    return saved.id;
  };
}
