import { Injectable } from '@nestjs/common';

import { type FindAllVehicleBodyworkWhereRequestDTO } from 'domain/dto/repositories/VehicleBodyworkRepositoryDto';
import { type VehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';
import { type VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBodyworkPrismaDto } from './prismaDTO/VehicleBodyworkPrismaDto';

@Injectable()
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
