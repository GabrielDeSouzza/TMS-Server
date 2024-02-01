import { Module } from '@nestjs/common';

import { InvoiceForLegalClientRepository } from 'domain/repositories/InvoiceForLegalClient.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';

import { InvoiceForLegalClientUseCases } from 'app/useCases/InvoiceForLegalClient/InvoiceForLegalClientUseCases';
import { LegalClientOrderUseCases } from 'app/useCases/LegalClientOrderUseCases/LegalClientUseCases';

import { InvoiceForLegalClientPrismaService } from 'infra/database/prisma/services/InvoiceForLegalClient.service';
import { LegalClientOrderPrismaService } from 'infra/database/prisma/services/LegalClientOrder.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { InvoiceForLegalClientResolver } from './InvoiceForLegalClient.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: InvoiceForLegalClientRepository,
      useClass: InvoiceForLegalClientPrismaService,
    },
    {
      provide: LegalClientOrderRepository,
      useClass: LegalClientOrderPrismaService,
    },
    InvoiceForLegalClientResolver,
    InvoiceForLegalClientUseCases,
    LegalClientOrderUseCases,
  ],
  exports: [LegalClientOrderUseCases],
})
export class InvoiceForLegalClientModule {}
