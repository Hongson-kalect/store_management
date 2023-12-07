import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  rollNo: string;

  @IsString()
  describe: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  image: string[];
  discount: string;

  @IsArray()
  tag: string[];

  @IsNumber()
  quantity: number;

  buildingId: number;

  @IsNotEmpty()
  @IsArray()
  foodTypes: number[];
}
