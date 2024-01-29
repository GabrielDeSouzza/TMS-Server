import { Module } from '@nestjs/common';

import { LegalClientMerchandiseRepository } from 'domain/repositories/LegalClientMerchandise.repository';

import { LegalClientMerchandiseUseCases } from 'app/useCases/LegalClientMerchandiseDto/LegalClientMerchandisesUseCases';

import { LegalClientMerchandisePrismaService } from 'infra/database/prisma/services/LegalClientMerchandise.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientMerchandiseResolver } from './LegalClientMerchandise.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: LegalClientMerchandiseRepository,
      useClass: LegalClientMerchandisePrismaService,
    },
    LegalClientMerchandiseUseCases,
    LegalClientMerchandiseResolver,
  ],
})
export class LegalClientMerchandiseModule {}
