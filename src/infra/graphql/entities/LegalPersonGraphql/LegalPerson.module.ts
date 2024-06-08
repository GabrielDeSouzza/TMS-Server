import { Module } from '@nestjs/common';

import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { LegalPersonUseCases } from 'app/useCases/LegalPersonUseCases/LegalPersonUseCases';

import { LegalPersonPrismaService } from 'infra/database/prisma/services/legal-person.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalPersonResolver } from './LegalPerson.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    LegalPersonUseCases,
    { provide: LegalPersonRepository, useClass: LegalPersonPrismaService },

    LegalPersonResolver,
  ],
  exports: [LegalPersonUseCases],
})
export class LegalPersonModule {}
