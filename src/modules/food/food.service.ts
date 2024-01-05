import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateFoodParams } from './food.type';
import { Food } from 'src/typeOrm/entities/Food';
import { BuildingService } from '../building/building.service';
import { TypeService } from '../type/type.service';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class FoodService {
  constructor(
    private buildingService: BuildingService,
    private typeService: TypeService,
    @InjectRepository(Food)
    private foodRepo: Repository<Food>,
  ) {}

  getFoods = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams.id?.length > 0) {
      return await this.foodRepo.find({
        where: {
          id: In(getCartParams.id),
        },
      });
    }

    return await this.foodRepo.find();
  };

  getFoodById = async (id: number) => {
    const building = await this.foodRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createFood = async (createFoodParams: CreateFoodParams) => {
    // *** get building by id
    const building = await this.buildingService.getBuildingById(
      createFoodParams.buildingId,
    );
    const foodType = await this.typeService.getTypes({
      id: createFoodParams.foodTypeId,
    });

    const newFood = this.foodRepo.create({
      name: createFoodParams.name,
      describe: createFoodParams.describe,
      building: building,
      discount: createFoodParams.discount,
      foodTypes: foodType,
      image: JSON.stringify(createFoodParams.image),
      quantity: createFoodParams.quantity,
      price: createFoodParams.price,
      rollNo: createFoodParams.rollNo,
      tag: JSON.stringify(createFoodParams.tag),
    });

    const saved = await this.foodRepo.save(newFood);
    return saved.id;
  };

  deleteFood = async (id: number) => {
    const food = await this.foodRepo.findOneBy({ id });
    if (!food) throw new HttpException('No Food Founf', HttpStatus.NOT_FOUND);
    await this.foodRepo.remove(food);
  };
}
