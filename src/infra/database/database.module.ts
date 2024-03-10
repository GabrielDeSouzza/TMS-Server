import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthRepository } from 'domain/repositories/AuthRepository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { ServicesModule } from 'infra/services/services.module';

import { PrismaService } from './prisma/prisma.service';
import { AuthServicePrisma } from './prisma/services/auth.service';
import { UserPrismaService } from './prisma/services/user.service';

@Module({
  imports: [ServicesModule],
  providers: [
    PrismaService,
    JwtService,
    ServicesModule,
    {
      provide: UserRepository,
      useClass: UserPrismaService,
    },
    {
      provide: AuthRepository,
      useClass: AuthServicePrisma,
    },
    UserUseCases,
  ],
  exports: [AuthRepository, UserUseCases],
})
export class DatabaseModule {}
