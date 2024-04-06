import { Injectable } from '@nestjs/common';

import { type GetMaintenanceDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenancetDto';
import { type FindAllMaintenanceWhereRequestDTO } from 'domain/dto/repositories/whereDtos/MaintenanceRepositoryDto';
import { type Maintenance } from 'domain/entities/MaintenceEntities/Maintenance/Maintenance';
import { type MaintenanceRepository } from 'domain/repositories/MaintenanceRepository';

import { PrismaService } from '../prisma.service';
import { MaintenancePrismaDTO } from './prismaDTO/MaintenancePrismaDto';

@Injectable()
export class MaintenancePrismaService implements MaintenanceRepository {
  constructor(private prisma: PrismaService) {}

  async findMaintenance(data: GetMaintenanceDTO): Promise<Maintenance> {
    const maintenance = await this.prisma.maintenance.findFirst({
      where: {
        OR: [{ id: data.id }],
      },
    });

    return MaintenancePrismaDTO.PrismaToEntity(maintenance);
  }
  async createMaintenance(maintenance: Maintenance): Promise<Maintenance> {
    const maintenancePrisma = await this.prisma.maintenance.create({
      data: MaintenancePrismaDTO.EntityToCreatePrisma(maintenance),
    });

    return MaintenancePrismaDTO.PrismaToEntity(maintenancePrisma);
  }
  async updateMaintenance(
    id: string,
    maintenance?: Maintenance,
  ): Promise<Maintenance> {
    const maintenancePrisma = await this.prisma.maintenance.update({
      data: MaintenancePrismaDTO.EntityToPrismaUpdate(maintenance),
      where: { id },
    });

    return MaintenancePrismaDTO.PrismaToEntity(maintenancePrisma);
  }

  async findAllMaintenance(
    parameters: FindAllMaintenanceWhereRequestDTO,
  ): Promise<Maintenance[]> {
    const maintenances = await this.prisma.maintenance.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return maintenances.map(maintenance =>
      MaintenancePrismaDTO.PrismaToEntity(maintenance),
    );
  }
}
