import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  buildingId: number;
}
