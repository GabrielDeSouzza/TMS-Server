import { Module } from '@nestjs/common';

import { ContractOutsourcedDriverRepository } from 'domain/repositories/ContractOutsourcedDriverResitory';
import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';
import { OutsourcedDriverRepository } from 'domain/repositories/OutsourcedDriverRepository';
import { OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedVehicleRepository';

import { ContractOutsourcedDriverPrismaService } from 'infra/database/prisma/services/contract-outsouced-driver.service';
import { NaturalPersonPrismaService } from 'infra/database/prisma/services/natural-person.service';
import { OutsourcedDriverPrismaService } from 'infra/database/prisma/services/outsourced-driver.service';
import { OutsourcedVehicleServicePrisma } from 'infra/database/prisma/services/outsourced-vehicle.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { OutsourcedDriverResolver } from './OutsourcedDriver.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    OutsourcedDriverResolver,
    {
      provide: ContractOutsourcedDriverRepository,
      useClass: ContractOutsourcedDriverPrismaService,
    },
    { provide: NaturalPersonRepository, useClass: NaturalPersonPrismaService },
    {
      provide: OutsourcedVehicleRepository,
      useClass: OutsourcedVehicleServicePrisma,
    },
    {
      provide: OutsourcedDriverRepository,
      useClass: OutsourcedDriverPrismaService,
    },
    { provide: NaturalPersonRepository, useClass: NaturalPersonPrismaService },
  ],
})
export class OutsourcedDriverModule {}
