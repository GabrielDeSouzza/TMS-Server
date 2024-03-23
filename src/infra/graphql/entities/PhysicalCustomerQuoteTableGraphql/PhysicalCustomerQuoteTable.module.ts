import { Module } from '@nestjs/common';

import { PhysicalCustomerQuoteTableRepository } from 'domain/repositories/PhysicalCustomerQuoteTable.repository';

import { PhysicalCustomerQuoteTableUseCases } from 'app/useCases/PhysicalCustomerQuoteTableUseCase/PhysicalCustomerQuoteTable';

import { PhysicalCustomerQuoteTablePrismaService } from 'infra/database/prisma/services/PhysicalCustomerQuoteTable.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { RecipientModule } from '../RecipientGraphql/Recipient.module';
import { SenderModule } from '../SenderGraphql/Sender.module';
import { PhysicalCustomerQuoteTableResolver } from './PhysicalCustomerQuoteTable.resolver';

@Module({
  providers: [
    {
      provide: PhysicalCustomerQuoteTableRepository,
      useClass: PhysicalCustomerQuoteTablePrismaService,
    },
    PhysicalCustomerQuoteTableResolver,
    PhysicalCustomerQuoteTableUseCases,
  ],
  imports: [GraphqlCenterModule, SenderModule, RecipientModule],
  exports: [PhysicalCustomerQuoteTableUseCases],
})
export class PhysicalCustomerQuoteTableModule {}
