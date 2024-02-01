import { Module } from '@nestjs/common';

import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';

import { CarrierCompanyPrismaService } from 'infra/database/prisma/services/CarrierCompany.service';
import { LegalPersonPrismaService } from 'infra/database/prisma/services/legal-person.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { CarrierCompanyResolver } from './CarrierCompany.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: CarrierCompanyRepository,
      useClass: CarrierCompanyPrismaService,
    },
    CarrierCompanyUseCases,
    { provide: LegalPersonRepository, useClass: LegalPersonPrismaService },
    CarrierCompanyResolver,
    { provide: LegalPersonRepository, useClass: LegalPersonPrismaService },
  ],
  exports: [CarrierCompanyUseCases],
})
export class CarrierCompanyModule {}
