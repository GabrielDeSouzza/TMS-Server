import { Module } from '@nestjs/common';

import { CtePdfRepository } from 'domain/repositories/CtePdfRepository';

import { ctePdfUseCase } from 'app/useCases/CtePdf/CtePdfUseCase';

import { CtePdfPrismaService } from 'infra/database/prisma/services/CtePdf.service';
import { GenerateCtePDFModule } from 'infra/services/generatePdf/GeneratePdfCteModule';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientCteModule } from '../LegalClientCteGraphql/LegalClientCte.module';
import { PhysicalCustomerCteModule } from '../PhysicalCustomerCteGraphql/PhysicalCustomerCte.module';
import { CtePdfResolver } from './CtePdf.resolver';

@Module({
  providers: [
    { provide: CtePdfRepository, useClass: CtePdfPrismaService },
    ctePdfUseCase,
    CtePdfResolver,
  ],
  imports: [
    GraphqlCenterModule,
    GenerateCtePDFModule,
    LegalClientCteModule,
    PhysicalCustomerCteModule,
  ],
  exports: [ctePdfUseCase],
})
export class CtePdfModule {}
