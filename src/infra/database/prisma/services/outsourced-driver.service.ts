import { Injectable } from '@nestjs/common';

import { type ContractOutsourcedDriver } from 'domain/entities/driverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { type OutsourcedDriver } from 'domain/entities/driverEntities/outsourcedDriver/OutsourcedDriver';
import { type NaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';
import { type OutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type Vehicle } from 'domain/entities/vehicle/vehicle/Vehicle';
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
