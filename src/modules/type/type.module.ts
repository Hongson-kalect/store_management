import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeController } from './type.controller';
import { Type } from 'src/typeOrm/entities/Type';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [TypeService],
})
export class TypeModule {}
