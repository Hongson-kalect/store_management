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
    let foods: Food[];
    if (getCartParams?.id?.length > 0) {
      foods = await this.foodRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    foods = await this.foodRepo.find();
    foods.forEach((food) => {
      food.image = JSON.parse(food.image);
      food.tag = JSON.parse(food.tag);
    });
    return foods;
  };

  getFoodById = async (id: number) => {
    const food = await this.foodRepo.findOneBy({ id: id });
    food.image = JSON.parse(food.image);
    food.tag = JSON.parse(food.tag);

    if (!food) throw new HttpException('No food found', HttpStatus.NOT_FOUND);
    return food;
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
    if (!food) throw new HttpException('No Food Found', HttpStatus.NOT_FOUND);
    await this.foodRepo.remove(food);
  };
}
