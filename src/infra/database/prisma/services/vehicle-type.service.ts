import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetVehicleTypeDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleTypeDto';
import {
  type CountAllVehicleTypesWhereRequestDTO,
  type UpdateManyVehicleTypesDTO,
  type FindAllVehicleTypeWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/VehicleTypeRepositoryDto';
import { type VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';
import { type VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from '../prisma.service';
import { VehicleTypePrismaDTO } from './prismaDTO/VehicleTypePrismaDto.ts';

@Injectable()
export class VehicleTypeService implements VehicleTypeRepository {
  constructor(private prisma: PrismaService) {}

  async count(
    parameters: CountAllVehicleTypesWhereRequestDTO,
  ): Promise<number> {
    const count = this.prisma.vehicleType.count({ where: parameters.where });

    return count;
  }

  async delete(id: string): Promise<VehicleType> {
    const vehicleType = await this.prisma.vehicleType.findUnique({
      where: { id },
    });

    if (!vehicleType) {
      throw new GraphQLError('vehicleType not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const vehicleTypePrisma = await this.prisma.vehicleType.delete({
      where: { id },
    });

    if (!vehicleTypePrisma) {
      throw new GraphQLError('vehicleType not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const vehicleTypeDomain =
      VehicleTypePrismaDTO.PrismaToEntity(vehicleTypePrisma);

    return vehicleTypeDomain;
  }

  async updateMany(
    vehicleType: UpdateManyVehicleTypesDTO[],
  ): Promise<VehicleType[]> {
    const vehicleTypes: VehicleType[] = [];

    await Promise.all(
      vehicleType.map(async item => {
        const vehicleType = await this.prisma.vehicleType.findUnique({
          where: { id: item.id },
        });

        if (!vehicleType) {
          throw new GraphQLError(
            `Vehicle Type with id "${item.id}" not found!`,
            {
              extensions: { code: HttpStatus.NOT_FOUND },
            },
          );
        }

        await this.prisma.$transaction(async tx => {
          const vehicleTypePrisma = await tx.vehicleType.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!vehicleTypePrisma) {
            throw new GraphQLError(
              `Vehicle Type with id "${item.id}" not updated!`,
              {
                extensions: { code: HttpStatus.BAD_REQUEST },
              },
            );
          }

          const vehicleTypeDomain =
            VehicleTypePrismaDTO.PrismaToEntity(vehicleTypePrisma);

          vehicleTypes.push(vehicleTypeDomain);
        });
      }),
    );

    return vehicleTypes;
  }

  async deleteMany(ids: string[]): Promise<VehicleType[]> {
    const vehicleTypes: VehicleType[] = [];

    await Promise.all(
      ids.map(async id => {
        const vehicleType = await this.prisma.vehicleType.findUnique({
          where: { id },
        });

        if (!vehicleType) {
          throw new GraphQLError('Vehicle Type not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const vehicleTypePrisma = await tx.vehicleType.delete({
            where: { id },
          });

          if (!vehicleTypePrisma) {
            throw new GraphQLError('Vehicle Type not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const vehicleTypeDomain =
            VehicleTypePrismaDTO.PrismaToEntity(vehicleTypePrisma);

          vehicleTypes.push(vehicleTypeDomain);
        });
      }),
    );

    return vehicleTypes;
  }

  async findVehicleType(request: GetVehicleTypeDTO): Promise<VehicleType> {
    const vehicleTypePrisma = await this.prisma.vehicleType.findFirst({
      where: { OR: [{ id: request.id }, { name: request.name }] },
      include: { VehicleBodyWork: true },
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
    delBodyworkIds: string[],
  ): Promise<VehicleType> {
    const updatedType = await this.prisma.vehicleType.update({
      data: VehicleTypePrismaDTO.EntityToPrismaUpdate(
        vehicleType,
        delBodyworkIds,
      ),
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

  async getAllVehicleTypeByBodyWork(
    bodyworkId: string,
  ): Promise<VehicleType[]> {
    const types = await this.prisma.vehicleType.findMany({
      where: { VehicleBodyWork: { some: { id: bodyworkId } } },
    });

    return types
      ? types.map(type => VehicleTypePrismaDTO.PrismaToEntity(type))
      : null;
  }
}
