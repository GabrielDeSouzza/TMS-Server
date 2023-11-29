import { Module } from '@nestjs/common';

import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';
import { LegalClientRepository } from 'domain/repositories/LegalClientRepositoy';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { CarrierCompanyPrismaService } from 'infra/database/prisma/services/CarrierCompany.service';
import { LegalClientPrismaService } from 'infra/database/prisma/services/legal-client.service';
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
  ],
})
export class LegalContractModule {}
