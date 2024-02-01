import { Module } from '@nestjs/common';

import { CompanyVehicleRepository } from 'domain/repositories/CompanyVehicleRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { CompanyVehicleUseCases } from 'app/useCases/CompanyVehicleUseCases/CompanyVehicleUseCases';

import { CompanyVehicleServicePrisma } from 'infra/database/prisma/services/company-vehicle.service';
import { VehicleService } from 'infra/database/prisma/services/vehicle.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { CompanyVehicleResolver } from './CompanyVehicle.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: CompanyVehicleRepository,
      useClass: CompanyVehicleServicePrisma,
    },
    { provide: VehicleRepository, useClass: VehicleService },
    CompanyVehicleResolver,
    CompanyVehicleUseCases,
  ],
  exports: [CompanyVehicleUseCases],
})
export class CompanyVehicleModule {}
