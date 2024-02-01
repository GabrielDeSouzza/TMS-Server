import { Module } from '@nestjs/common';

import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';
import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';
import { OutsourcedTransportCompanyDriverRepository } from 'domain/repositories/OutsourcedTransportCompanyDriver.repository';

import { NaturalPersonPrismaService } from 'infra/database/prisma/services/natural-person.service';
import { OutsourcedTransportCompanyPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompany.service';
import { OutsourcedTransportCompanyDriverPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompanyDriver.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { OutsourcedTransportCompanyDriverResolver } from './OutsourcedTransportCompanyDriver.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: OutsourcedTransportCompanyDriverRepository,
      useClass: OutsourcedTransportCompanyDriverPrismaService,
    },
    { provide: NaturalPersonRepository, useClass: NaturalPersonPrismaService },
    {
      provide: OutsourcedTransportCompanyRepository,
      useClass: OutsourcedTransportCompanyPrismaService,
    },
    OutsourcedTransportCompanyDriverResolver,
  ],
})
export class OutsourcedTransportCompanyDriverModule {}
