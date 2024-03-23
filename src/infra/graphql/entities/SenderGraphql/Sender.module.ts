import { Module } from '@nestjs/common';

import { SenderRepository } from 'domain/repositories/SenderRepository';

import { SenderUseCases } from 'app/useCases/SenderUseCase /SenderUseCases';

import { SenderPrismaService } from 'infra/database/prisma/services/Sender.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalPersonModule } from '../LegalPersonGraphql/LegalPerson.module';
import { NaturalPersonModule } from '../NaturalPersonGraphql/NaturalPerson.module';
import { SenderResolver } from './Sender.resolver';

@Module({
  providers: [
    { provide: SenderRepository, useClass: SenderPrismaService },
    SenderUseCases,
    SenderResolver,
  ],
  imports: [GraphqlCenterModule, NaturalPersonModule, LegalPersonModule],
  exports: [SenderUseCases],
})
export class SenderModule {}
