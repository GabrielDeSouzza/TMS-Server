import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from 'domain/repositories/UserRepository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { UserPrismaService } from 'infra/database/prisma/services/user.service';

@Module({
  providers: [
    JwtService,
    PrismaService,
    { provide: UserRepository, useClass: UserPrismaService },
    UserUseCases,
  ],
  exports: [JwtService, PrismaService, UserUseCases],
})
export class GraphqlCenterModule {}
