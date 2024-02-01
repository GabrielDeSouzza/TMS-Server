import { Module } from '@nestjs/common';

import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';

import { LegalContractUseCases } from 'app/useCases/LegalContractUseCases/LegalContractUseCases';

import { LegalContractPrismaService } from 'infra/database/prisma/services/LegalContract.service';

import { CarrierCompanyModule } from '../CarrierCompanyGraphql/CarrierCompany.module';
import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientModule } from '../LegalClientGraphql/LegalClient.module';
import { LegalPersonModule } from '../LegalPersonGraphql/LegalPerson.module';
import { LegalContractResolver } from './LegalContract.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    LegalClientModule,
    LegalPersonModule,
    CarrierCompanyModule,
  ],
  providers: [
    { provide: LegalContractRepository, useClass: LegalContractPrismaService },
    LegalContractResolver,
    LegalContractUseCases,
  ],
  exports: [LegalContractUseCases],
})
export class LegalContractModule {}
