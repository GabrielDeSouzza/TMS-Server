import { Module } from '@nestjs/common';

import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { LegalPersonUseCases } from 'app/useCases/LegalPersonUseCases/LegalPersonUseCases';

import { LegalPersonPrismaService } from 'infra/database/prisma/services/legal-person.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    { provide: LegalPersonRepository, useClass: LegalPersonPrismaService },
    LegalPersonUseCases,
  ],
  exports: [LegalPersonUseCases],
})
export class LegalPersonModule {}
