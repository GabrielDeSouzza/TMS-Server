import { Injectable } from '@nestjs/common';

import { type GetTypeOfMaintenanceDTO } from 'domain/dto/repositories/getDataDtos/GetTypeOfMaintenanceDto';
import { type FindAllTypeOfMaintenanceWhereRequestDTO } from 'domain/dto/repositories/whereDtos/TypeOfMaintenanceRepositoryDto';
import { type TypeOfMaintenance } from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';
import { type TypeOfMaintenanceRepository } from 'domain/repositories/TypeOfMaintenanceRepository';

import { PrismaService } from '../prisma.service';
import { TypeOfMaintenancePrismaDTO } from './prismaDTO/TypeOfMaintenancePrismaDto';

@Injectable()
export class TypeOfMaintenancePrismaService
  implements TypeOfMaintenanceRepository
{
  constructor(private prisma: PrismaService) {}

  async findTypeOfMaintenance(
    data: GetTypeOfMaintenanceDTO,
  ): Promise<TypeOfMaintenance> {
    const typeofmaintenance = await this.prisma.typeOfMaintenance.findFirst({
      where: {
        OR: [
          { id: data?.id },
          {
            AND: [
              { description: data?.typeData?.description },
              { typeMaintenance: data?.typeData?.typeMaintenance },
            ],
          },
        ],
      },
    });

    return TypeOfMaintenancePrismaDTO.PrismaToEntity(typeofmaintenance);
  }
  async createTypeOfMaintenance(
    typeofmaintenance: TypeOfMaintenance,
  ): Promise<TypeOfMaintenance> {
    const typeofmaintenancePrisma = await this.prisma.typeOfMaintenance.create({
      data: TypeOfMaintenancePrismaDTO.EntityToCreatePrisma(typeofmaintenance),
    });

    return TypeOfMaintenancePrismaDTO.PrismaToEntity(typeofmaintenancePrisma);
  }
  async updateTypeOfMaintenance(
    id: string,
    typeofmaintenance?: TypeOfMaintenance,
  ): Promise<TypeOfMaintenance> {
    const typeofmaintenancePrisma = await this.prisma.typeOfMaintenance.update({
      data: TypeOfMaintenancePrismaDTO.EntityToPrismaUpdate(typeofmaintenance),
      where: { id },
    });

    return TypeOfMaintenancePrismaDTO.PrismaToEntity(typeofmaintenancePrisma);
  }

  async findAllTypeOfMaintenance(
    parameters: FindAllTypeOfMaintenanceWhereRequestDTO,
  ): Promise<TypeOfMaintenance[]> {
    const typeofmaintenances = await this.prisma.typeOfMaintenance.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return typeofmaintenances.map(typeofmaintenance =>
      TypeOfMaintenancePrismaDTO.PrismaToEntity(typeofmaintenance),
    );
  }
}
