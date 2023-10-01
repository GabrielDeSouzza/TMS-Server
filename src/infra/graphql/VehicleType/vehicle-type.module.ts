import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { UserService } from 'infra/database/prisma/services/user.service';
import { VehicleTypeService } from 'infra/database/prisma/services/vehicle-type.service';

import { VehicleTypeResolver } from './vehicle-type.resolver';

@Module({
  providers: [
    { provide: UserRepository, useClass: UserService },
    { provide: VehicleTypeRepository, useClass: VehicleTypeService },
    PrismaService,
    VehicleTypeResolver,
  ],
})
export class VehicleTypeModule {}
