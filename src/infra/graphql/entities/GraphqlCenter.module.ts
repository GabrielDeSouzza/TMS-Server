import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'infra/database/prisma/prisma.service';

@Module({
  providers: [JwtService, PrismaService],
  exports: [JwtService, PrismaService],
})
export class GraphqlCenterModule {}
