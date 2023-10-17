import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';
import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { UserService } from 'infra/database/prisma/services/user.service';
import { VehicleBrandService } from 'infra/database/prisma/services/vehicle-brand.service';
import { VehicleModelService } from 'infra/database/prisma/services/vehicle-model.service';

import { VehicleBrandResolver } from './vehicle-brand.resolver';

@Module({
  providers: [
    { provide: VehicleBrandRepository, useClass: VehicleBrandService },
    { provide: UserRepository, useClass: UserService },
    {
      provide: VehicleModelRepository,
      useClass: VehicleModelService,
    },
    PrismaService,
    VehicleBrandResolver,
  ],
})
export class VehicleBrandModule {}
