import { Module } from '@nestjs/common';

import { ServicesModule } from '../services.module';
import { GenerateCtePdfService } from './GenerateCtePdf';

@Module({
  providers: [GenerateCtePdfService],
  exports: [GenerateCtePdfService],
  imports: [ServicesModule],
})
export class GenerateCtePDFModule {}
