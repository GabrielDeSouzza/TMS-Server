import { Module } from '@nestjs/common';

import { InvoiceForLegalClientRepository } from 'domain/repositories/InvoiceForLegalClient.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';

import { LegalClientOrderUseCases } from 'app/useCases/LegalClientOrderUseCases/LegalClientUseCases';

import { InvoiceForLegalClientPrismaService } from 'infra/database/prisma/services/InvoiceForLegalClient.service';
import { LegalClientOrderPrismaService } from 'infra/database/prisma/services/LegalClientOrder.service';
import { LegalContractPrismaService } from 'infra/database/prisma/services/LegalContract.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientMerchandiseModule } from '../LegalClientMerchandiseGraphql/LegalClientMerchandise.module';
import { LegalContractModule } from '../LegalContractGraphql/LegalContract.module';
import { LegalClientOrderResolver } from './LegalClientOrder.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    LegalClientMerchandiseModule,
    LegalContractModule,
  ],
  providers: [
    {
      provide: LegalClientOrderRepository,
      useClass: LegalClientOrderPrismaService,
    },
    { provide: LegalContractRepository, useClass: LegalContractPrismaService },
    {
      provide: InvoiceForLegalClientRepository,
      useClass: InvoiceForLegalClientPrismaService,
    },
    LegalClientOrderResolver,
    LegalClientOrderUseCases,
  ],
  exports: [LegalClientOrderUseCases],
})
export class LegalClientOrderModule {}
