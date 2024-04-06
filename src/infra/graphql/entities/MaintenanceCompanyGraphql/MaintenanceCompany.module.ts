import { Module } from '@nestjs/common';

import { MaintenanceCompanyRepository } from 'domain/repositories/MaintenanceCompanyRepositoy';

import { MaintenanceCompanyUseCases } from 'app/useCases/MaintenanceCompanyUseCases/MaintenanceCompanyUseCase';

import { MaintenanceCompanyPrismaService } from 'infra/database/prisma/services/MaintenanceCompany.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalPersonModule } from '../LegalPersonGraphql/LegalPerson.module';
import { MaintenanceCompanyResolver } from './MaintenanceCompany.resolver';

@Module({
  imports: [GraphqlCenterModule, LegalPersonModule],
  providers: [
    {
      provide: MaintenanceCompanyRepository,
      useClass: MaintenanceCompanyPrismaService,
    },
    MaintenanceCompanyUseCases,
    MaintenanceCompanyResolver,
  ],
  exports: [MaintenanceCompanyUseCases],
})
export class MaintenanceCompanyModule {}
