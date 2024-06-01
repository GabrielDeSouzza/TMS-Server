import { Module } from '@nestjs/common';

import { ManifestRepository } from 'domain/repositories/ManifestRepository';

import { ManifestUseCases } from 'app/useCases/ManifestUseCases/ManifestUseCases';

import { ManifestPrismaService } from 'infra/database/prisma/services/Manifest.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { ManifestResolver } from './Manifest.resolver';

@Module({
  providers: [
    {
      provide: ManifestRepository,
      useClass: ManifestPrismaService,
    },
    ManifestResolver,
    ManifestUseCases,
  ],
  imports: [GraphqlCenterModule],
})
export class ManifestModule {}
