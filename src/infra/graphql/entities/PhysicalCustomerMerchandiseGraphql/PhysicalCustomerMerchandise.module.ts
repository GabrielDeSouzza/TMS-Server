import { Module } from '@nestjs/common';

import { PhysicalCustomerMerchandiseRepository } from 'domain/repositories/PhysicalCustomerMerchandise.repository';

import { PhysicalCustomerMerchandiseUseCases } from 'app/useCases/PhysicalCustomerMerchandiseDto/PhysicalCustomerMerchandiseUseCases';

import { PhysicalCustomerMerchandisePrismaService } from 'infra/database/prisma/services/PhysicalCustomerMerchandise.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { InvoiceForPhysicalCustomerModule } from '../InvoiceForPhysicalCustomerGraphql/InvoiceForPhysicalCustomer.module';
import { PhysicalCustomerMerchandiseResolver } from './PhysicalCustomerMerchandise.resolver';

@Module({
  imports: [GraphqlCenterModule, InvoiceForPhysicalCustomerModule],
  providers: [
    {
      provide: PhysicalCustomerMerchandiseRepository,
      useClass: PhysicalCustomerMerchandisePrismaService,
    },
    PhysicalCustomerMerchandiseUseCases,
    PhysicalCustomerMerchandiseResolver,
  ],
  exports: [PhysicalCustomerMerchandiseUseCases],
})
export class PhysicalCustomerMerchandiseModule {}
