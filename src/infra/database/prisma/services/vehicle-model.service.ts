import { Injectable } from '@nestjs/common';

import { type VehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';
import {
  type VehicleModel,
  type IVehicleModel,
} from 'domain/entities/vehicle/vehicleModel/VehicleModel';
import { type VehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';
import { type VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBrandPrismaDTO } from './prismaDTO/VehicleBrandPrismaDto';
import { VehicleModelPrismaDTO } from './prismaDTO/VehicleModelPrismaDto';
import { VehicleTypePrismaDTO } from './prismaDTO/VehicleTypePrismaDto.ts';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class VehicleModelService implements VehicleModelRepository {
  constructor(private prisma: PrismaService) {}

  async findVehicleModelById(id: string): Promise<VehicleModel> {
    const vehicleModelPrisma = await this.prisma.vehicleModel.findFirstOrThrow({
      where: { id },
    });

    return VehicleModelPrismaDTO.PrismaToEntity(vehicleModelPrisma);
  }
  async createVehicleModel(vehicleModel: IVehicleModel): Promise<VehicleModel> {
    const createdModel = await this.prisma.vehicleModel.create({
      data: VehicleModelPrismaDTO.EntityToPrisma(vehicleModel),
    });

    return VehicleModelPrismaDTO.PrismaToEntity(createdModel);
  }
  async updateVehicleModel(
    id: string,
    vehicleModel: IVehicleModel,
  ): Promise<VehicleModel> {
    const vehicleModelPrisma = await this.prisma.vehicleModel.update({
      data: VehicleModelPrismaDTO.EntityToPrismaUpdate(vehicleModel),
      where: { id },
    });

    return VehicleModelPrismaDTO.PrismaToEntity(vehicleModelPrisma);
  }
  async getAllVehicleModel(): Promise<VehicleModel[]> {
    const models = await this.prisma.vehicleModel.findMany();

    return models.map(model => VehicleModelPrismaDTO.PrismaToEntity(model));
  }
  async findOnlyVehicleType(modelId: string): Promise<VehicleType> {
    const type = await this.prisma.vehicleModel.findFirstOrThrow({
      where: { id: modelId },
      select: { VehicleType: true },
    });

    return VehicleTypePrismaDTO.PrismaToEntity(type.VehicleType);
  }
  async findOnlyVehicleBrand(modelId: string): Promise<VehicleBrand> {
    const type = await this.prisma.vehicleModel.findFirstOrThrow({
      where: { id: modelId },
      select: { Brand: true },
    });

    return VehicleBrandPrismaDTO.PrismaToEntity(type.Brand);
  }
}
