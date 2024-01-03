import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class DeleteDeviceDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
