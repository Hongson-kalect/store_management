import { Module, forwardRef } from '@nestjs/common';
import { FeeService } from './fee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeController } from './fee.controller';
import { Fee } from 'src/typeOrm/entities/Fee';
import { BuildingModule } from '../building/building.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fee]), forwardRef(() => BuildingModule)],
  controllers: [FeeController],
  providers: [FeeService],
  exports: [FeeService],
})
export class FeeModule {}
