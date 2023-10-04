import { Injectable } from '@nestjs/common';

import {
  type VehicleBodywork,
  type IVehicleBodywork,
} from 'domain/entities/vehicle/vehicleBodywork/VehicleBodywork';
import { type VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBodyworkPrismaDto } from './prismaDTO/VehicleBodyworkPrismaDto';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class VehicleBodyworkService implements VehicleBodyworkRepository {
  constructor(private prisma: PrismaService) {}
  async findVehicleBodyworkById(id: string): Promise<VehicleBodywork> {
    return VehicleBodyworkPrismaDto.PrismaToEntity(
      await this.prisma.vehicleBodywork.findFirstOrThrow({
        where: { id },
      }),
    );
  }
  async createVehicleBodywork(
    vehicleBodywork: IVehicleBodywork,
  ): Promise<VehicleBodywork> {
    const bodyworkPrisma = await this.prisma.vehicleBodywork.create({
      data: VehicleBodyworkPrismaDto.EntityToPrisma(vehicleBodywork),
    });

    return VehicleBodyworkPrismaDto.PrismaToEntity(bodyworkPrisma);
  }
  async updateVehicleBodywork(
    id: string,
    vehicleBodywork: IVehicleBodywork,
  ): Promise<VehicleBodywork> {
    const bodyworkPrisma = await this.prisma.vehicleBodywork.update({
      data: VehicleBodyworkPrismaDto.EntityToPrismaUpdate(vehicleBodywork),
      where: { id },
    });

    return VehicleBodyworkPrismaDto.PrismaToEntity(bodyworkPrisma);
  }
  async getAllVehicleBodywork(): Promise<VehicleBodywork[]> {
    const bodyworks = await this.prisma.vehicleBodywork.findMany();

    return bodyworks.map(bodywork =>
      VehicleBodyworkPrismaDto.PrismaToEntity(bodywork),
    );
  }
}
