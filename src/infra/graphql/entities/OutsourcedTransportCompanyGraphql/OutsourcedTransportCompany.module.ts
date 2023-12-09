import { Module } from '@nestjs/common';

import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';
import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { LegalPersonPrismaService } from 'infra/database/prisma/services/legal-person.service';
import { OutsourcedTransportCompanyPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompany.service';
import { UserService } from 'infra/database/prisma/services/user.service';

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
    { provide: UserRepository, useClass: UserService },
    OutsourcedTransportCompanyResolver,
  ],
})
export class OutsourcedTransportCompanyModule {}
