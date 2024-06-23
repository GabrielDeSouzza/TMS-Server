import { Module } from '@nestjs/common';

import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';

import { VehicleModelUseCases } from 'app/useCases/VehicleModelUseCases/VehihicleModelUseCases';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { VehicleModelService } from 'infra/database/prisma/services/vehicle-model.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleBrandModule } from '../VehicleBrandGraphql/vehicle-brand.module';
import { VehicleTypeModule } from '../VehicleTypeGraphql/vehicle-type.module';
import { VehicleModelResolver } from './vehicle-model.resolver';

@Module({
  imports: [GraphqlCenterModule, VehicleTypeModule, VehicleBrandModule],
  providers: [
    PrismaService,
    { provide: VehicleModelRepository, useClass: VehicleModelService },

    VehicleModelResolver,
    VehicleModelUseCases,
  ],
  exports: [VehicleModelUseCases],
})
export class VehicleModelModule {}
