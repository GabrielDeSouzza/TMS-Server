import { Module } from '@nestjs/common';

import { OrderProcessingPhysicalCustomerRepository } from 'domain/repositories/OrderProcessingPhysicalCustomerRepository';

import { OrderProcessingPhysicalCustomerUseCases } from 'app/useCases/ProcessingPhysicalCustomerCases/ProcessingPhysicalCustomerUseCases';

import { OrderProcessingPhysicalCustomerPrismaService } from 'infra/database/prisma/services/OrderProcessingPhysicalCustomer.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { PhysicalCustomerOrderModule } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.module';
import { VehicleModule } from '../VehicleGraphql/Vehicle.module';
import { OrderProcessingPhysicalCustomerResolver } from './OrderProcessingPhysicalCustomer.resolver';

@Module({
  imports: [GraphqlCenterModule, VehicleModule, PhysicalCustomerOrderModule],
  providers: [
    OrderProcessingPhysicalCustomerUseCases,
    {
      provide: OrderProcessingPhysicalCustomerRepository,
      useClass: OrderProcessingPhysicalCustomerPrismaService,
    },
    OrderProcessingPhysicalCustomerResolver,
  ],
  exports: [OrderProcessingPhysicalCustomerUseCases],
})
export class OrderProcessingPhysicalCustomerModule {}
