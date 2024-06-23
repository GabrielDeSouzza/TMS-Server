import { Module } from '@nestjs/common';

import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { VehicleModelService } from 'infra/database/prisma/services/vehicle-model.service';
import { VehicleService } from 'infra/database/prisma/services/vehicle.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleModelModule } from '../VeihicleModelGraphql/vehicle-model.module';
import { VehicleResolver } from './vehicle.resolver';

@Module({
  providers: [
    { provide: VehicleRepository, useClass: VehicleService },
    { provide: VehicleModelRepository, useClass: VehicleModelService },

    VehicleUseCases,
    VehicleResolver,
  ],
  imports: [GraphqlCenterModule, VehicleModelModule],
  exports: [VehicleUseCases],
})
export class VehicleModule {}
