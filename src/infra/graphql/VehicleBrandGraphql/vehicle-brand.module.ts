import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { UserService } from 'infra/database/prisma/services/user.service';
import { VehicleBrandService } from 'infra/database/prisma/services/vehicle-brand.service';

import { VehicleBrandResolver } from './vehicle-brand.resolver';

@Module({
  providers: [
    { provide: VehicleBrandRepository, useClass: VehicleBrandService },
    { provide: UserRepository, useClass: UserService },
    PrismaService,
    VehicleBrandResolver,
  ],
})
export class VehicleBrandModule {}
