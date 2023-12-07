import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionRecordDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  describe: string;
}
