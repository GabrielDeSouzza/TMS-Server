import { Module } from '@nestjs/common';

import { OutsourcedTransportVehicleRepository } from 'domain/repositories/OutsourcedTransportVehicle.repository';

import { OutsourcedTransportCompanyVehicleUseCases } from 'app/useCases/OutsourcedTransportCompanyVehicleUseCases/OutsourcedTransportCompanyVehicleUseCases';

import { OutsourcedTransportVehiclePrismaService } from 'infra/database/prisma/services/OutsourcedTransportVehicle.service';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { OutsourcedTransportCompanyModule } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.module';
import { VehicleModule } from '../VehicleGraphql/Vehicle.module';
import { OutsourcedTransportVehicleResolver } from './OutsourcedTransportVehicle.resolver';

@Module({
  imports: [
    GraphqlCenterModule,
    OutsourcedTransportCompanyModule,
    VehicleModule,
  ],
  providers: [
    {
      provide: OutsourcedTransportVehicleRepository,
      useClass: OutsourcedTransportVehiclePrismaService,
    },
    OutsourcedTransportVehicleResolver,
    OutsourcedTransportCompanyVehicleUseCases,
  ],
})
export class OutsourcedTransportVehicleModule {}
