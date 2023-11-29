import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { VehicleBodyworkService } from 'infra/database/prisma/services/vehicle-bodywork.service';

import { UserRepository } from '../../../../domain/repositories/UserRepository';
import { UserService } from '../../../database/prisma/services/user.service';
import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { VehicleBodyworkResolver } from './vehicle-bodywork.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    PrismaService,
    { provide: VehicleBodyworkRepository, useClass: VehicleBodyworkService },
    { provide: UserRepository, useClass: UserService },

    VehicleBodyworkResolver,
  ],
})
export class VehicleBodyworkModule {}
