import { Module } from '@nestjs/common';

import { InvoiceForPhysicalCustomerRepository } from 'domain/repositories/InvoiceForPhysicalCustomer.repository';

import { InvoiceForPhysicalCustomerUseCases } from 'app/useCases/InvoiceForPhysicalCustomer/InvoiceForPhysicalCustomerUseCases';

import { InvoiceForPhysicalCustomerPrismaService } from 'infra/database/prisma/services/InvoiceForPhysicalCustomer.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { PhysicalCustomerModule } from '../PhysicalCustomerGraphql/PhysicalCustomer.module';
import { InvoiceForPhysicalCustomerResolver } from './InvoiceForPhysicalCustomer.resolver';

@Module({
  imports: [GraphqlCenterModule, PhysicalCustomerModule],
  providers: [
    {
      provide: InvoiceForPhysicalCustomerRepository,
      useClass: InvoiceForPhysicalCustomerPrismaService,
    },
    InvoiceForPhysicalCustomerResolver,
    InvoiceForPhysicalCustomerUseCases,
  ],
  exports: [InvoiceForPhysicalCustomerUseCases],
})
export class InvoiceForPhysicalCustomerModule {}
