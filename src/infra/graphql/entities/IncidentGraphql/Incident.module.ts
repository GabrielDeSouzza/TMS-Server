import { Module } from '@nestjs/common';

import { IncidentRepository } from 'domain/repositories/IncidentResitory';

import { IncidentUseCases } from 'app/useCases/IncidentUseCases/IncidentUseCases';

import { IncidentPrismaService } from 'infra/database/prisma/services/Incident.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { OrderProcessingModule } from '../OrderProcessingGraphql/OrderProcessing.module';
import { IncidentResolver } from './Incident.resolver';

@Module({
  providers: [
    {
      provide: IncidentRepository,
      useClass: IncidentPrismaService,
    },
    IncidentUseCases,
    IncidentResolver,
  ],
  imports: [GraphqlCenterModule, OrderProcessingModule],
  exports: [IncidentUseCases],
})
export class IncidentModule {}
