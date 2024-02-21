import { Module } from '@nestjs/common';

import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';

import { CarrierCompanyPrismaService } from 'infra/database/prisma/services/CarrierCompany.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalPersonModule } from '../LegalPersonGraphql/LegalPerson.module';
import { CarrierCompanyResolver } from './CarrierCompany.resolver';

@Module({
  imports: [GraphqlCenterModule, LegalPersonModule],
  providers: [
    {
      provide: CarrierCompanyRepository,
      useClass: CarrierCompanyPrismaService,
    },
    CarrierCompanyUseCases,

    CarrierCompanyResolver,
  ],
  exports: [CarrierCompanyUseCases],
})
export class CarrierCompanyModule {}
