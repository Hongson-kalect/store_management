import { Module } from '@nestjs/common';
import { ItemPriceService } from './itemPrice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPriceController } from './itemPrice.controller';
import { ItemPrice } from 'src/typeOrm/entities/ItemPrice';

@Module({
  imports: [TypeOrmModule.forFeature([ItemPrice])],
  controllers: [ItemPriceController],
  providers: [ItemPriceService],
  exports: [ItemPriceService],
})
export class ItemPriceModule {}
