import { Module } from '@nestjs/common';

import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { LegalClientRepository } from 'domain/repositories/LegalClientRepositoy';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { LegalClientUseCases } from 'app/useCases/LegalClientUseCases/LegalClientUseCase';
import { LegalPersonUseCases } from 'app/useCases/LegalPersonUseCases/LegalPersonUseCases';

import { CarrierCompanyPrismaService } from 'infra/database/prisma/services/CarrierCompany.service';
import { LegalClientPrismaService } from 'infra/database/prisma/services/legal-client.service';
import { LegalPersonPrismaService } from 'infra/database/prisma/services/legal-person.service';
import { LegalClientOrderPrismaService } from 'infra/database/prisma/services/LegalClientOrder.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientResolver } from './LegalClient.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: LegalClientRepository,
      useClass: LegalClientPrismaService,
    },
    { provide: LegalPersonRepository, useClass: LegalPersonPrismaService },
    {
      provide: CarrierCompanyRepository,
      useClass: CarrierCompanyPrismaService,
    },
    {
      provide: LegalClientOrderRepository,
      useClass: LegalClientOrderPrismaService,
    },
    LegalClientUseCases,
    LegalPersonUseCases,
    LegalClientResolver,
  ],
  exports: [LegalClientUseCases],
})
export class LegalClientModule {}
