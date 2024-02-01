import { Module } from '@nestjs/common';

import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';
import { OutsourcedTransportVehicleRepository } from 'domain/repositories/OutsourcedTransportVehicle.repository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { OutsourcedTransportCompanyPrismaService } from 'infra/database/prisma/services/OutsourcedTransportCompany.service';
import { OutsourcedTransportVehiclePrismaService } from 'infra/database/prisma/services/OutsourcedTransportVehicle.service';
import { VehicleService } from 'infra/database/prisma/services/vehicle.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { OutsourcedTransportVehicleResolver } from './OutsourcedTransportVehicle.resolver';

@Module({
  imports: [GraphqlCenterModule],
  providers: [
    {
      provide: OutsourcedTransportVehicleRepository,
      useClass: OutsourcedTransportVehiclePrismaService,
    },
    {
      provide: OutsourcedTransportCompanyRepository,
      useClass: OutsourcedTransportCompanyPrismaService,
    },
    { provide: VehicleRepository, useClass: VehicleService },
    OutsourcedTransportVehicleResolver,
  ],
})
export class OutsourcedTransportVehicleModule {}
