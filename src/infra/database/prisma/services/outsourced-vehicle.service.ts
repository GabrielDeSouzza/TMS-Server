import { Injectable } from '@nestjs/common';

import { type OutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';
import { type OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedRepository';

import { PrismaService } from '../prisma.service';
import { OutsourcedVehiclePrismaDTO } from './prismaDTO/OwnsourcedVehiclePrisma.Dto';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
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
    outsourcedVehicle: Omit<OutsourcedVehicle, 'id'>,
    vehicle: IVehicle,
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
    outsourcedVehicle: Partial<OutsourcedVehicle>,
    vehicle: Partial<IVehicle>,
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
