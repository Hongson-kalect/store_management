import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  describe: string;
}
