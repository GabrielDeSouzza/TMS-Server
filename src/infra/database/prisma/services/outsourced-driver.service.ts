import { Injectable } from '@nestjs/common';

import { type IContractOutsourcedDriver } from 'domain/entities/driverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import {
  type OutsourcedDriver,
  type IOutsourcedDriver,
} from 'domain/entities/driverEntities/outsourcedDriver/OutsourcedDriver';
import { type INaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';
import { type IOutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';
import { type OutsourcedDriverRepository } from 'domain/repositories/OutsourcedDriverRepository';

import { PrismaService } from '../prisma.service';
import { OutsourcedDriverPrismaDTO } from './prismaDTO/OutsouredDriverPrismaDto';

@Injectable()
export class OutsourcedDriverPrismaService
  implements OutsourcedDriverRepository
{
  constructor(private prisma: PrismaService) {}
  async findOutsourcedDriver(id: string): Promise<OutsourcedDriver> {
    return OutsourcedDriverPrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedDriver.findFirstOrThrow({ where: { id } }),
    );
  }
  async createOutsourcedDriver(
    outsourcedDriver: IOutsourcedDriver,
    naturalPerson: INaturalPerson,
    contractOutsourced: IContractOutsourcedDriver,
    outsourcedVehicle: IOutsourcedVehicle,
    vehicle?: IVehicle,
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
  async updateOutsourcedDriver(
    id: string,
    outsourcedDriver: IOutsourcedDriver,
    naturalPerson: INaturalPerson,
    contractOutsourced: IContractOutsourcedDriver,
    outsourcedVehicle: IOutsourcedVehicle,
    vehicle?: IVehicle,
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
