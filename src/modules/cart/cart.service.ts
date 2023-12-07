import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCartParams } from './cart.type';
import { Cart } from 'src/typeOrm/entities/Cart';
import { ItemInfoService } from '../itemInfo/itemInfo.service';
import { ItemService } from '../item/item.service';
import { BuildingService } from '../building/building.service';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class CartService {
  constructor(
    private itemInfoService: ItemInfoService,
    private itemService: ItemService,
    private buildingService: BuildingService,
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
  ) {}

  getCart = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams.id?.length > 0) {
      return await this.cartRepo.find({
        where: {
          id: In(getCartParams.id),
        },
      });
    }

    return await this.cartRepo.find();
  };

  getCartById = async (id: number) => {
    const building = await this.cartRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createCart = async (createCartParams: CreateCartParams) => {
    const item = await this.itemService.getItemById(createCartParams.item);
    const itemInfos = await this.itemInfoService.getItemInfoItem(item);

    const sum = itemInfos.reduce(
      (partialSum, itemInfo) => partialSum + itemInfo.remain,
      0,
    );

    if (createCartParams.quantity > sum)
      throw new HttpException(
        'Quantity order is bigger than remain item',
        HttpStatus.BAD_REQUEST,
      );

    let quantity = createCartParams.quantity;
    const itemInfosChange = [];
    const newCarts = [];
    itemInfos.forEach(async (itemInfo) => {
      if (quantity <= itemInfo.remain) {
        itemInfo.remain = itemInfo.remain - quantity;
        const newCart = this.cartRepo.create({
          quantity: quantity,
          itemInfo: itemInfo,
          isConfirm: false,
          state: 'added',
          building: item.building,
          user: createCartParams.user,
        });

        await this.itemInfoService.saveService(itemInfo);

        return await this.cartRepo.save(newCart);
      } else {
        itemInfo.remain = 0;
        quantity = quantity - itemInfo.remain;

        itemInfosChange.push(itemInfo);
        newCarts.push(
          this.cartRepo.create({
            quantity: quantity,
            itemInfo: itemInfo,
            isConfirm: false,
            state: 'added',
            building: item.building,
            user: createCartParams.user,
          }),
        );
      }

      await this.itemInfoService.saveService(itemInfosChange);
      return await this.cartRepo.save(newCarts);
    });
  };

  saveService = async (items: Cart | Cart[]) => {
    if (Array.isArray(items)) return await this.cartRepo.save(items);
    return await this.cartRepo.save(items);
  };
}
