import { Module } from '@nestjs/common';

import { LegalClientMerchandiseRepository } from 'domain/repositories/LegalClientMerchandise.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';

import { LegalClientMerchandisePrismaService } from 'infra/database/prisma/services/LegalClientMerchandise.service';
import { LegalClientOrderPrismaService } from 'infra/database/prisma/services/LegalClientOrder.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientMerchandiseResolver } from './LegalClientMerchandise.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: LegalClientMerchandiseRepository,
      useClass: LegalClientMerchandisePrismaService,
    },
    {
      provide: LegalClientOrderRepository,
      useClass: LegalClientOrderPrismaService,
    },
    LegalClientMerchandiseResolver,
  ],
})
export class LegalClientMerchandiseModule {}
