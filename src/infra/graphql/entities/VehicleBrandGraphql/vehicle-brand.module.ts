import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';
import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { VehicleBrandService } from 'infra/database/prisma/services/vehicle-brand.service';
import { VehicleModelService } from 'infra/database/prisma/services/vehicle-model.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleBrandResolver } from './vehicle-brand.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    { provide: VehicleBrandRepository, useClass: VehicleBrandService },
    {
      provide: VehicleModelRepository,
      useClass: VehicleModelService,
    },
    PrismaService,
    VehicleBrandResolver,
  ],
})
export class VehicleBrandModule {}
