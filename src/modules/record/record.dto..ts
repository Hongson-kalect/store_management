import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  describe: string;
}
