import { Injectable } from '@nestjs/common';

import { type GetVehicleModel } from 'domain/dto/repositories/getDataDtos/GetVehicleModelDto';
import { type FindAllVehicleModelWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleModelRepositoryDto';
import { type VehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';
import { type VehicleModel } from 'domain/entities/VehicleEntities/vehicleModel/VehicleModel';
import { type VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';
import { type VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBrandPrismaDTO } from './prismaDTO/VehicleBrandPrismaDto';
import { VehicleModelPrismaDTO } from './prismaDTO/VehicleModelPrismaDto';
import { VehicleTypePrismaDTO } from './prismaDTO/VehicleTypePrismaDto.ts';

@Injectable()
export class VehicleModelService implements VehicleModelRepository {
  constructor(private prisma: PrismaService) {}

  async findVehicleModel(request: GetVehicleModel): Promise<VehicleModel> {
    const vehicleModelPrisma = await this.prisma.vehicleModel.findFirstOrThrow({
      where: { OR: [{ id: request.id }, { name: request.name }] },
    });

    return VehicleModelPrismaDTO.PrismaToEntity(vehicleModelPrisma);
  }
  async createVehicleModel(vehicleModel: VehicleModel): Promise<VehicleModel> {
    const createdModel = await this.prisma.vehicleModel.create({
      data: VehicleModelPrismaDTO.EntityToPrisma(vehicleModel),
    });

    return VehicleModelPrismaDTO.PrismaToEntity(createdModel);
  }
  async updateVehicleModel(
    id: string,
    vehicleModel: VehicleModel,
  ): Promise<VehicleModel> {
    const vehicleModelPrisma = await this.prisma.vehicleModel.update({
      data: VehicleModelPrismaDTO.EntityToPrismaUpdate(vehicleModel),
      where: { id },
    });

    return VehicleModelPrismaDTO.PrismaToEntity(vehicleModelPrisma);
  }
  async getAllVehicleModel(
    parameters: FindAllVehicleModelWhereRequestDTO,
  ): Promise<VehicleModel[]> {
    const models = await this.prisma.vehicleModel.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return models.map(model => VehicleModelPrismaDTO.PrismaToEntity(model));
  }
  //redurdancia no retorno do tipo no graphql
  async findOnlyVehicleType(modelId: string): Promise<VehicleType> {
    const type = await this.prisma.vehicleModel.findFirstOrThrow({
      where: { id: modelId },
      select: {
        VehicleType: true,
      },
    });

    const typeEntity = VehicleTypePrismaDTO.PrismaToEntity(type.VehicleType);

    return typeEntity;
  }
  async findOnlyVehicleBrand(modelId: string): Promise<VehicleBrand> {
    const type = await this.prisma.vehicleModel.findFirstOrThrow({
      where: { id: modelId },
      select: { Brand: true },
    });

    return VehicleBrandPrismaDTO.PrismaToEntity(type.Brand);
  }
}
