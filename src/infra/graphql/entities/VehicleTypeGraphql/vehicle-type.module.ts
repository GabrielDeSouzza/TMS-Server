import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { VehicleTypeContainsBodyRepository } from 'domain/repositories/VehicleTypeContainsBodyworkRepository';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { VehicleTypeService } from 'infra/database/prisma/services/vehicle-type.service';
import { VehicleContainsBodyService } from 'infra/database/prisma/services/vehicletype-contains-body.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleTypeResolver } from './vehicle-type.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
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
