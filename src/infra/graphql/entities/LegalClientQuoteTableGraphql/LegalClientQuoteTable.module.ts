import { Module } from '@nestjs/common';

import { LegalClientQuoteTableRepository } from 'domain/repositories/LegalClientQuoteTable.repository';

import { LegalClientQuoteTableUseCases } from 'app/useCases/LegalClientQuoteTableUseCase/LegalClientQuoteTable';

import { LegalClientQuoteTablePrismaService } from 'infra/database/prisma/services/LegalClientQuoteTable.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { RecipientModule } from '../RecipientGraphql/Recipient.module';
import { SenderModule } from '../SenderGraphql/Sender.module';
import { LegalClientQuoteTableResolver } from './LegalClientQuoteTable.resolver';

@Module({
  providers: [
    {
      provide: LegalClientQuoteTableRepository,
      useClass: LegalClientQuoteTablePrismaService,
    },
    LegalClientQuoteTableResolver,
    LegalClientQuoteTableUseCases,
  ],
  imports: [GraphqlCenterModule, SenderModule, RecipientModule],
  exports: [LegalClientQuoteTableUseCases],
})
export class LegalClientQuoteTableModule {}
