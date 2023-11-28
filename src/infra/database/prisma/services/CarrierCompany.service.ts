import { Injectable } from '@nestjs/common';

import { type CarrierCompany } from 'domain/entities/legalPerson/carrierCompany/CarrierCompany';
import { type LegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';
import { type CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';

import { PrismaService } from '../prisma.service';
import { CarrierCompanyPrismaDTO } from './prismaDTO/CarrierCompanyPrismaDto';

@Injectable()
export class CarrierCompanyPrismaService implements CarrierCompanyRepository {
  constructor(private prisma: PrismaService) {}
  async findCarrierCompanyById(id: string): Promise<CarrierCompany> {
    const carrierCompany = await this.prisma.carrierCompany.findFirstOrThrow({
      where: { id },
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

  async getAllCarrierCompany(): Promise<CarrierCompany[]> {
    const carriercompanys = await this.prisma.carrierCompany.findMany();

    return carriercompanys.map(carrierCompany =>
      CarrierCompanyPrismaDTO.PrismaToEntity(carrierCompany),
    );
  }
}
