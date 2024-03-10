import { Module } from '@nestjs/common';

import { RoutePhysicalCustomerRepository } from 'domain/repositories/RoutePhysicalCustomerRepository';

import { RoutePhysicalCustomerUseCases } from 'app/useCases/RoutePhysicalCustomerUseCase/RoutePhysicalCustomerUseCases';

import { RoutePhysicalCustomerPrismaService } from 'infra/database/prisma/services/RoutePhysicalCustomer.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { PhysicalCustomerOrderModule } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.module';
import { RoutePhysicalCustomerResolver } from './RoutePhysicalCustomer.resolver';

@Module({
  imports: [GraphqlCenterModule, PhysicalCustomerOrderModule],
  providers: [
    RoutePhysicalCustomerUseCases,
    {
      provide: RoutePhysicalCustomerRepository,
      useClass: RoutePhysicalCustomerPrismaService,
    },
    RoutePhysicalCustomerResolver,
  ],
  exports: [RoutePhysicalCustomerUseCases],
})
export class RoutePhysicalCustomerModule {}
