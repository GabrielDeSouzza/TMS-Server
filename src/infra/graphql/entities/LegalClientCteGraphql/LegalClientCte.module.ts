import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { LegalClientCteRepository } from 'domain/repositories/LegalClientCteRepository';

import { LegalClientCteUseCase } from 'app/useCases/LegalClientCteUseCase/LegalClientCteUseCase';

import { LegalClientCtePrismaService } from 'infra/database/prisma/services/LegalClientCte.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientOrderModule } from '../LegalClientOrderGraphql/LegalClientOrder.module';
import { LegalClientCteResolver } from './LegalClientCte.resolver';

@Module({
  providers: [
    {
      provide: LegalClientCteRepository,
      useClass: LegalClientCtePrismaService,
    },
    LegalClientCteUseCase,
    LegalClientCteResolver,
  ],
  exports: [LegalClientCteUseCase],
  imports: [GraphqlCenterModule, LegalClientOrderModule],
})
export class LegalClientCteModule {}
