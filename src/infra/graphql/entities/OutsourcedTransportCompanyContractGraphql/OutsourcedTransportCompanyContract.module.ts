import { Module } from '@nestjs/common';

import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';
import { OutsourcedTransportCompanyContractRepository } from 'domain/repositories/OutsourcedTransportCompanyContract.repository';

import { CarrierCompanyPrismaService } from 'infra/database/prisma/services/CarrierCompany.service';
import { LegalClientOrderPrismaService } from 'infra/database/prisma/services/LegalClientOrder.service';
import { OutsourcedTransportCompanyPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompany.service';
import { OutsourcedTransportCompanyContractPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompanyContract.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { OutsourcedTransportCompanyContractResolver } from './OutsourcedTransportCompanyContract.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: OutsourcedTransportCompanyContractRepository,
      useClass: OutsourcedTransportCompanyContractPrismaService,
    },
    {
      provide: CarrierCompanyRepository,
      useClass: CarrierCompanyPrismaService,
    },
    {
      provide: OutsourcedTransportCompanyRepository,
      useClass: OutsourcedTransportCompanyPrismaService,
    },
    {
      provide: LegalClientOrderRepository,
      useClass: LegalClientOrderPrismaService,
    },
    OutsourcedTransportCompanyContractResolver,
  ],
})
export class OutsourcedTransportCompanyContractModule {}
