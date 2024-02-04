import { Injectable } from '@nestjs/common';

import { type FindAllVehicleTypeWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleTypeRepositoryDto';
import { type VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';
import { type VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from '../prisma.service';
import { VehicleTypePrismaDTO } from './prismaDTO/VehicleTypePrismaDto.ts';

@Injectable()
export class VehicleTypeService implements VehicleTypeRepository {
  constructor(private prisma: PrismaService) {}
  async findVehicleTypeById(id: string): Promise<VehicleType> {
    const vehicleTypePrisma = await this.prisma.vehicleType.findFirstOrThrow({
      where: { id },
    });
    const vehicleType = VehicleTypePrismaDTO.PrismaToEntity(vehicleTypePrisma);

    return vehicleType;
  }
  async createVehicleType(vehicleType: VehicleType): Promise<VehicleType> {
    const prismaVehicleType = await this.prisma.vehicleType.create({
      data: VehicleTypePrismaDTO.EntityToPrisma(vehicleType),
    });

    return VehicleTypePrismaDTO.PrismaToEntity(prismaVehicleType);
  }
  async updateVehicleType(
    id: string,
    vehicleType: VehicleType,
  ): Promise<VehicleType> {
    console.log(id);
    const updatedType = await this.prisma.vehicleType.update({
      data: VehicleTypePrismaDTO.EntityToPrismaUpdate(vehicleType),
      where: { id },
    });

    return VehicleTypePrismaDTO.PrismaToEntity(updatedType);
  }
  async getAllVehicleType(
    parameters: FindAllVehicleTypeWhereRequestDTO,
  ): Promise<VehicleType[]> {
    const vehicleTypes = await this.prisma.vehicleType.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
    });

    return vehicleTypes.map(vehicleType =>
      VehicleTypePrismaDTO.PrismaToEntity(vehicleType),
    );
  }
}
