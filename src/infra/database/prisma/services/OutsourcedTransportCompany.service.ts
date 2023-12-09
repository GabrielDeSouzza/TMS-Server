import { Injectable } from '@nestjs/common';

import { type LegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';
import { type OutsourcedTransportCompany } from 'domain/entities/legalPerson/outsourcedTransportCompany/OutsourcedTransportCompany';
import { type OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';

import { PrismaService } from '../prisma.service';
import { OutsourcedTransportCompanyPrismaDTO } from './prismaDTO/OutsourcedTransportCompanyPrismaDto';

@Injectable()
export class OutsourcedTransportCompanyPrismaService
  implements OutsourcedTransportCompanyRepository
{
  constructor(private prisma: PrismaService) {}
  async findOutsourcedTransportCompanyById(
    id: string,
  ): Promise<OutsourcedTransportCompany> {
    const outsourcedTransportCompany =
      await this.prisma.outsourcedTransportCompany.findFirstOrThrow({
        where: { id },
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

  async getAllOutsourcedTransportCompany(): Promise<
    OutsourcedTransportCompany[]
  > {
    const outsourcedTransportCompanys =
      await this.prisma.outsourcedTransportCompany.findMany();

    return outsourcedTransportCompanys.map(outsourcedTransportCompany =>
      OutsourcedTransportCompanyPrismaDTO.PrismaToEntity(
        outsourcedTransportCompany,
      ),
    );
  }
}
