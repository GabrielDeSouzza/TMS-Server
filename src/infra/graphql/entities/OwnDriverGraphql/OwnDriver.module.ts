import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';
import { OwnDriverRepository } from 'domain/repositories/OwnDriverRepository';

import { NaturalPersonPrismaService } from 'infra/database/prisma/services/natural-person.service';
import { OwnDriverService } from 'infra/database/prisma/services/own-driver.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { OwnDriverResolver } from './OwnDriver.resolver';

@Module({
  providers: [
    { provide: OwnDriverRepository, useClass: OwnDriverService },
    { provide: NaturalPersonRepository, useClass: NaturalPersonPrismaService },
    OwnDriverResolver,
  ],
  imports: [GraphqlCenterModule],
})
export class OwnDriverModule {}
