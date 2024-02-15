import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { OwnDriverRepository } from 'domain/repositories/OwnDriverRepository';

import { OwnDriverUseCases } from 'app/useCases/OwnDriverUseCases/OwnDriverUseCases';

import { OwnDriverService } from 'infra/database/prisma/services/own-driver.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { NaturalPersonModule } from '../NaturalPersonGraphql/NaturalPerson.module';
import { OwnDriverResolver } from './OwnDriver.resolver';

@Module({
  providers: [
    { provide: OwnDriverRepository, useClass: OwnDriverService },
    OwnDriverResolver,
    OwnDriverUseCases,
  ],
  imports: [GraphqlCenterModule, NaturalPersonModule],
  exports: [OwnDriverUseCases],
})
export class OwnDriverModule {}
