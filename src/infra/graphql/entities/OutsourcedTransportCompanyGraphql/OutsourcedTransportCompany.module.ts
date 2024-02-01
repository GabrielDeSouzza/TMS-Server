import { Module } from '@nestjs/common';

import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';
import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';

import { LegalPersonPrismaService } from 'infra/database/prisma/services/legal-person.service';
import { OutsourcedTransportCompanyPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompany.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { OutsourcedTransportCompanyResolver } from './OutsourcedTransportCompany.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: OutsourcedTransportCompanyRepository,
      useClass: OutsourcedTransportCompanyPrismaService,
    },
    { provide: LegalPersonRepository, useClass: LegalPersonPrismaService },
    OutsourcedTransportCompanyResolver,
  ],
})
export class OutsourcedTransportCompanyModule {}
