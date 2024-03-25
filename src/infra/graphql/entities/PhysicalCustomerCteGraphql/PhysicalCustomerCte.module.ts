import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { PhysicalCustomerCteRepository } from 'domain/repositories/PhysicalCustomerCteRepository';

import { PhysicalCustomerCteUseCase } from 'app/useCases/PhysicalCustomerCteUseCase/PhysicalCustomerCteUseCase';

import { PhysicalCustomerCtePrismaService } from 'infra/database/prisma/services/PhysicalCustomerCte.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { PhysicalCustomerOrderModule } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.module';
import { PhysicalCustomerCteResolver } from './PhysicalCustomerCte.resolver';

@Module({
  providers: [
    {
      provide: PhysicalCustomerCteRepository,
      useClass: PhysicalCustomerCtePrismaService,
    },
    PhysicalCustomerCteUseCase,
    PhysicalCustomerCteResolver,
  ],
  exports: [PhysicalCustomerCteUseCase],
  imports: [GraphqlCenterModule, PhysicalCustomerOrderModule],
})
export class PhysicalCustomerCteModule {}
