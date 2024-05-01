import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetVehicleBrandDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleBrandDto';
import {
  type UpdateManyVehicleBrandsDTO,
  type CountAllVehicleBrandsWhereRequestDTO,
  type FindAllVehicleBrandWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/VehicleBrandRepositoryDto';
import { type VehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';
import { type VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBrandPrismaDTO } from './prismaDTO/VehicleBrandPrismaDto';

@Injectable()
export class VehicleBrandService implements VehicleBrandRepository {
  async count(
    parameters: CountAllVehicleBrandsWhereRequestDTO,
  ): Promise<number> {
    const count = this.prisma.vehicleBrand.count({ where: parameters.where });

    return count;
  }

  async delete(id: string): Promise<VehicleBrand> {
    const vehicleBrand = await this.prisma.vehicleBrand.findUnique({
      where: { id },
    });

    if (!vehicleBrand) {
      throw new GraphQLError('vehicleBrand not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const vehicleBrandPrisma = await this.prisma.vehicleBrand.delete({
      where: { id },
    });

    if (!vehicleBrandPrisma) {
      throw new GraphQLError('vehicleBrand not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const vehicleBrandDomain =
      VehicleBrandPrismaDTO.PrismaToEntity(vehicleBrandPrisma);

    return vehicleBrandDomain;
  }

  async updateMany(
    vehicleBrand: UpdateManyVehicleBrandsDTO[],
  ): Promise<VehicleBrand[]> {
    const vehicleBrands: VehicleBrand[] = [];

    await Promise.all(
      vehicleBrand.map(async item => {
        const vehicleBrand = await this.prisma.vehicleBrand.findUnique({
          where: { id: item.id },
        });

        if (!vehicleBrand) {
          throw new GraphQLError(
            `Vehicle Brand with id "${item.id}" not found!`,
            {
              extensions: { code: HttpStatus.NOT_FOUND },
            },
          );
        }

        await this.prisma.$transaction(async tx => {
          const vehicleBrandPrisma = await tx.vehicleBrand.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!vehicleBrandPrisma) {
            throw new GraphQLError(
              `Vehicle Brand with id "${item.id}" not updated!`,
              {
                extensions: { code: HttpStatus.BAD_REQUEST },
              },
            );
          }

          const vehicleBrandDomain =
            VehicleBrandPrismaDTO.PrismaToEntity(vehicleBrandPrisma);

          vehicleBrands.push(vehicleBrandDomain);
        });
      }),
    );

    return vehicleBrands;
  }

  async deleteMany(ids: string[]): Promise<VehicleBrand[]> {
    const vehicleBrands: VehicleBrand[] = [];

    await Promise.all(
      ids.map(async id => {
        const vehicleBrand = await this.prisma.vehicleBrand.findUnique({
          where: { id },
        });

        if (!vehicleBrand) {
          throw new GraphQLError('Vehicle Brand not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const vehicleBrandPrisma = await tx.vehicleBrand.delete({
            where: { id },
          });

          if (!vehicleBrandPrisma) {
            throw new GraphQLError('Vehicle Brand not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const vehicleBrandDomain =
            VehicleBrandPrismaDTO.PrismaToEntity(vehicleBrandPrisma);

          vehicleBrands.push(vehicleBrandDomain);
        });
      }),
    );

    return vehicleBrands;
  }

  constructor(private prisma: PrismaService) {}
  async findVehicleBrand(request: GetVehicleBrandDTO): Promise<VehicleBrand> {
    const brand = await this.prisma.vehicleBrand.findFirst({
      where: { OR: [{ id: request.id }, { name: request.name }] },
    });

    return VehicleBrandPrismaDTO.PrismaToEntity(brand);
  }
  async createVehicleBrand(vehicleBrand: VehicleBrand): Promise<VehicleBrand> {
    const newVehicleBrand = await this.prisma.vehicleBrand.create({
      data: VehicleBrandPrismaDTO.EntityToPrisma(vehicleBrand),
    });

    return VehicleBrandPrismaDTO.PrismaToEntity(newVehicleBrand);
  }
  async updateVehicleBrand(
    id: string,
    vehicleBrand: VehicleBrand,
  ): Promise<VehicleBrand> {
    const updatedVehicleBrand = await this.prisma.vehicleBrand.update({
      where: { id },
      data: VehicleBrandPrismaDTO.EntityToPrisma(vehicleBrand),
    });
    const vehicleBrandReturn =
      VehicleBrandPrismaDTO.PrismaToEntity(updatedVehicleBrand);

    return vehicleBrandReturn;
  }
  async getAllVehicleBrand(
    parameters: FindAllVehicleBrandWhereRequestDTO,
  ): Promise<VehicleBrand[]> {
    const brands = await this.prisma.vehicleBrand.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });
    const vehicleBrands = brands.map(brand =>
      VehicleBrandPrismaDTO.PrismaToEntity(brand),
    );

    return vehicleBrands;
  }
}
