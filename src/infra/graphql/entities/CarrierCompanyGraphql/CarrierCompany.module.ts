import { Module } from '@nestjs/common';

import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { CarrierCompanyPrismaService } from 'infra/database/prisma/services/CarrierCompany.service';
import { LegalPersonPrismaService } from 'infra/database/prisma/services/legal-person.service';
import { UserService } from 'infra/database/prisma/services/user.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { CarrierCompanyResolver } from './CarrierCompany.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: CarrierCompanyRepository,
      useClass: CarrierCompanyPrismaService,
    },
    { provide: LegalPersonRepository, useClass: LegalPersonPrismaService },
    { provide: UserRepository, useClass: UserService },
    CarrierCompanyResolver,
  ],
})
export class CarrierCompanyModule {}
