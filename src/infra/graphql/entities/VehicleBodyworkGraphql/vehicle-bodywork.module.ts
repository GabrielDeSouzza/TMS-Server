import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { VehicleBodyworkUseCases } from 'app/useCases/VehicleBodyWorkUseCases/VehicleBodyWorkUseCases';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { VehicleBodyworkService } from 'infra/database/prisma/services/vehicle-bodywork.service';
import { VehicleTypeService } from 'infra/database/prisma/services/vehicle-type.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleBodyworkResolver } from './vehicle-bodywork.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    PrismaService,
    { provide: VehicleBodyworkRepository, useClass: VehicleBodyworkService },
    { provide: VehicleTypeRepository, useClass: VehicleTypeService },
    VehicleBodyworkResolver,
    VehicleBodyworkUseCases,
  ],
  exports: [VehicleBodyworkUseCases],
})
export class VehicleBodyworkModule {}
