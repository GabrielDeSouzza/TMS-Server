import { Injectable } from '@nestjs/common';

import { type GetVehicleBodyWorkDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleBodWorkDto';
import { type GetVehicleTypeDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleTypeDto';
import { type FindAllVehicleBodyworkWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleBodyworkRepositoryDto';
import { type VehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';
import { type VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBodyworkPrismaDto } from './prismaDTO/VehicleBodyworkPrismaDto';

@Injectable()
export class VehicleBodyworkService implements VehicleBodyworkRepository {
  constructor(private prisma: PrismaService) {}
  async getAllVehicleBodyworkByType(
    vehicleType: GetVehicleTypeDTO,
  ): Promise<VehicleBodywork[]> {
    const bodyworks = await this.prisma.vehicleBodywork.findMany({
      where: {
        VehicleType: {
          some: { OR: [{ id: vehicleType.id }, { name: vehicleType.name }] },
        },
      },
    });

    return bodyworks.map(bodywork =>
      VehicleBodyworkPrismaDto.PrismaToEntity(bodywork),
    );
  }
  async findVehicleBodywork(
    request: GetVehicleBodyWorkDTO,
  ): Promise<VehicleBodywork> {
    return VehicleBodyworkPrismaDto.PrismaToEntity(
      await this.prisma.vehicleBodywork.findFirst({
        where: { OR: [{ id: request.id }, { name: request.name }] },
      }),
    );
  }
  async createVehicleBodywork(
    vehicleBodywork: VehicleBodywork,
  ): Promise<VehicleBodywork> {
    const bodyworkPrisma = await this.prisma.vehicleBodywork.create({
      data: VehicleBodyworkPrismaDto.EntityToPrisma(vehicleBodywork),
    });

    return VehicleBodyworkPrismaDto.PrismaToEntity(bodyworkPrisma);
  }
  async updateVehicleBodywork(
    id: string,
    vehicleBodywork: VehicleBodywork,
  ): Promise<VehicleBodywork> {
    const bodyworkPrisma = await this.prisma.vehicleBodywork.update({
      data: VehicleBodyworkPrismaDto.EntityToPrismaUpdate(vehicleBodywork),
      where: { id },
    });

    return VehicleBodyworkPrismaDto.PrismaToEntity(bodyworkPrisma);
  }
  async getAllVehicleBodywork(
    parameters: FindAllVehicleBodyworkWhereRequestDTO,
  ): Promise<VehicleBodywork[]> {
    const bodyworks = await this.prisma.vehicleBodywork.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return bodyworks.map(bodywork =>
      VehicleBodyworkPrismaDto.PrismaToEntity(bodywork),
    );
  }
}
