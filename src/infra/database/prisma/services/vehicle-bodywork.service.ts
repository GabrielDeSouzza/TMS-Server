import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetVehicleBodyWorkDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleBodWorkDto';
import { type GetVehicleTypeDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleTypeDto';
import {
  type CountAllVehicleBodyworksWhereRequestDTO,
  type UpdateManyVehicleBodyworksDTO,
  type FindAllVehicleBodyworkWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/VehicleBodyworkRepositoryDto';
import { type VehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';
import { type VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBodyworkPrismaDto } from './prismaDTO/VehicleBodyworkPrismaDto';

@Injectable()
export class VehicleBodyworkService implements VehicleBodyworkRepository {
  async count(
    parameters: CountAllVehicleBodyworksWhereRequestDTO,
  ): Promise<number> {
    const count = this.prisma.vehicleBodywork.count({
      where: parameters.where,
    });

    return count;
  }

  async delete(id: string): Promise<VehicleBodywork> {
    const vehicleBodywork = await this.prisma.vehicleBodywork.findUnique({
      where: { id },
    });

    if (!vehicleBodywork) {
      throw new GraphQLError('Vehicle Bodywork not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const vehicleBodyworkPrisma = await this.prisma.vehicleBodywork.delete({
      where: { id },
    });

    if (!vehicleBodyworkPrisma) {
      throw new GraphQLError('vehicleBodywork not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const vehicleBodyworkDomain = VehicleBodyworkPrismaDto.PrismaToEntity(
      vehicleBodyworkPrisma,
    );

    return vehicleBodyworkDomain;
  }

  async updateMany(
    vehicleBodywork: UpdateManyVehicleBodyworksDTO[],
  ): Promise<VehicleBodywork[]> {
    const vehicleBodyworks: VehicleBodywork[] = [];

    await Promise.all(
      vehicleBodywork.map(async item => {
        const vehicleBodywork = await this.prisma.vehicleBodywork.findUnique({
          where: { id: item.id },
        });

        if (!vehicleBodywork) {
          throw new GraphQLError(
            `Vehicle Bodywork with id "${item.id}" not found!`,
            {
              extensions: { code: HttpStatus.NOT_FOUND },
            },
          );
        }

        await this.prisma.$transaction(async tx => {
          const vehicleBodyworkPrisma = await tx.vehicleBodywork.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!vehicleBodyworkPrisma) {
            throw new GraphQLError(
              `Vehicle Bodywork with id "${item.id}" not updated!`,
              {
                extensions: { code: HttpStatus.BAD_REQUEST },
              },
            );
          }

          const vehicleBodyworkDomain = VehicleBodyworkPrismaDto.PrismaToEntity(
            vehicleBodyworkPrisma,
          );

          vehicleBodyworks.push(vehicleBodyworkDomain);
        });
      }),
    );

    return vehicleBodyworks;
  }

  async deleteMany(ids: string[]): Promise<VehicleBodywork[]> {
    const vehicleBodyworks: VehicleBodywork[] = [];

    await Promise.all(
      ids.map(async id => {
        const vehicleBodywork = await this.prisma.vehicleBodywork.findUnique({
          where: { id },
        });

        if (!vehicleBodywork) {
          throw new GraphQLError('Vehicle Bodywork not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const vehicleBodyworkPrisma = await tx.vehicleBodywork.delete({
            where: { id },
          });

          if (!vehicleBodyworkPrisma) {
            throw new GraphQLError('Vehicle Bodywork not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const vehicleBodyworkDomain = VehicleBodyworkPrismaDto.PrismaToEntity(
            vehicleBodyworkPrisma,
          );

          vehicleBodyworks.push(vehicleBodyworkDomain);
        });
      }),
    );

    return vehicleBodyworks;
  }

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
