import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { Building } from 'src/typeOrm/entities/Building';
import { TypeModule } from '../type/type.module';
import { FeeModule } from '../fee/fee.module';

@Module({
  imports: [
    TypeModule,
    forwardRef(() => FeeModule),
    TypeOrmModule.forFeature([Building]),
  ],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}
