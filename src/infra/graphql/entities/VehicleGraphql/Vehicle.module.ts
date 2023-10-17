import { Module } from '@nestjs/common';

import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';
import { VehicleTypeContainsBodyRepository } from 'domain/repositories/VehicleTypeContainsBodyworkRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { UserService } from 'infra/database/prisma/services/user.service';
import { VehicleModelService } from 'infra/database/prisma/services/vehicle-model.service';
import { VehicleService } from 'infra/database/prisma/services/vehicle.service';
import { VehicleContainsBodyService } from 'infra/database/prisma/services/vehicletype-contains-body.service';

import { VehicleGraphqlResolver } from './Vehicle.resolver';

@Module({
  providers: [
    PrismaService,
    { provide: VehicleRepository, useClass: VehicleService },
    { provide: VehicleModelRepository, useClass: VehicleModelService },
    { provide: UserRepository, useClass: UserService },
    {
      provide: VehicleTypeContainsBodyRepository,
      useClass: VehicleContainsBodyService,
    },
    VehicleGraphqlResolver,
  ],
})
export class VehicleModule {}
