import { Injectable } from '@nestjs/common';

import { type OutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';
import { type OutsourcedTransportVehicleRepository } from 'domain/repositories/OutsourcedTransportVehicle.repository';

import { PrismaService } from '../prisma.service';
import { OutsourcedTransportVehiclePrismaDTO } from './prismaDTO/OutsourcedTransportVehiclePrismaDto';

@Injectable()
export class OutsourcedTransportVehiclePrismaService
  implements OutsourcedTransportVehicleRepository
{
  constructor(private prisma: PrismaService) {}
  async findOutsourcedTransportVehicleById(
    id: string,
  ): Promise<OutsourcedTransportVehicle> {
    const outsourcedTransportVehicle =
      await this.prisma.outsourcedTransportVehicle.findFirstOrThrow({
        where: { id },
      });

    return OutsourcedTransportVehiclePrismaDTO.PrismaToEntity(
      outsourcedTransportVehicle,
    );
  }
  async createOutsourcedTransportVehicle(
    outsourcedTransportVehicle: OutsourcedTransportVehicle,
    vehicle: Vehicle,
  ): Promise<OutsourcedTransportVehicle> {
    const outsourcedTransportVehiclePrisma =
      await this.prisma.outsourcedTransportVehicle.create({
        data: OutsourcedTransportVehiclePrismaDTO.EntityToCreatePrisma(
          outsourcedTransportVehicle,
          vehicle,
        ),
      });

    return OutsourcedTransportVehiclePrismaDTO.PrismaToEntity(
      outsourcedTransportVehiclePrisma,
    );
  }
  async updateOutsourcedTransportVehicle(
    id: string,
    outsourcedTransportVehicle?: OutsourcedTransportVehicle,
    vehicle?: Vehicle,
  ): Promise<OutsourcedTransportVehicle> {
    console.error('test', vehicle.year);
    const outsourcedTransportVehiclePrisma =
      await this.prisma.outsourcedTransportVehicle.update({
        data: OutsourcedTransportVehiclePrismaDTO.EntityToPrismaUpdate(
          outsourcedTransportVehicle,
          vehicle,
        ),
        where: { id },
      });

    return OutsourcedTransportVehiclePrismaDTO.PrismaToEntity(
      outsourcedTransportVehiclePrisma,
    );
  }

  async getAllOutsourcedTransportVehicle(): Promise<
    OutsourcedTransportVehicle[]
  > {
    const outsourcedTransportVehicles =
      await this.prisma.outsourcedTransportVehicle.findMany();

    return outsourcedTransportVehicles.map(outsourcedTransportVehicle =>
      OutsourcedTransportVehiclePrismaDTO.PrismaToEntity(
        outsourcedTransportVehicle,
      ),
    );
  }
}
