import { Module } from '@nestjs/common';
import { RoomPriceService } from './roomPrice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomPriceController } from './roomPrice.controller';
import { RoomPrice } from 'src/typeOrm/entities/RoomPrice';

@Module({
  imports: [TypeOrmModule.forFeature([RoomPrice])],
  controllers: [RoomPriceController],
  providers: [RoomPriceService],
  exports: [RoomPriceService],
})
export class RoomPriceModule {}
