import { Module } from '@nestjs/common';

import { VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';
import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { VehicleBrandService } from 'infra/database/prisma/services/vehicle-brand.service';
import { VehicleModelService } from 'infra/database/prisma/services/vehicle-model.service';
import { VehicleTypeService } from 'infra/database/prisma/services/vehicle-type.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleTypeModule } from '../VehicleTypeGraphql/vehicle-type.module';
import { VehicleModelResolver } from './vehicle-model.resolver';

@Module({
  imports: [GraphqlCenterModule, VehicleTypeModule],
  providers: [
    PrismaService,
    { provide: VehicleModelRepository, useClass: VehicleModelService },
    { provide: VehicleTypeRepository, useClass: VehicleTypeService },
    { provide: VehicleBrandRepository, useClass: VehicleBrandService },

    VehicleModelResolver,
  ],
})
export class VehicleModelModule {}
