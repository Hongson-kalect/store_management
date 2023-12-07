import { Module } from '@nestjs/common';
import { ItemInfoService } from './itemInfo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemInfoController } from './itemInfo.controller';
import { ItemInfo } from 'src/typeOrm/entities/ItemInfo';

@Module({
  imports: [TypeOrmModule.forFeature([ItemInfo])],
  controllers: [ItemInfoController],
  providers: [ItemInfoService],
  exports: [ItemInfoService],
})
export class ItemInfoModule {}
