import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetCompanyVehcicleDTO } from 'domain/dto/repositories/getDataDtos/GetCompanyVehicleDto';
import {
  type CountAllCompanyVehiclesWhereRequestDTO,
  type UpdateManyCompanyVehiclesDTO,
  type FindAllCompanyVehicleWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/CompanyVehicleRepositoryDto';
import { type CompanyVehicle } from 'domain/entities/CompanyEntities/companyVehicle/CompanyVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';
import { type CompanyVehicleRepository } from 'domain/repositories/CompanyVehicleRepository';

import { PrismaService } from '../prisma.service';
import { CompanyVehiclePrismaDTO } from './prismaDTO/CompanyVehiclePrismaDto';

@Injectable()
export class CompanyVehicleServicePrisma implements CompanyVehicleRepository {
  constructor(private prisma: PrismaService) {}

  async count(
    parameters: CountAllCompanyVehiclesWhereRequestDTO,
  ): Promise<number> {
    const count = this.prisma.companyVehicle.count({ where: parameters.where });

    return count;
  }

  async delete(id: string): Promise<CompanyVehicle> {
    const companyVehicle = await this.prisma.companyVehicle.findUnique({
      where: { id },
    });

    if (!companyVehicle) {
      throw new GraphQLError('CompanyVehicle not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const companyVehiclePrisma = await this.prisma.companyVehicle.delete({
      where: { id },
    });

    if (!companyVehiclePrisma) {
      throw new GraphQLError('CompanyVehicle not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const companyVehicleDomain =
      CompanyVehiclePrismaDTO.PrismaToEntity(companyVehiclePrisma);

    return companyVehicleDomain;
  }

  async updateMany(
    companyVehicle: UpdateManyCompanyVehiclesDTO[],
  ): Promise<CompanyVehicle[]> {
    const companyVehicles: CompanyVehicle[] = [];

    await Promise.all(
      companyVehicle.map(async item => {
        const companyVehicle = await this.prisma.companyVehicle.findUnique({
          where: { id: item.id },
        });

        if (!companyVehicle) {
          throw new GraphQLError(
            `Company Vehicle with id "${item.id}" not found!`,
            {
              extensions: { code: HttpStatus.NOT_FOUND },
            },
          );
        }

        await this.prisma.$transaction(async tx => {
          const companyVehiclePrisma = await tx.companyVehicle.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!companyVehiclePrisma) {
            throw new GraphQLError(
              `Company Vehicle with id "${item.id}" not updated!`,
              {
                extensions: { code: HttpStatus.BAD_REQUEST },
              },
            );
          }

          const companyVehicleDomain =
            CompanyVehiclePrismaDTO.PrismaToEntity(companyVehiclePrisma);

          companyVehicles.push(companyVehicleDomain);
        });
      }),
    );

    return companyVehicles;
  }

  async deleteMany(ids: string[]): Promise<CompanyVehicle[]> {
    const companyVehicles: CompanyVehicle[] = [];

    await Promise.all(
      ids.map(async id => {
        const companyVehicle = await this.prisma.companyVehicle.findUnique({
          where: { id },
        });

        if (!companyVehicle) {
          throw new GraphQLError('Vehicle Brand not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const companyVehiclePrisma = await tx.companyVehicle.delete({
            where: { id },
          });

          if (!companyVehiclePrisma) {
            throw new GraphQLError('Company Vehicle not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const companyVehicleDomain =
            CompanyVehiclePrismaDTO.PrismaToEntity(companyVehiclePrisma);

          companyVehicles.push(companyVehicleDomain);
        });
      }),
    );

    return companyVehicles;
  }

  async findCompanyVehicle(
    request: GetCompanyVehcicleDTO,
  ): Promise<CompanyVehicle> {
    return CompanyVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.companyVehicle.findFirst({
        where: {
          OR: [
            { id: request.id ?? undefined },
            { Vehicle: { plate: request.plate } },
            { vehicle_id: request.vehicleId },
          ],
        },
      }),
    );
  }
  async createCompanyVehicle(
    companyVehicle: CompanyVehicle,
    vehicle: Vehicle,
  ): Promise<CompanyVehicle> {
    return CompanyVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.companyVehicle.create({
        data: CompanyVehiclePrismaDTO.EntityToCreatePrisma(
          companyVehicle,
          vehicle,
        ),
      }),
    );
  }
  async updateCompanyVehicle(
    id: string,
    CompanyVehicle: CompanyVehicle,
    vehicle: Vehicle,
  ): Promise<CompanyVehicle> {
    return CompanyVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.companyVehicle.update({
        data: CompanyVehiclePrismaDTO.EntityToPrismaUpdate(
          CompanyVehicle,
          vehicle,
        ),
        where: { id },
      }),
    );
  }
  async findAllCompanyVehicle(
    parameters: FindAllCompanyVehicleWhereRequestDTO,
  ): Promise<CompanyVehicle[]> {
    const companyVehiclePrisma = await this.prisma.companyVehicle.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return companyVehiclePrisma.map(companyVehicle =>
      CompanyVehiclePrismaDTO.PrismaToEntity(companyVehicle),
    );
  }
}
