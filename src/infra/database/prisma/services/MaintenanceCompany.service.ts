import { Injectable } from '@nestjs/common';

import { type GetMaintenanceCompanyDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenanceCompanyDto';
import {
  type CountMaintenanceCompanyRequestDTO,
  type FindAllMaintenanceCompanyWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/MaintenanceCompanyRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type MaintenanceCompany } from 'domain/entities/MaintenceEntities/MaintenanceCompany/MaintenanceCompany';
import {
  type MaintenanceCompanyUpdateDTO,
  type MaintenanceCompanyRepository,
} from 'domain/repositories/MaintenanceCompanyRepositoy';

import { PrismaService } from '../prisma.service';
import { MaintenanceCompanyPrismaDTO } from './prismaDTO/MaintenanceCompanyPrismaDto';

@Injectable()
export class MaintenanceCompanyPrismaService
  implements MaintenanceCompanyRepository
{
  constructor(private prisma: PrismaService) {}
  countMaintenanceCompany(
    request: CountMaintenanceCompanyRequestDTO,
  ): Promise<number> {
    return this.prisma.maintenanceCompany.count({
      where: request.where ?? undefined,
    });
  }
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
  updateManyMaintenanceCompany(
    data: MaintenanceCompanyUpdateDTO[],
  ): Promise<MaintenanceCompany[]> {
    console.log(data);
    const maintenancecompanyUpdate = this.prisma.$transaction(async tx => {
      const promises = data.map(async maintenancecompany => {
        const maintenancecompanyPrisma = await tx.maintenanceCompany.update({
          data: MaintenanceCompanyPrismaDTO.EntityToPrismaUpdate(
            maintenancecompany.maintenanceCompany,
            maintenancecompany.legalPerson,
          ),
          where: { id: maintenancecompany.maintenanceCompany.id },
        });

        return MaintenanceCompanyPrismaDTO.PrismaToEntity(
          maintenancecompanyPrisma,
        );
      });

      return Promise.all(promises);
    });

    return maintenancecompanyUpdate;
  }

  async deleteMaintenanceCompany(id: string): Promise<MaintenanceCompany> {
    return MaintenanceCompanyPrismaDTO.PrismaToEntity(
      await this.prisma.maintenanceCompany.delete({ where: { id } }),
    );
  }
  deleteManyMaintenanceCompany(ids: string[]): Promise<MaintenanceCompany[]> {
    const maintenancecompanyDeleted = this.prisma.$transaction(async tx => {
      const promises = ids.map(async icmdsId => {
        const maintenancecompanyPrisma = await tx.maintenanceCompany.delete({
          where: { id: icmdsId },
        });

        return MaintenanceCompanyPrismaDTO.PrismaToEntity(
          maintenancecompanyPrisma,
        );
      });

      return Promise.all(promises);
    });

    return maintenancecompanyDeleted;
  }
}
