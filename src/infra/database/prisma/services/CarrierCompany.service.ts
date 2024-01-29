import { Injectable } from '@nestjs/common';

import {
  type getCarrierCompanyData,
  type FindAllWhereCarrierCompanyRequestType,
} from 'domain/dto/repositories/CarrierRepositoryDto';
import { type CarrierCompany } from 'domain/entities/CompanyEntities/carrierCompany/CarrierCompany';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';

import { PrismaService } from '../prisma.service';
import { CarrierCompanyPrismaDTO } from './prismaDTO/CarrierCompanyPrismaDto';

@Injectable()
export class CarrierCompanyPrismaService implements CarrierCompanyRepository {
  constructor(private prisma: PrismaService) {}

  async findCarrierCompany(
    data: getCarrierCompanyData,
  ): Promise<CarrierCompany> {
    const carrierCompany = await this.prisma.carrierCompany.findFirst({
      where: {
        OR: [
          { id: data.id },
          { LegalPerson: { cnpj: data.cnpj } },
          { LegalPerson: { fantasy_name: data.fantasyName } },
          { LegalPerson: { corporate_name: data.corporateName } },
        ],
      },
    });

    return CarrierCompanyPrismaDTO.PrismaToEntity(carrierCompany);
  }
  async createCarrierCompany(
    carrierCompany: CarrierCompany,
    legalPerson?: LegalPerson,
    legalPersonId?: string,
  ): Promise<CarrierCompany> {
    const carriercompanyPrisma = await this.prisma.carrierCompany.create({
      data: CarrierCompanyPrismaDTO.EntityToCreatePrisma(
        carrierCompany,
        legalPerson,
        legalPersonId,
      ),
    });

    return CarrierCompanyPrismaDTO.PrismaToEntity(carriercompanyPrisma);
  }
  async updateCarrierCompany(
    id: string,
    carrierCompany?: CarrierCompany,
    legalPerson?: LegalPerson,
  ): Promise<CarrierCompany> {
    const carriercompanyPrisma = await this.prisma.carrierCompany.update({
      data: CarrierCompanyPrismaDTO.EntityToPrismaUpdate(
        carrierCompany,
        legalPerson,
      ),
      where: { id },
    });

    return CarrierCompanyPrismaDTO.PrismaToEntity(carriercompanyPrisma);
  }

  async getAllCarrierCompany(
    parameters: FindAllWhereCarrierCompanyRequestType,
  ): Promise<CarrierCompany[]> {
    const carriercompanys = await this.prisma.carrierCompany.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return carriercompanys.map(carrierCompany =>
      CarrierCompanyPrismaDTO.PrismaToEntity(carrierCompany),
    );
  }
}
