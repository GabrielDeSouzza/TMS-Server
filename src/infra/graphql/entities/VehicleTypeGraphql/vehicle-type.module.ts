import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleTypeContainsBodyRepository } from 'domain/repositories/VehicleTypeContainsBodyworkRepository';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { UserService } from 'infra/database/prisma/services/user.service';
import { VehicleTypeService } from 'infra/database/prisma/services/vehicle-type.service';
import { VehicleContainsBodyService } from 'infra/database/prisma/services/vehicletype-contains-body.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleTypeResolver } from './vehicle-type.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    { provide: UserRepository, useClass: UserService },
    { provide: VehicleTypeRepository, useClass: VehicleTypeService },
    {
      provide: VehicleTypeContainsBodyRepository,
      useClass: VehicleContainsBodyService,
    },
    PrismaService,
    VehicleTypeResolver,
  ],
  exports: [VehicleTypeModule],
})
export class VehicleTypeModule {}
