import { Injectable } from '@nestjs/common';

import { type GetMaintenanceCompanyDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenanceCompanyDto';
import { type FindAllMaintenanceCompanyWhereRequestDTO } from 'domain/dto/repositories/whereDtos/MaintenanceCompanyRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type MaintenanceCompany } from 'domain/entities/MaintenceEntities/MaintenanceCompany/MaintenanceCompany';
import { type MaintenanceCompanyRepository } from 'domain/repositories/MaintenanceCompanyRepositoy';

import { PrismaService } from '../prisma.service';
import { MaintenanceCompanyPrismaDTO } from './prismaDTO/MaintenanceCompanyPrismaDto';

@Injectable()
export class MaintenanceCompanyPrismaService
  implements MaintenanceCompanyRepository
{
  constructor(private prisma: PrismaService) {}
  async findMaintenanceCompany(
    request: GetMaintenanceCompanyDTO,
  ): Promise<MaintenanceCompany> {
    const maintenanceCompany = await this.prisma.maintenanceCompany.findFirst({
      where: {
        OR: [
          { id: request.id },
          { LegalPerson: { fantasy_name: request.fantasyName } },
          { LegalPerson: { corporate_name: request.corporateName } },
          { LegalPerson: { cnpj: request.cnpj } },
        ],
      },
    });

    return MaintenanceCompanyPrismaDTO.PrismaToEntity(maintenanceCompany);
  }
  async createMaintenanceCompany(
    maintenanceCompany: MaintenanceCompany,
    legalPerson?: LegalPerson,
    idLegalPerson?: string,
  ): Promise<MaintenanceCompany> {
    const maintenanceCompanyPrisma =
      await this.prisma.maintenanceCompany.create({
        data: MaintenanceCompanyPrismaDTO.EntityToCreatePrisma(
          maintenanceCompany,
          legalPerson,
          idLegalPerson,
        ),
      });

    return MaintenanceCompanyPrismaDTO.PrismaToEntity(maintenanceCompanyPrisma);
  }
  async updateMaintenanceCompany(
    id: string,
    maintenanceCompany?: MaintenanceCompany,
    legalPerson?: LegalPerson,
  ): Promise<MaintenanceCompany> {
    const maintenanceCompanyPrisma =
      await this.prisma.maintenanceCompany.update({
        data: MaintenanceCompanyPrismaDTO.EntityToPrismaUpdate(
          maintenanceCompany,
          legalPerson,
        ),
        where: { id },
      });

    return MaintenanceCompanyPrismaDTO.PrismaToEntity(maintenanceCompanyPrisma);
  }

  async getAllMaintenanceCompany(
    parameters: FindAllMaintenanceCompanyWhereRequestDTO,
  ): Promise<MaintenanceCompany[]> {
    const maintenanceCompanys = await this.prisma.maintenanceCompany.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return maintenanceCompanys.map(maintenanceCompany =>
      MaintenanceCompanyPrismaDTO.PrismaToEntity(maintenanceCompany),
    );
  }
}
