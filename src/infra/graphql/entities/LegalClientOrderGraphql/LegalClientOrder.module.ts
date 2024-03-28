import { Module } from '@nestjs/common';

import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';

import { LegalClientOrderUseCases } from 'app/useCases/LegalClientOrderUseCases/LegalClientOrderUseCases';

import { LegalClientOrderPrismaService } from 'infra/database/prisma/services/LegalClientOrder.service';
import { LegalContractPrismaService } from 'infra/database/prisma/services/LegalContract.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientQuoteTableModule } from '../LegalClientQuoteTableGraphql/LegalClientQuoteTable.module';
import { LegalContractModule } from '../LegalContractGraphql/LegalContract.module';
import { LegalClientOrderResolver } from './LegalClientOrder.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    LegalContractModule,
    LegalClientQuoteTableModule,
  ],
  providers: [
    {
      provide: LegalClientOrderRepository,
      useClass: LegalClientOrderPrismaService,
    },
    { provide: LegalContractRepository, useClass: LegalContractPrismaService },
    LegalClientOrderResolver,
    LegalClientOrderUseCases,
  ],
  exports: [LegalClientOrderUseCases],
})
export class LegalClientOrderModule {}
