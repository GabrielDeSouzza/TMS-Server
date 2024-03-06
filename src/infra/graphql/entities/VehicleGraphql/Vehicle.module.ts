import { Module } from '@nestjs/common';

import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { VehicleModelService } from 'infra/database/prisma/services/vehicle-model.service';
import { VehicleService } from 'infra/database/prisma/services/vehicle.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';

@Module({
  providers: [
    { provide: VehicleRepository, useClass: VehicleService },
    { provide: VehicleModelRepository, useClass: VehicleModelService },
    VehicleUseCases,
  ],
  imports: [GraphqlCenterModule],
  exports: [VehicleUseCases],
})
export class VehicleModule {}
