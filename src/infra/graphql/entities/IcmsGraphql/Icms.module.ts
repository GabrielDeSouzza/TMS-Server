import { Module } from '@nestjs/common';

import { IcmsRepository } from 'domain/repositories/IcmsRepository';

import { IcmsUseCases } from 'app/useCases/IcmsUseCase/IcmsUseCases';

import { IcmsPrismaService } from 'infra/database/prisma/services/Icms.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { IcmsResolver } from './Icms.resolver';

@Module({
  providers: [
    { provide: IcmsRepository, useClass: IcmsPrismaService },
    IcmsUseCases,
    IcmsResolver,
  ],
  imports: [GraphqlCenterModule],
  exports: [IcmsUseCases],
})
export class IcmsModule {}
