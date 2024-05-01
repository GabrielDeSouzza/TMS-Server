import { Module } from '@nestjs/common';

import { OrderProcessingRepository } from 'domain/repositories/OrderProcessingRepository';

import { OrderProcessingUseCases } from 'app/useCases/OrderProcessingUseCases/OrderProcessingUseCases';

import { OrderProcessingPrismaService } from 'infra/database/prisma/services/OrderProcessing.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientOrderModule } from '../LegalClientOrderGraphql/LegalClientOrder.module';
import { PhysicalCustomerOrderModule } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.module';
import { VehicleModule } from '../VehicleGraphql/Vehicle.module';
import { OrderProcessingResolver } from './OrderProcessing.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    VehicleModule,
    LegalClientOrderModule,
    PhysicalCustomerOrderModule,
  ],
  providers: [
    OrderProcessingUseCases,
    {
      provide: OrderProcessingRepository,
      useClass: OrderProcessingPrismaService,
    },
    OrderProcessingResolver,
  ],
  exports: [OrderProcessingUseCases],
})
export class OrderProcessingModule {}
