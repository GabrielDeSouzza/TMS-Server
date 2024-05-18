import { Module } from '@nestjs/common';

import { CepSearchProvider } from 'domain/providers/CepSearchProvider';

import { ServicesModule } from '../services.module';
import { ViaCepService } from '../viaCep/provider/ViaCepService';
import { GenerateCtePdfService } from './GenerateCtePdf';

@Module({
  providers: [
    GenerateCtePdfService,
    { provide: CepSearchProvider, useClass: ViaCepService },
  ],
  exports: [GenerateCtePdfService],
  imports: [ServicesModule],
})
export class GenerateCtePDFModule {}
