import { Module } from '@nestjs/common';

import { CepSearchProvider } from 'domain/providers/CepSearchProvider';

import { ServicesModule } from '../services.module';
import { ViaCepService } from '../viaCep/provider/ViaCepService';
import { GeneratePdfService } from './GeneratePdf';

@Module({
  imports: [ServicesModule],
  providers: [
    GeneratePdfService,
    { provide: CepSearchProvider, useClass: ViaCepService },
  ],
  exports: [GeneratePdfService],
})
export class GeneratePDFModule {}
