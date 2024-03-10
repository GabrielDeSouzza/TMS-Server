import { Module } from '@nestjs/common';

import { RouteLegalClientRepository } from 'domain/repositories/RouteLegalClientRepository';

import { RouteLegalClientUseCases } from 'app/useCases/RouteLegalClientUseCases/RouteLegalClientUseCases';

import { RouteLegalClientPrismaService } from 'infra/database/prisma/services/RouteLegalClient.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientOrderModule } from '../LegalClientOrderGraphql/LegalClientOrder.module';
import { RouteLegalClientResolver } from './RouteLegalClient.resolver';

@Module({
  imports: [GraphqlCenterModule, LegalClientOrderModule],
  providers: [
    RouteLegalClientUseCases,
    {
      provide: RouteLegalClientRepository,
      useClass: RouteLegalClientPrismaService,
    },
    RouteLegalClientResolver,
  ],
  exports: [RouteLegalClientUseCases],
})
export class RouteLegalClientModule {}
