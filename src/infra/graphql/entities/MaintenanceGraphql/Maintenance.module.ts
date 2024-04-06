import { Module } from '@nestjs/common';

import { MaintenanceRepository } from 'domain/repositories/MaintenanceRepository';

import { MaintenanceUseCases } from 'app/useCases/MaintenanceUseCase /MaintenanceUseCases';

import { MaintenancePrismaService } from 'infra/database/prisma/services/Maintenance.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalPersonModule } from '../LegalPersonGraphql/LegalPerson.module';
import { MaintenanceCompanyModule } from '../MaintenanceCompanyGraphql/MaintenanceCompany.module';
import { NaturalPersonModule } from '../NaturalPersonGraphql/NaturalPerson.module';
import { TypeOfMaintenanceModule } from '../TypeOfMaintenanceGraphql/TypeOfMaintenance.module';
import { VehicleModule } from '../VehicleGraphql/Vehicle.module';
import { MaintenanceResolver } from './Maintenance.resolver';

@Module({
  providers: [
    { provide: MaintenanceRepository, useClass: MaintenancePrismaService },
    MaintenanceUseCases,
    MaintenanceResolver,
  ],
  imports: [
    GraphqlCenterModule,
    NaturalPersonModule,
    LegalPersonModule,
    VehicleModule,
    TypeOfMaintenanceModule,
    MaintenanceCompanyModule,
  ],
  exports: [MaintenanceUseCases],
})
export class MaintenanceModule {}
