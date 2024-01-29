import { Module } from '@nestjs/common';

import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';
import { LegalClientRepository } from 'domain/repositories/LegalClientRepositoy';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';

import { CarrierCompanyPrismaService } from 'infra/database/prisma/services/CarrierCompany.service';
import { LegalClientPrismaService } from 'infra/database/prisma/services/legal-client.service';
import { LegalPersonPrismaService } from 'infra/database/prisma/services/legal-person.service';
import { LegalContractPrismaService } from 'infra/database/prisma/services/LegalContract.service';
import { UserService } from 'infra/database/prisma/services/user.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalContractResolver } from './LegalContract.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: LegalContractRepository,
      useClass: LegalContractPrismaService,
    },
    {
      provide: CarrierCompanyRepository,
      useClass: CarrierCompanyPrismaService,
    },
    {
      provide: LegalClientRepository,
      useClass: LegalClientPrismaService,
    },
    { provide: UserRepository, useClass: UserService },
    LegalContractResolver,
    CarrierCompanyUseCases,
    { provide: LegalPersonRepository, useClass: LegalPersonPrismaService },
  ],
})
export class LegalContractModule {}
