import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetVehicleModelDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleModelDto';
import {
  type CountAllVehicleModelsWhereRequestDTO,
  type UpdateManyVehicleModelsDTO,
  type FindAllVehicleModelWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/VehicleModelRepositoryDto';
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

  async count(
    parameters: CountAllVehicleModelsWhereRequestDTO,
  ): Promise<number> {
    const count = this.prisma.vehicleModel.count({ where: parameters.where });

    return count;
  }

  async delete(id: string): Promise<VehicleModel> {
    const vehicleModel = await this.prisma.vehicleModel.findUnique({
      where: { id },
    });

    if (!vehicleModel) {
      throw new GraphQLError('vehicleModel not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const vehicleModelPrisma = await this.prisma.vehicleModel.delete({
      where: { id },
    });

    if (!vehicleModelPrisma) {
      throw new GraphQLError('vehicleModel not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const vehicleModelDomain =
      VehicleModelPrismaDTO.PrismaToEntity(vehicleModelPrisma);

    return vehicleModelDomain;
  }

  async updateMany(
    vehicleModel: UpdateManyVehicleModelsDTO[],
  ): Promise<VehicleModel[]> {
    const vehicleModels: VehicleModel[] = [];

    await Promise.all(
      vehicleModel.map(async item => {
        const vehicleModel = await this.prisma.vehicleModel.findUnique({
          where: { id: item.id },
        });

        if (!vehicleModel) {
          throw new GraphQLError(
            `Vehicle Model with id "${item.id}" not found!`,
            {
              extensions: { code: HttpStatus.NOT_FOUND },
            },
          );
        }

        await this.prisma.$transaction(async tx => {
          const vehicleModelPrisma = await tx.vehicleModel.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!vehicleModelPrisma) {
            throw new GraphQLError(
              `Vehicle Model with id "${item.id}" not updated!`,
              {
                extensions: { code: HttpStatus.BAD_REQUEST },
              },
            );
          }

          const vehicleModelDomain =
            VehicleModelPrismaDTO.PrismaToEntity(vehicleModelPrisma);

          vehicleModels.push(vehicleModelDomain);
        });
      }),
    );

    return vehicleModels;
  }

  async deleteMany(ids: string[]): Promise<VehicleModel[]> {
    const vehicleModels: VehicleModel[] = [];

    await Promise.all(
      ids.map(async id => {
        const vehicleModel = await this.prisma.vehicleModel.findUnique({
          where: { id },
        });

        if (!vehicleModel) {
          throw new GraphQLError('Vehicle Model not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const vehicleModelPrisma = await tx.vehicleModel.delete({
            where: { id },
          });

          if (!vehicleModelPrisma) {
            throw new GraphQLError('Vehicle Model not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const vehicleModelDomain =
            VehicleModelPrismaDTO.PrismaToEntity(vehicleModelPrisma);

          vehicleModels.push(vehicleModelDomain);
        });
      }),
    );

    return vehicleModels;
  }

  async findVehicleModel(request: GetVehicleModelDTO): Promise<VehicleModel> {
    const vehicleModelPrisma = await this.prisma.vehicleModel.findFirst({
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
