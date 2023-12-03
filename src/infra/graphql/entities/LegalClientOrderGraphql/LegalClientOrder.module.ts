import { Module } from '@nestjs/common';

import { LegalClientMerchandiseRepository } from 'domain/repositories/LegalClientMerchandise.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { LegalClientMerchandisePrismaService } from 'infra/database/prisma/services/LegalClientMerchandise.service';
import { LegalClientOrderPrismaService } from 'infra/database/prisma/services/LegalClientOrder.service';
import { LegalContractPrismaService } from 'infra/database/prisma/services/LegalContract.service';
import { UserService } from 'infra/database/prisma/services/user.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientOrderResolver } from './LegalClientOrder.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: LegalClientOrderRepository,
      useClass: LegalClientOrderPrismaService,
    },
    { provide: UserRepository, useClass: UserService },
    { provide: LegalContractRepository, useClass: LegalContractPrismaService },
    {
      provide: LegalClientMerchandiseRepository,
      useClass: LegalClientMerchandisePrismaService,
    },
    LegalClientOrderResolver,
  ],
})
export class LegalClientOrderModule {}
