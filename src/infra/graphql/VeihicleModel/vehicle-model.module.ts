import { Module } from '@nestjs/common';

import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';
import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { UserService } from 'infra/database/prisma/services/user.service';
import { VehicleBrandService } from 'infra/database/prisma/services/vehicle-brand.service';
import { VehicleModelService } from 'infra/database/prisma/services/vehicle-model.service';
import { VehicleTypeService } from 'infra/database/prisma/services/vehicle-type.service';

import { VehicleModelResolver } from './vehicle-model.resolver';

@Module({
  providers: [
    PrismaService,
    { provide: VehicleModelRepository, useClass: VehicleModelService },
    { provide: UserRepository, useClass: UserService },
    { provide: VehicleTypeRepository, useClass: VehicleTypeService },
    { provide: VehicleBrandRepository, useClass: VehicleBrandService },

    VehicleModelResolver,
  ],
})
export class VehicleModelModule {}
