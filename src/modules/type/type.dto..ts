import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  describe: string;
}
