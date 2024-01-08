import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateItemInfoParams } from './itemInfo.type';
import { ItemInfo } from 'src/typeOrm/entities/ItemInfo';
import { Item } from 'src/typeOrm/entities/Item';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class ItemInfoService {
  constructor(
    @InjectRepository(ItemInfo)
    private itemInfoRepo: Repository<ItemInfo>,
  ) {}

  getItemInfos = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.itemInfoRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.itemInfoRepo.find();
  };

  getItemInfoById = async (id: number) => {
    const item = await this.itemInfoRepo.findOneBy({ id: id });

    if (!item) throw new HttpException('No item found', HttpStatus.NOT_FOUND);
    return item;
  };

  getItemInfoItem = async (item: Item) => {
    const items = await this.itemInfoRepo.find({
      where: { item: item },
      order: { productionDay: 'ASC' },
    });

    if (!items) throw new HttpException('No item found', HttpStatus.NOT_FOUND);
    return items;
  };

  createItemInfo = async (createItemInfoParams: CreateItemInfoParams) => {
    // const newLogin = this.typeRepo.create({
    // name: createItemInfoParams.name,
    // describe: createItemInfoParams.describe,
    // });

    // const saved = await this.typeRepo.save(newLogin);
    return createItemInfoParams;
  };

  saveService = async (items: ItemInfo | ItemInfo[]) => {
    if (Array.isArray(items)) return await this.itemInfoRepo.save(items);
    return await this.itemInfoRepo.save(items);
  };
}
