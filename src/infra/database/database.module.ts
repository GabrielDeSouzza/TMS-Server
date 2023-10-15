import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthRepository } from 'domain/repositories/AuthRepository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { PrismaService } from './prisma/prisma.service';
import { AuthServicePrisma } from './prisma/services/auth.service';
import { UserService } from './prisma/services/user.service';

@Module({
  providers: [
    PrismaService,
    JwtService,
    {
      provide: UserRepository,
      useClass: UserService,
    },
    {
      provide: AuthRepository,
      useClass: AuthServicePrisma,
    },
  ],
  exports: [UserRepository, AuthRepository],
})
export class DatabaseModule {}
