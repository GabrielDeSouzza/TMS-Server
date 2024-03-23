import { Module } from '@nestjs/common';

import { PhysicalCustomerOrderRepository } from 'domain/repositories/PhysicalCustomerOrder.repository';

import { PhysicalCustomerOrderUseCases } from 'app/useCases/PhysicalCustomerOrderCases/PhysicalCustomerOrderUseCases';

import { PhysicalCustomerOrderPrismaService } from 'infra/database/prisma/services/PhysicalCustomerOrder.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { PhysicalCustomerModule } from '../PhysicalCustomerGraphql/PhysicalCustomer.module';
import { PhysicalCustomerQuoteTableModule } from '../PhysicalCustomerQuoteTableGraphql/PhysicalCustomerQuoteTable.module';
import { PhysicalCustomerOrderResolver } from './PhysicalCustomerOrder.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    PhysicalCustomerModule,
    PhysicalCustomerQuoteTableModule,
  ],
  providers: [
    {
      provide: PhysicalCustomerOrderRepository,
      useClass: PhysicalCustomerOrderPrismaService,
    },
    PhysicalCustomerOrderResolver,
    PhysicalCustomerOrderUseCases,
  ],
  exports: [PhysicalCustomerOrderUseCases],
})
export class PhysicalCustomerOrderModule {}
