import { Injectable } from '@nestjs/common';

import { type GetPhysicalCustomerQuoteTableDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerQuoteTableDto';
import { type FindAllPhysicalCustomerQuoteTableWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerQuoteTableRepositoryDto';
import { type PhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';
import { type PhysicalCustomerQuoteTableRepository } from 'domain/repositories/PhysicalCustomerQuoteTable.repository';

import { PrismaService } from '../prisma.service';
import { PhysicalCustomerQuoteTablePrismaDTO } from './prismaDTO/PhysicalCustomerQuoteTablePrismaDto';

@Injectable()
export class PhysicalCustomerQuoteTablePrismaService
  implements PhysicalCustomerQuoteTableRepository
{
  constructor(private prisma: PrismaService) {}
  async findPhysicalCustomerQuoteTable(
    request: GetPhysicalCustomerQuoteTableDTO,
  ): Promise<PhysicalCustomerQuoteTable> {
    const physicalcustomerquotetable =
      await this.prisma.physicalCustomerQuoteTable.findFirst({
        where: {
          OR: [{ id: request.id }, { cod_quote: request.codQuote }],
        },
      });

    return PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
      physicalcustomerquotetable,
    );
  }
  async createPhysicalCustomerQuoteTable(
    physicalcustomerquotetable: PhysicalCustomerQuoteTable,
  ): Promise<PhysicalCustomerQuoteTable> {
    const physicalcustomerquotetablePrisma =
      await this.prisma.physicalCustomerQuoteTable.create({
        data: PhysicalCustomerQuoteTablePrismaDTO.EntityToCreatePrisma(
          physicalcustomerquotetable,
        ),
      });

    return PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
      physicalcustomerquotetablePrisma,
    );
  }
  async updatePhysicalCustomerQuoteTable(
    id: string,
    physicalcustomerquotetable?: PhysicalCustomerQuoteTable,
  ): Promise<PhysicalCustomerQuoteTable> {
    const physicalcustomerquotetablePrisma =
      await this.prisma.physicalCustomerQuoteTable.update({
        data: PhysicalCustomerQuoteTablePrismaDTO.EntityToPrismaUpdate(
          physicalcustomerquotetable,
        ),
        where: { id },
      });

    return PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
      physicalcustomerquotetablePrisma,
    );
  }

  async findAllPhysicalCustomerQuoteTable(
    parameters: FindAllPhysicalCustomerQuoteTableWhereRequestDTO,
  ): Promise<PhysicalCustomerQuoteTable[]> {
    const physicalcustomerquotetables =
      await this.prisma.physicalCustomerQuoteTable.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return physicalcustomerquotetables.map(physicalcustomerquotetable =>
      PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
        physicalcustomerquotetable,
      ),
    );
  }
}
