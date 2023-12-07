import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemPriceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  describe: string;
}
