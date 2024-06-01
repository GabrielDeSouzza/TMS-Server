import { Module } from '@nestjs/common';

import { CtePdfRepository } from 'domain/repositories/CtePdfRepository';

import { ctePdfUseCase } from 'app/useCases/CtePdf/CtePdfUseCase';

import { CtePdfPrismaService } from 'infra/database/prisma/services/CtePdf.service';
import { GenerateCTEPDFModule } from 'infra/services/generatePdf/CreatePDF/CreateCtePdf.module';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientCteModule } from '../LegalClientCteGraphql/LegalClientCte.module';
import { PhysicalCustomerCteModule } from '../PhysicalCustomerCteGraphql/PhysicalCustomerCte.module';
import { CtePdfResolver } from './CtePdf.resolver';

@Module({
  imports: [
    GenerateCTEPDFModule,
    GraphqlCenterModule,
    LegalClientCteModule,
    PhysicalCustomerCteModule,
  ],
  providers: [
    { provide: CtePdfRepository, useClass: CtePdfPrismaService },
    ctePdfUseCase,
    CtePdfResolver,
  ],
  exports: [ctePdfUseCase],
})
export class CtePdfModule {}
