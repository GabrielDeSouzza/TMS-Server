import { Injectable } from '@nestjs/common';

import { type GetOutsourcedTransportCompanyDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedTransportCompany';
import { type FindAllOutsourcedTransportCompanyWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedTransportCompanyRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type OutsourcedTransportCompany } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompany/OutsourcedTransportCompany';
import { type OutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';
import { type OutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';
import { type OutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';
import { type OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';

import { PrismaService } from '../prisma.service';
import { OutsourcedTransportCompanyContractPrismaDTO } from './prismaDTO/OutsourcedTransportCompanyContractPrismaDto';
import { OutsourcedTransportCompanyDriverPrismaDTO } from './prismaDTO/OutsourcedTransportCompanyDriverPrismaDto';
import { OutsourcedTransportCompanyPrismaDTO } from './prismaDTO/OutsourcedTransportCompanyPrismaDto';
import { OutsourcedTransportVehiclePrismaDTO } from './prismaDTO/OutsourcedTransportVehiclePrismaDto';

@Injectable()
export class OutsourcedTransportCompanyPrismaService
  implements OutsourcedTransportCompanyRepository
{
  constructor(private prisma: PrismaService) {}
  async findOutsourcedTransportCompany(
    request: GetOutsourcedTransportCompanyDTO,
  ): Promise<OutsourcedTransportCompany> {
    const outsourcedTransportCompany =
      await this.prisma.outsourcedTransportCompany.findFirst({
        where: {
          OR: [
            { id: request.id },
            { legal_person_id: request.legalPersonId },
            { LegalPerson: { cnpj: request.cnpj } },
            { LegalPerson: { corporate_name: request.corporateName } },
            { LegalPerson: { fantasy_name: request.fantasyName } },
          ],
        },
      });

    return OutsourcedTransportCompanyPrismaDTO.PrismaToEntity(
      outsourcedTransportCompany,
    );
  }
  async createOutsourcedTransportCompany(
    outsourcedTransportCompany: OutsourcedTransportCompany,
    legalPerson?: LegalPerson,
    legaPersonId?: string,
  ): Promise<OutsourcedTransportCompany> {
    const outsourcedTransportCompanyPrisma =
      await this.prisma.outsourcedTransportCompany.create({
        data: OutsourcedTransportCompanyPrismaDTO.EntityToCreatePrisma(
          outsourcedTransportCompany,
          legalPerson,
          legaPersonId,
        ),
      });

    return OutsourcedTransportCompanyPrismaDTO.PrismaToEntity(
      outsourcedTransportCompanyPrisma,
    );
  }
  async updateOutsourcedTransportCompany(
    id: string,
    outsourcedTransportCompany: OutsourcedTransportCompany,
    legalPerson: LegalPerson,
  ): Promise<OutsourcedTransportCompany> {
    const outsourcedTransportCompanyPrisma =
      await this.prisma.outsourcedTransportCompany.update({
        data: OutsourcedTransportCompanyPrismaDTO.EntityToPrismaUpdate(
          outsourcedTransportCompany,
          legalPerson,
        ),
        where: { id },
      });

    return OutsourcedTransportCompanyPrismaDTO.PrismaToEntity(
      outsourcedTransportCompanyPrisma,
    );
  }

  async getAllOutsourcedTransportCompany(
    parameters: FindAllOutsourcedTransportCompanyWhereRequestDTO,
  ): Promise<OutsourcedTransportCompany[]> {
    const outsourcedTransportCompanys =
      await this.prisma.outsourcedTransportCompany.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return outsourcedTransportCompanys.map(outsourcedTransportCompany =>
      OutsourcedTransportCompanyPrismaDTO.PrismaToEntity(
        outsourcedTransportCompany,
      ),
    );
  }
  async getAllOutsourcedTransportCompanyContracts(
    outsourcedCompanyId: string,
  ): Promise<OutsourcedTransportCompanyContract[]> {
    const contracts = await this.prisma.outsourcedTransportCompany.findUnique({
      select: { OutsourcedTransportCompanyContract: true },
      where: { id: outsourcedCompanyId },
    });

    return contracts.OutsourcedTransportCompanyContract.map(contract =>
      OutsourcedTransportCompanyContractPrismaDTO.PrismaToEntity(contract),
    );
  }
  async getAllOutsourcedTransportCompanyVehicles(
    outsourcedCompanyId: string,
  ): Promise<OutsourcedTransportVehicle[]> {
    const vehicles = await this.prisma.outsourcedTransportCompany.findUnique({
      select: { OutsourcedCompanyVehicle: true },
      where: { id: outsourcedCompanyId },
    });

    return vehicles.OutsourcedCompanyVehicle.map(vehicle =>
      OutsourcedTransportVehiclePrismaDTO.PrismaToEntity(vehicle),
    );
  }
  async getAllOutsourcedTransportCompanyDrivers(
    outsourcedCompanyId: string,
  ): Promise<OutsourcedTransportCompanyDriver[]> {
    const drivers = await this.prisma.outsourcedTransportCompany.findUnique({
      where: { id: outsourcedCompanyId },
      select: { OutsourcedTransportCompanyDriver: true },
    });

    return drivers.OutsourcedTransportCompanyDriver.map(driver =>
      OutsourcedTransportCompanyDriverPrismaDTO.PrismaToEntity(driver),
    );
  }
}
