import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetBuildingDto {
  id?: number[];
  search?: string;
  sort?: string;
}

export class CreateBuildingDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  title: string;

  @IsString()
  describe: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  openTime: string[]; //JSON of array to have different time depend on day [8:00-12:00,8:00-12:00,8:00-12:00,8:00-12:00,...] for open on all day of week, [8:00-12:00, 10:00-12:00, ..., close] for close on weekend

  @IsArray()
  bussinessTypes: number[];
}
