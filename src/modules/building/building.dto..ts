import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetBuildingDto {
  id?: number[];
  search?: string;
  sort?: string;
}

export class CreateBuildingDto {
  @ApiProperty({
    example: 'hong son',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'title of building',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'best of the wolrd :V',
  })
  @IsString()
  describe: string;

  @ApiProperty({
    example: 'Vĩnh Phúc',
    required: true,
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'example@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '035xxx0235',
    required: true,
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: ['8:00-12:00', '8:00-12:00', '8:00-12:00', '8:00-12:00'],
    required: true,
  })
  @IsArray()
  openTime: string[]; //JSON of array to have different time depend on day [8:00-12:00,8:00-12:00,8:00-12:00,8:00-12:00,...] for open on all day of week, [8:00-12:00, 10:00-12:00, ..., close] for close on weekend

  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsArray()
  bussinessTypes: number[];
}
