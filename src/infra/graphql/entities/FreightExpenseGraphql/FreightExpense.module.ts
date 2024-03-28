import { Module } from '@nestjs/common';

import { FreightExpenseRepository } from 'domain/repositories/FreightExpenseResitory';

import { FreightExpenseUseCases } from 'app/useCases/FreightExpenseUseCases/FreightExpenseUseCases';

import { FreightExpensePrismaService } from 'infra/database/prisma/services/FreightExpense.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientOrderModule } from '../LegalClientOrderGraphql/LegalClientOrder.module';
import { PhysicalCustomerOrderModule } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.module';
import { FreightExpenseResolver } from './FreightExpense.resolver';

@Module({
  providers: [
    {
      provide: FreightExpenseRepository,
      useClass: FreightExpensePrismaService,
    },
    FreightExpenseUseCases,
    FreightExpenseResolver,
  ],
  imports: [
    GraphqlCenterModule,
    PhysicalCustomerOrderModule,
    LegalClientOrderModule,
  ],
  exports: [FreightExpenseUseCases],
})
export class FreightExpenseModule {}
