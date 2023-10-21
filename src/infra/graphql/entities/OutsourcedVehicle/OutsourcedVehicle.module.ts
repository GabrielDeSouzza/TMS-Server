import { Module } from '@nestjs/common';

import { OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { OutsourcedVehicleServicePrisma } from 'infra/database/prisma/services/outsourced-vehicle.service';
import { VehicleService } from 'infra/database/prisma/services/vehicle.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { OutsourcedVehicleResolver } from './OutsourcedVehicle.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: OutsourcedVehicleRepository,
      useClass: OutsourcedVehicleServicePrisma,
    },
    { provide: VehicleRepository, useClass: VehicleService },
    OutsourcedVehicleResolver,
  ],
})
export class OutsourcedVehicleModule {}
