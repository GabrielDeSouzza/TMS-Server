import { Module } from '@nestjs/common';

import { OutsourcedTransportCompanyDriverRepository } from 'domain/repositories/OutsourcedTransportCompanyDriver.repository';

import { OutsourcedTransportCompanyDriverUseCases } from 'app/useCases/OutsourcedTransportCompanyDriverUseCases/OutsourcedTransportCompanyDriverUseCases';

import { OutsourcedTransportCompanyDriverPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompanyDriver.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { NaturalPersonModule } from '../NaturalPersonGraphql/NaturalPerson.module';
import { OutsourcedTransportCompanyModule } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.module';
import { OutsourcedTransportCompanyDriverResolver } from './OutsourcedTransportCompanyDriver.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    NaturalPersonModule,
    OutsourcedTransportCompanyModule,
  ],

  providers: [
    {
      provide: OutsourcedTransportCompanyDriverRepository,
      useClass: OutsourcedTransportCompanyDriverPrismaService,
    },
    OutsourcedTransportCompanyDriverUseCases,
    OutsourcedTransportCompanyDriverResolver,
  ],
  exports: [OutsourcedTransportCompanyDriverUseCases],
})
export class OutsourcedTransportCompanyDriverModule {}
