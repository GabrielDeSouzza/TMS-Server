import { Module } from '@nestjs/common';

import { CompletedOrdersRepository } from 'domain/repositories/CompletedOrdersRepository';

import { CompletedOrdersUseCases } from 'app/useCases/CompletedOrdersUseCases/CompletedOrdersUseCases';

import { CompletedOrdersPrismaService } from 'infra/database/prisma/services/CompletedOrdersLegalClient.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientOrderModule } from '../LegalClientOrderGraphql/LegalClientOrder.module';
import { PhysicalCustomerOrderModule } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.module';
import { VehicleModule } from '../VehicleGraphql/Vehicle.module';
import { CompletedOrdersResolver } from './CompletedOrders.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    VehicleModule,
    LegalClientOrderModule,
    PhysicalCustomerOrderModule,
  ],
  providers: [
    CompletedOrdersUseCases,
    {
      provide: CompletedOrdersRepository,
      useClass: CompletedOrdersPrismaService,
    },
    CompletedOrdersResolver,
  ],
  exports: [CompletedOrdersUseCases],
})
export class CompletedOrdersModule {}
