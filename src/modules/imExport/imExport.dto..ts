import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateImExportDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  time: number;

  @IsArray()
  @IsNotEmpty()
  quantitys: number[];

  @IsArray()
  @IsNotEmpty()
  costs: number[];

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsBoolean()
  @IsNotEmpty()
  isSuccess: boolean;

  @IsString()
  describe?: string;

  @IsNumber()
  @IsNotEmpty()
  providerId: number;

  @IsNotEmpty()
  @IsArray()
  items: (string | number)[];

  @IsNumber()
  @IsNotEmpty()
  buildingId: number;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
