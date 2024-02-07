import { Injectable } from '@nestjs/common';

import { type GetVehicleDto } from 'domain/dto/repositories/getDataDtos/GetVehicleDto';
import { type ValidadeVehicle } from 'domain/dto/repositories/whereDtos/CompanyVehicleRepositoryDto';
import { type FindAllVehicleWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleRepositoryDto';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';
import { type VehicleRepository } from 'domain/repositories/VehicleRepository';

import { PrismaService } from '../prisma.service';
import { VehiclePrismaDto } from './prismaDTO/VehiclePrismaDto';

@Injectable()
export class VehicleService implements VehicleRepository {
  async findVehicle(request: GetVehicleDto): Promise<Vehicle> {
    const vehiclePrisma = await this.prisma.vehicle.findFirstOrThrow({
      where: { OR: [{ id: request.vehicleId }, { plate: request.plate }] },
    });

    return VehiclePrismaDto.PrismaToEntity(vehiclePrisma);
  }

  async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
    const vehiclePrisma = await this.prisma.vehicle.create({
      data: VehiclePrismaDto.EntityToPrisma(vehicle),
    });

    return VehiclePrismaDto.PrismaToEntity(vehiclePrisma);
  }
  async updateVehicle(id: string, vehicle: Vehicle): Promise<Vehicle> {
    const vehiclePrisma = await this.prisma.vehicle.update({
      data: VehiclePrismaDto.EntityToPrismaUpdate(vehicle),
      where: { id },
    });

    return VehiclePrismaDto.PrismaToEntity(vehiclePrisma);
  }
  async getAllVehicle(
    parameters: FindAllVehicleWhereRequestDTO,
  ): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicle.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return vehicles.map(vehicle => VehiclePrismaDto.PrismaToEntity(vehicle));
  }

  constructor(private prisma: PrismaService) {}
  async validadeVehicle(data: ValidadeVehicle): Promise<Vehicle> {
    return VehiclePrismaDto.PrismaToEntity(
      await this.prisma.vehicle.findFirst({
        where: { OR: [{ plate: data.plate }, { renavam: data.renavam }] },
      }),
    );
  }
}
