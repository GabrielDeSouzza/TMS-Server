import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthRepository } from 'domain/repositories/AuthRepository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { PrismaUserRepository } from 'infra/database/prisma/repositories/PrismaUserRepository';

import { PrismaAuthRepository } from './prisma/repositories/PrismaAuthRepository';

@Module({
  providers: [
    PrismaService,
    JwtService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
  ],
  exports: [UserRepository, AuthRepository],
})
export class DatabaseModule {}
