import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'infra/database/prisma/prisma.service';

import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserService } from '../../database/prisma/services/user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [
    JwtService,
    UserResolver,
    { provide: UserRepository, useClass: UserService },
    PrismaService,
  ],
})
export class UserModule {}
