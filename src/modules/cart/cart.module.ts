import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { Cart } from 'src/typeOrm/entities/Cart';
import { BuildingModule } from '../building/building.module';
import { ItemInfoModule } from '../itemInfo/itemInfo.module';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [
    ItemModule,
    ItemInfoModule,
    forwardRef(() => BuildingModule),
    TypeOrmModule.forFeature([Cart]),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
