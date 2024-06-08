import { Module } from '@nestjs/common';

import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';

import { NaturalPersonUseCases } from 'app/useCases/NaturalPersoUseCases/NaturalPersonUseCases';

import { NaturalPersonPrismaService } from 'infra/database/prisma/services/natural-person.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { NaturalPersonResolver } from './NaturalPerson.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    { provide: NaturalPersonRepository, useClass: NaturalPersonPrismaService },
    NaturalPersonUseCases,
    NaturalPersonResolver,
  ],
  exports: [NaturalPersonUseCases, NaturalPersonRepository],
})
export class NaturalPersonModule {}
