import { Injectable } from '@nestjs/common';

import { type OutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type Vehicle } from 'domain/entities/vehicle/vehicle/Vehicle';
import { type OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedVehicleRepository';

import { PrismaService } from '../prisma.service';
import { OutsourcedVehiclePrismaDTO } from './prismaDTO/OwnsourcedVehiclePrisma.Dto';

@Injectable()
export class OutsourcedVehicleServicePrisma
  implements OutsourcedVehicleRepository
{
  constructor(private prisma: PrismaService) {}

  async findOutsourcedVehicle(id: string): Promise<OutsourcedVehicle> {
    return OutsourcedVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedVehicle.findFirstOrThrow({ where: { id } }),
    );
  }
  async createOutsourcedVehicle(
    outsourcedVehicle: OutsourcedVehicle,
    vehicle: Vehicle,
  ): Promise<OutsourcedVehicle> {
    return OutsourcedVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedVehicle.create({
        data: OutsourcedVehiclePrismaDTO.EntityToCreatePrisma(
          outsourcedVehicle,
          vehicle,
        ),
      }),
    );
  }
  async updateOutsourcedVehicle(
    id: string,
    outsourcedVehicle: OutsourcedVehicle,
    vehicle: Vehicle,
  ): Promise<OutsourcedVehicle> {
    return OutsourcedVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedVehicle.update({
        data: OutsourcedVehiclePrismaDTO.EntityToPrismaUpdate(
          outsourcedVehicle,
          vehicle,
        ),
        where: { id },
      }),
    );
  }
  async findAllOutsourcedVehicle(): Promise<OutsourcedVehicle[]> {
    const outsourcedVehiclePrisma =
      await this.prisma.outsourcedVehicle.findMany();

    return outsourcedVehiclePrisma.map(out =>
      OutsourcedVehiclePrismaDTO.PrismaToEntity(out),
    );
  }
}
