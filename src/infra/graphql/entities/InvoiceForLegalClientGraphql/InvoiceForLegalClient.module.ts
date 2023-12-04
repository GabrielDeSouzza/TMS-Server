import { Module } from '@nestjs/common';

import { InvoiceForLegalClientRepository } from 'domain/repositories/InvoiceForLegalClient.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { InvoiceForLegalClientPrismaService } from 'infra/database/prisma/services/InvoiceForLegalClient.service';
import { LegalClientOrderPrismaService } from 'infra/database/prisma/services/LegalClientOrder.service';
import { UserService } from 'infra/database/prisma/services/user.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { InvoiceForLegalClientResolver } from './InvoiceForLegalClient.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: InvoiceForLegalClientRepository,
      useClass: InvoiceForLegalClientPrismaService,
    },
    { provide: UserRepository, useClass: UserService },
    {
      provide: LegalClientOrderRepository,
      useClass: LegalClientOrderPrismaService,
    },
    InvoiceForLegalClientResolver,
  ],
})
export class InvoiceForLegalClientModule {}
