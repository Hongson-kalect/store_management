import { Module, forwardRef } from '@nestjs/common';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodController } from './food.controller';
import { Food } from 'src/typeOrm/entities/Food';
import { BuildingModule } from '../building/building.module';
import { TypeModule } from '../type/type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food]),
    forwardRef(() => BuildingModule),
    TypeModule,
  ],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService],
})
export class FoodModule {}
