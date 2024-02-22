import { Module } from '@nestjs/common';

import { OutsourcedTransportCompanyContractRepository } from 'domain/repositories/OutsourcedTransportCompanyContract.repository';

import { OutsourcedTransportCompanyContractUseCases } from 'app/useCases/OutsourcedTransportCompanyContractUseCases/OutsourcedTransportCompanyContractUseCases';

import { OutsourcedTransportCompanyContractPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompanyContract.service';

import { CarrierCompanyModule } from '../CarrierCompanyGraphql/CarrierCompany.module';
import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientOrderModule } from '../LegalClientOrderGraphql/LegalClientOrder.module';
import { OutsourcedTransportCompanyModule } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.module';
import { OutsourcedTransportCompanyContractResolver } from './OutsourcedTransportCompanyContract.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    LegalClientOrderModule,
    CarrierCompanyModule,
    OutsourcedTransportCompanyModule,
  ],
  providers: [
    {
      provide: OutsourcedTransportCompanyContractRepository,
      useClass: OutsourcedTransportCompanyContractPrismaService,
    },
    OutsourcedTransportCompanyContractUseCases,
    OutsourcedTransportCompanyContractResolver,
  ],
  exports: [OutsourcedTransportCompanyContractUseCases],
})
export class OutsourcedTransportCompanyContractModule {}
