import { Module } from '@nestjs/common';

import { TypeOfMaintenanceRepository } from 'domain/repositories/TypeOfMaintenanceRepository';

import { TypeOfMaintenanceUseCases } from 'app/useCases/TypeOfMaintenanceUseCase/TypeOfMaintenanceUseCases';

import { TypeOfMaintenancePrismaService } from 'infra/database/prisma/services/TypeOfMaintenance.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { TypeOfMaintenanceResolver } from './TypeOfMaintenance.resolver';

@Module({
  providers: [
    {
      provide: TypeOfMaintenanceRepository,
      useClass: TypeOfMaintenancePrismaService,
    },
    TypeOfMaintenanceUseCases,
    TypeOfMaintenanceResolver,
  ],
  imports: [GraphqlCenterModule],
  exports: [TypeOfMaintenanceUseCases],
})
export class TypeOfMaintenanceModule {}
