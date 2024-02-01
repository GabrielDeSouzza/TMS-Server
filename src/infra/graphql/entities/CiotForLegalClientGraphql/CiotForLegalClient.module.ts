import { Module } from '@nestjs/common';

import { CiotForLegalClientRepository } from 'domain/repositories/CiotForLegalClient.repository';

import { CiotForLegalClientUseCases } from 'app/useCases/CiotForLegalClient/CiotForLegalClientUseCases';

import { CiotForLegalClientPrismaService } from 'infra/database/prisma/services/CiotForLegalClient.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalContractModule } from '../LegalContractGraphql/LegalContract.module';
import { CiotForLegalClientResolver } from './CiotForLegalClient.resolver';

@Module({
  imports: [GraphqlCenterModule, LegalContractModule],
  providers: [
    {
      provide: CiotForLegalClientRepository,
      useClass: CiotForLegalClientPrismaService,
    },
    CiotForLegalClientResolver,
    CiotForLegalClientUseCases,
  ],
  exports: [CiotForLegalClientUseCases],
})
export class CiotForLegalClientModule {}
