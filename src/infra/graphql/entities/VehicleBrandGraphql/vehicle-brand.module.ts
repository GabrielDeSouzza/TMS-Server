import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';

import { VehicleBrandUseCases } from 'app/useCases/VehicleBrandCases/VehicleBrandUseCases';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { VehicleBrandService } from 'infra/database/prisma/services/vehicle-brand.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleBrandResolver } from './vehicle-brand.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    { provide: VehicleBrandRepository, useClass: VehicleBrandService },
    PrismaService,
    VehicleBrandResolver,
    VehicleBrandUseCases,
  ],
})
export class VehicleBrandModule {}
