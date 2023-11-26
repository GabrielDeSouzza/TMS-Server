import { Module } from '@nestjs/common';

import { LegalClientRepository } from 'domain/repositories/LegalClientRepositoy';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { LegalClientPrismaService } from 'infra/database/prisma/services/legal-client.service';
import { LegalPersonPrismaService } from 'infra/database/prisma/services/legal-person.service';
import { UserService } from 'infra/database/prisma/services/user.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { LegalClientResolver } from './LegalClient.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: LegalClientRepository,
      useClass: LegalClientPrismaService,
    },
    { provide: UserRepository, useClass: UserService },
    { provide: LegalPersonRepository, useClass: LegalPersonPrismaService },
    LegalClientResolver,
  ],
})
export class LegalClientModule {}
