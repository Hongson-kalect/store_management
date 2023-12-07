import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTimeKeepingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  describe: string;
}
