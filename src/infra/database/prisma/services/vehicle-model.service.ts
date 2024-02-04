import { Injectable } from '@nestjs/common';

import { type FindAllVehicleModelWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleModelRepositoryDto';
import { type VehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';
import { type VehicleModel } from 'domain/entities/VehicleEntities/vehicleModel/VehicleModel';
import { type VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';
import { type VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBodyworkPrismaDto } from './prismaDTO/VehicleBodyworkPrismaDto';
import { VehicleBrandPrismaDTO } from './prismaDTO/VehicleBrandPrismaDto';
import { VehicleModelPrismaDTO } from './prismaDTO/VehicleModelPrismaDto';
import { VehicleTypeContainsBodyPrismaDTO } from './prismaDTO/VehicleTypeContainsBody';
import { VehicleTypePrismaDTO } from './prismaDTO/VehicleTypePrismaDto.ts';

@Injectable()
export class VehicleModelService implements VehicleModelRepository {
  constructor(private prisma: PrismaService) {}

  async findVehicleModelById(id: string): Promise<VehicleModel> {
    const vehicleModelPrisma = await this.prisma.vehicleModel.findFirstOrThrow({
      where: { id },
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
        VehicleType: {
          include: {
            VehicleTypeContainsBody: {
              include: { VehicleBodywork: true },
            },
          },
        },
      },
    });

    const typeEntity = VehicleTypePrismaDTO.PrismaToEntity(type.VehicleType);

    if (typeEntity.bodyWork) {
      const bodies = type.VehicleType.VehicleTypeContainsBody.map(x =>
        VehicleBodyworkPrismaDto.PrismaToEntity(x.VehicleBodywork),
      );
      const typeContains = type.VehicleType.VehicleTypeContainsBody.map(
        contains => VehicleTypeContainsBodyPrismaDTO.PrismaToEntity(contains),
      );

      for (const [index, entity] of typeContains.entries()) {
        entity.VehicleBodywork = [bodies[index]];
      }

      typeEntity.VehicleTypeContainsBody = typeContains;
    }

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
