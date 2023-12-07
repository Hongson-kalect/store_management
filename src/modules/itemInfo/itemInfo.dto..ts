import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  describe: string;
}
