import { Module } from '@nestjs/common';

import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';
import { OutsourcedTransportCompanyDriverRepository } from 'domain/repositories/OutsourcedTransportCompanyDriver.repository';

import { OutsourcedTransportCompanyPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompany.service';
import { OutsourcedTransportCompanyDriverPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompanyDriver.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { NaturalPersonModule } from '../NaturalPersonGraphql/NaturalPerson.module';
import { OutsourcedTransportCompanyDriverResolver } from './OutsourcedTransportCompanyDriver.resolver';

@Module({
  imports: [GraphqlCenterModule, NaturalPersonModule],

  providers: [
    {
      provide: OutsourcedTransportCompanyDriverRepository,
      useClass: OutsourcedTransportCompanyDriverPrismaService,
    },
    {
      provide: OutsourcedTransportCompanyRepository,
      useClass: OutsourcedTransportCompanyPrismaService,
    },
    OutsourcedTransportCompanyDriverResolver,
  ],
})
export class OutsourcedTransportCompanyDriverModule {}
