import { Module } from '@nestjs/common';

import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { VehicleModelService } from 'infra/database/prisma/services/vehicle-model.service';
import { VehicleService } from 'infra/database/prisma/services/vehicle.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleGraphqlResolver } from './Vehicle.resolver';

@Module({
  providers: [
    { provide: VehicleRepository, useClass: VehicleService },
    { provide: VehicleModelRepository, useClass: VehicleModelService },
    VehicleGraphqlResolver,
  ],
  imports: [GraphqlCenterModule],
})
export class VehicleModule {}
