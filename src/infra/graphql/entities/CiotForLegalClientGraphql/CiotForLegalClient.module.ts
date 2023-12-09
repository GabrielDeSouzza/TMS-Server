import { Module } from '@nestjs/common';

import { CiotForLegalClientRepository } from 'domain/repositories/CiotForLegalClient.repository';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { CiotForLegalClientPrismaService } from 'infra/database/prisma/services/CiotForLegalClient.service';
import { LegalClientPrismaService } from 'infra/database/prisma/services/legal-client.service';
import { UserService } from 'infra/database/prisma/services/user.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { CiotForLegalClientResolver } from './CiotForLegalClient.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: CiotForLegalClientRepository,
      useClass: CiotForLegalClientPrismaService,
    },
    { provide: UserRepository, useClass: UserService },
    { provide: LegalContractRepository, useClass: LegalClientPrismaService },
    CiotForLegalClientResolver,
  ],
})
export class CiotForLegalClientModule {}
