import { Module } from '@nestjs/common';
import { ImExportService } from './imExport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImExportController } from './imExport.controller';
import { ImExport } from 'src/typeOrm/entities/ImExport';

@Module({
  imports: [TypeOrmModule.forFeature([ImExport])],
  controllers: [ImExportController],
  providers: [ImExportService],
  exports: [ImExportService],
})
export class ImExportModule {}
