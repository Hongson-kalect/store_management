import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
  @ApiProperty({
    required: true,
    example: 'type A',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 'Decribe of type A',
  })
  @IsNotEmpty()
  @IsString()
  describe: string;

  @ApiProperty({
    required: true,
    example: 'food',
  })
  @IsString()
  @IsNotEmpty()
  category: 'building' | 'food' | 'item';
}
