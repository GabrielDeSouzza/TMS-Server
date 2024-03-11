import { Module } from '@nestjs/common';

import { OrderProcessingLegalClientRepository } from 'domain/repositories/OrderProcessingLegalClientRepository';

import { OrderProcessingLegalClientUseCases } from 'app/useCases/ProcessingLegalClientUseCases/ProcessingLegalClientUseCases';

import { OrderProcessingLegalClientPrismaService } from 'infra/database/prisma/services/OrderProcessingLegalClient.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientOrderModule } from '../LegalClientOrderGraphql/LegalClientOrder.module';
import { VehicleModule } from '../VehicleGraphql/Vehicle.module';
import { OrderProcessingLegalClientResolver } from './OrderProcessingLegalClient.resolver';

@Module({
  imports: [GraphqlCenterModule, VehicleModule, LegalClientOrderModule],
  providers: [
    OrderProcessingLegalClientUseCases,
    {
      provide: OrderProcessingLegalClientRepository,
      useClass: OrderProcessingLegalClientPrismaService,
    },
    OrderProcessingLegalClientResolver,
  ],
  exports: [OrderProcessingLegalClientUseCases],
})
export class OrderProcessingLegalClientModule {}
