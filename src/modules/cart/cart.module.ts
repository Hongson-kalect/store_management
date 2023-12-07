import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { Cart } from 'src/typeOrm/entities/Cart';
import { ItemInfo } from 'src/typeOrm/entities/ItemInfo';
import { Item } from 'src/typeOrm/entities/Item';
import { BuildingModule } from '../building/building.module';

@Module({
  imports: [
    Item,
    ItemInfo,
    forwardRef(() => BuildingModule),
    TypeOrmModule.forFeature([Cart]),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
