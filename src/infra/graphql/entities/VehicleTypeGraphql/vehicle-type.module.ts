import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { VehicleTypeService } from 'infra/database/prisma/services/vehicle-type.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleTypeResolver } from './vehicle-type.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    { provide: VehicleTypeRepository, useClass: VehicleTypeService },

    PrismaService,
    VehicleTypeResolver,
  ],
  exports: [VehicleTypeModule],
})
export class VehicleTypeModule {}
