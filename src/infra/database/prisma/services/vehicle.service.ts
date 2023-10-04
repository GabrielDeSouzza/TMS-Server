import { Injectable } from '@nestjs/common';

import {
  type Vehicle,
  type IVehicle,
} from 'domain/entities/vehicle/vehicle/Vehicle';
import { type VehicleRepository } from 'domain/repositories/VehicleRepository';

import { PrismaService } from '../prisma.service';
import { VehicleDto } from './prismaDTO/VehiclePrismaDto';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class VehicleService implements VehicleRepository {
  constructor(private prisma: PrismaService) {}

  async findVehicleById(id?: string, plate?: string): Promise<Vehicle> {
    const vehiclePrisma = await this.prisma.vehicle.findFirstOrThrow({
      where: { OR: [{ id }, { plate: plate || undefined }] },
    });

    return VehicleDto.PrismaToEntity(vehiclePrisma);
  }

  async createVehicle(vehicleBrand: IVehicle): Promise<Vehicle> {
    const vehiclePrisma = await this.prisma.vehicle.create({
      data: VehicleDto.EntityToPrisma(vehicleBrand),
    });

    return VehicleDto.PrismaToEntity(vehiclePrisma);
  }
  async updateVehicle(
    id: string,
    vehicleBrand: Partial<IVehicle>,
  ): Promise<Vehicle> {
    const vehiclePrisma = await this.prisma.vehicle.update({
      data: VehicleDto.EntityToPrismaUpdate(vehicleBrand),
      where: { id },
    });

    return VehicleDto.PrismaToEntity(vehiclePrisma);
  }
  async getAllVehicle(): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicle.findMany();

    return vehicles.map(vehicle => VehicleDto.PrismaToEntity(vehicle));
  }
}
