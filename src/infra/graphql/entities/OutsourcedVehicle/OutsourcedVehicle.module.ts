import { Module } from '@nestjs/common';

import { OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedVehicleRepository';

import { OutsourcedVehicleUseCases } from 'app/useCases/OutsoucedVehicleUseCases/OutsourcedVehicleUseCases';

import { OutsourcedVehicleServicePrisma } from 'infra/database/prisma/services/outsourced-vehicle.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleModule } from '../VehicleGraphql/Vehicle.module';
import { OutsourcedVehicleResolver } from './OutsourcedVehicle.resolver';

@Module({
  imports: [GraphqlCenterModule, VehicleModule],
  providers: [
    {
      provide: OutsourcedVehicleRepository,
      useClass: OutsourcedVehicleServicePrisma,
    },
    OutsourcedVehicleUseCases,
    OutsourcedVehicleResolver,
  ],
  exports: [OutsourcedVehicleUseCases],
})
export class OutsourcedVehicleModule {}
