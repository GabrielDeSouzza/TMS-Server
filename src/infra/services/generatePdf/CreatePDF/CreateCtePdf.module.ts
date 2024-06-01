import { Module } from '@nestjs/common';

import { ServicesModule } from 'infra/services/services.module';

import { GeneratePDFModule } from '../GeneratePdf.module';
import { GenerateCtePDF } from './CreateCtePdf';

@Module({
  providers: [GenerateCtePDF],
  imports: [GeneratePDFModule, ServicesModule],
  exports: [GenerateCtePDF],
})
export class GenerateCTEPDFModule {}
