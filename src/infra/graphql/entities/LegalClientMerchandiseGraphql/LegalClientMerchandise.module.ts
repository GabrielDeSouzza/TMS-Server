import { Module } from '@nestjs/common';

import { LegalClientMerchandiseRepository } from 'domain/repositories/LegalClientMerchandise.repository';

import { LegalClientMerchandiseUseCases } from 'app/useCases/LegalClientMerchandiseDto/LegalClientMerchandisesUseCases';

import { LegalClientMerchandisePrismaService } from 'infra/database/prisma/services/LegalClientMerchandise.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { InvoiceForLegalClientModule } from '../InvoiceForLegalClientGraphql/InvoiceForLegalClient.module';
import { LegalClientOrderModule } from '../LegalClientOrderGraphql/LegalClientOrder.module';
import { LegalClientMerchandiseResolver } from './LegalClientMerchandise.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    LegalClientOrderModule,
    InvoiceForLegalClientModule,
  ],
  providers: [
    {
      provide: LegalClientMerchandiseRepository,
      useClass: LegalClientMerchandisePrismaService,
    },
    LegalClientMerchandiseUseCases,
    LegalClientMerchandiseResolver,
  ],
  exports: [LegalClientMerchandiseUseCases],
})
export class LegalClientMerchandiseModule {}
