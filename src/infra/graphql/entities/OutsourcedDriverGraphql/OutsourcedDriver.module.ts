import { Module } from '@nestjs/common';

import { ContractOutsourcedDriverRepository } from 'domain/repositories/ContractOutsourcedDriverResitory';
import { OutsourcedDriverRepository } from 'domain/repositories/OutsourcedDriverRepository';

import { OutsourcedDriverUseCases } from 'app/useCases/OutsourcedDriverUseCases/OutsourcedDriverUseCases';

import { ContractOutsourcedDriverPrismaService } from 'infra/database/prisma/services/contract-outsouced-driver.service';
import { OutsourcedDriverPrismaService } from 'infra/database/prisma/services/outsourced-driver.service';

import { CompanyVehicleModule } from '../CompanyVehicle/CompanyVehicle.module';
import { ContractOutsoucedDriverModule } from '../ContractOutsourcedDriverGraphql/ContractOutsoucedDriver.module';
import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { NaturalPersonModule } from '../NaturalPersonGraphql/NaturalPerson.module';
import { OutsourcedVehicleModule } from '../OutsourcedVehicle/OutsourcedVehicle.module';
import { UserModule } from '../UserGraphql/user.module';
import { OutsourcedDriverResolver } from './OutsourcedDriver.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    NaturalPersonModule,
    OutsourcedVehicleModule,
    UserModule,
    ContractOutsoucedDriverModule,
    CompanyVehicleModule,
  ],
  providers: [
    OutsourcedDriverResolver,
    OutsourcedDriverUseCases,
    {
      provide: ContractOutsourcedDriverRepository,
      useClass: ContractOutsourcedDriverPrismaService,
    },
    {
      provide: OutsourcedDriverRepository,
      useClass: OutsourcedDriverPrismaService,
    },
  ],
  exports: [OutsourcedDriverUseCases],
})
export class OutsourcedDriverModule {}
