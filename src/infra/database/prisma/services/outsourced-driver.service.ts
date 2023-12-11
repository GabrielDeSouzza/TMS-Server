import { Injectable } from '@nestjs/common';

import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type ContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { type OutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/outsourcedDriver/OutsourcedDriver';
import { type OutsourcedVehicle } from 'domain/entities/OutsourcedDriverEntities/outsourcedVehicle/OutsourcedVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';
import { type OutsourcedDriverRepository } from 'domain/repositories/OutsourcedDriverRepository';

import { PrismaService } from '../prisma.service';
import { OutsourcedDriverPrismaDTO } from './prismaDTO/OutsouredDriverPrismaDto';

@Injectable()
export class OutsourcedDriverPrismaService
  implements OutsourcedDriverRepository
{
  constructor(private prisma: PrismaService) {}
  async createOutsourcedDriver(
    outsourcedDriver: OutsourcedDriver,
    naturalPerson: NaturalPerson,
    contractOutsourced: ContractOutsourcedDriver,
    outsourcedVehicle: OutsourcedVehicle,
    vehicle?: Vehicle,
  ): Promise<OutsourcedDriver> {
    return OutsourcedDriverPrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedDriver.create({
        data: OutsourcedDriverPrismaDTO.EntityToCreatePrisma(
          outsourcedDriver,
          naturalPerson,
          contractOutsourced,
          outsourcedVehicle,
          vehicle,
        ),
      }),
    );
  }
  async findOutsourcedDriver(id: string): Promise<OutsourcedDriver> {
    return OutsourcedDriverPrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedDriver.findFirstOrThrow({ where: { id } }),
    );
  }

  async updateOutsourcedDriver(
    id: string,
    outsourcedDriver: OutsourcedDriver,
    naturalPerson: NaturalPerson,
    contractOutsourced: ContractOutsourcedDriver,
    outsourcedVehicle: OutsourcedVehicle,
    vehicle?: Vehicle,
  ): Promise<OutsourcedDriver> {
    return OutsourcedDriverPrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedDriver.update({
        data: OutsourcedDriverPrismaDTO.EntityToPrismaUpdate(
          outsourcedDriver,
          naturalPerson,
          contractOutsourced,
          outsourcedVehicle,
          vehicle,
        ),
        where: { id },
      }),
    );
  }
  async findAllOutsourcedDriver(): Promise<OutsourcedDriver[]> {
    const outsourcedDrivesPrisma =
      await this.prisma.outsourcedDriver.findMany();

    return outsourcedDrivesPrisma.map(outDriver =>
      OutsourcedDriverPrismaDTO.PrismaToEntity(outDriver),
    );
  }
}
