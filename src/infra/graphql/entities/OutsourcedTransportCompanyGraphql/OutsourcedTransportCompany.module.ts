import { Module } from '@nestjs/common';

import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';

import { OutsourcedTransportCompanyUseCases } from 'app/useCases/OutsourcedTransportCompanyUseCases/OutsourcedTransportCompanyUseCases';

import { OutsourcedTransportCompanyPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompany.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalPersonModule } from '../LegalPersonGraphql/LegalPerson.module';
import { OutsourcedTransportCompanyResolver } from './OutsourcedTransportCompany.resolver';

@Module({
  imports: [GraphqlCenterModule, LegalPersonModule],
  providers: [
    {
      provide: OutsourcedTransportCompanyRepository,
      useClass: OutsourcedTransportCompanyPrismaService,
    },
    OutsourcedTransportCompanyResolver,
    OutsourcedTransportCompanyUseCases,
  ],
  exports: [OutsourcedTransportCompanyUseCases],
})
export class OutsourcedTransportCompanyModule {}
