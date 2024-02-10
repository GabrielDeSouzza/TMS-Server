import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { VehicleBodyworkService } from 'infra/database/prisma/services/vehicle-bodywork.service';
import { VehicleTypeService } from 'infra/database/prisma/services/vehicle-type.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleTypeResolver } from './vehicle-type.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    { provide: VehicleTypeRepository, useClass: VehicleTypeService },
    { provide: VehicleBodyworkRepository, useClass: VehicleBodyworkService },
    PrismaService,
    VehicleTypeResolver,
  ],
  exports: [VehicleTypeModule],
})
export class VehicleTypeModule {}
