import { Module } from '@nestjs/common';
import { HistoryRequestModule } from 'src/modules/historyRequest/historyRequest.module';

@Module({
  imports: [HistoryRequestModule],
  //   providers: [InterCeptor],
})
export class InterCeptorModule {}
