import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateItemPriceParams } from './itemPrice.type';
import { ItemPrice } from 'src/typeOrm/entities/ItemPrice';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class ItemPriceService {
  constructor(
    @InjectRepository(ItemPrice)
    private itemPriceRepo: Repository<ItemPrice>,
  ) {}

  getItemPrices = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.itemPriceRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.itemPriceRepo.find();
  };

  getItemPriceById = async (id: number) => {
    const building = await this.itemPriceRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createItemPrice = async (createItemPriceParams: CreateItemPriceParams) => {
    // const newLogin = this.typeRepo.create({
    //   name: createItemPriceParams.name,
    //   describe: createItemPriceParams.describe,
    // });

    // const saved = await this.typeRepo.save(newLogin);
    return createItemPriceParams;
  };
}
