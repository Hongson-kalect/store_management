import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateCartDto {
  @IsString()
  name?: string;

  @IsString()
  describe?: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsBoolean()
  isConfirm: boolean;
  // user: User;
  item: number;
  // building: Building;
}
