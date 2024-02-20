import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { PhysicalCustomerRepository } from 'domain/repositories/PhysicalCustomerRepository';

import { PhysicalCustomerUseCases } from 'app/useCases/PhysicalCustomerUseCases/PhysicalCustomerUseCases';

import { PhysicalCustomerPrismaService } from 'infra/database/prisma/services/PhysicalCustomer.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { NaturalPersonModule } from '../NaturalPersonGraphql/NaturalPerson.module';
import { PhysicalCustomerResolver } from './PhysicalCustomer.resolver';

@Module({
  providers: [
    {
      provide: PhysicalCustomerRepository,
      useClass: PhysicalCustomerPrismaService,
    },
    PhysicalCustomerUseCases,
    PhysicalCustomerResolver,
  ],
  exports: [PhysicalCustomerUseCases],
  imports: [GraphqlCenterModule, NaturalPersonModule],
})
export class PhysicalCustomerModule {}
