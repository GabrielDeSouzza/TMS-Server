import { Module } from '@nestjs/common';

import { RecipientRepository } from 'domain/repositories/RecipientRepository ';

import { RecipientUseCases } from 'app/useCases/RecipientUseCase /RecipientUseCases';

import { RecipientPrismaService } from 'infra/database/prisma/services/recipient.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalPersonModule } from '../LegalPersonGraphql/LegalPerson.module';
import { NaturalPersonModule } from '../NaturalPersonGraphql/NaturalPerson.module';
import { RecipientResolver } from './Recipient.resolver';

@Module({
  providers: [
    { provide: RecipientRepository, useClass: RecipientPrismaService },
    RecipientUseCases,
    RecipientResolver,
  ],
  imports: [GraphqlCenterModule, NaturalPersonModule, LegalPersonModule],
  exports: [RecipientUseCases],
})
export class RecipientModule {}
