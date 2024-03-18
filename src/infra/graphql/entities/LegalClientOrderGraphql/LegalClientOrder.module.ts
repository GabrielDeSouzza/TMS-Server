import { Module } from '@nestjs/common';

import { InvoiceForLegalClientRepository } from 'domain/repositories/InvoiceForLegalClient.repository';
import { LegalClientMerchandiseRepository } from 'domain/repositories/LegalClientMerchandise.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';

import { LegalClientMerchandiseUseCases } from 'app/useCases/LegalClientMerchandiseDto/LegalClientMerchandisesUseCases';
import { LegalClientOrderUseCases } from 'app/useCases/LegalClientOrderUseCases/LegalClientUseCases';

import { InvoiceForLegalClientPrismaService } from 'infra/database/prisma/services/InvoiceForLegalClient.service';
import { LegalClientMerchandisePrismaService } from 'infra/database/prisma/services/LegalClientMerchandise.service';
import { LegalClientOrderPrismaService } from 'infra/database/prisma/services/LegalClientOrder.service';
import { LegalContractPrismaService } from 'infra/database/prisma/services/LegalContract.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalContractModule } from '../LegalContractGraphql/LegalContract.module';
import { RecipientModule } from '../RecipientGraphql/Recipient.module';
import { LegalClientOrderResolver } from './LegalClientOrder.resolver';

@Module({
  imports: [GraphqlCenterModule, LegalContractModule, RecipientModule],
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
    {
      provide: LegalClientMerchandiseRepository,
      useClass: LegalClientMerchandisePrismaService,
    },
    LegalClientMerchandiseUseCases,
    LegalClientOrderResolver,
    LegalClientOrderUseCases,
  ],
  exports: [LegalClientOrderUseCases],
})
export class LegalClientOrderModule {}
