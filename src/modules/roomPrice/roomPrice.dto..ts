import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomPriceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  describe: string;
}
