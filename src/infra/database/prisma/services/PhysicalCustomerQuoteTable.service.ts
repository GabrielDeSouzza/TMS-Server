import { Injectable } from '@nestjs/common';

import { type GetPhysicalCustomerQuoteTableDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerQuoteTableDto';
import {
  type CountAllPhysicalCustomerQuoteTableWhereRequestDTO,
  type FindAllPhysicalCustomerQuoteTableWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/PhysicalCustomerQuoteTableRepositoryDto';
import { type PhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';
import { type PhysicalCustomerQuoteTableRepository } from 'domain/repositories/PhysicalCustomerQuoteTable.repository';

import { PrismaService } from '../prisma.service';
import { PhysicalCustomerQuoteTablePrismaDTO } from './prismaDTO/PhysicalCustomerQuoteTablePrismaDto';

@Injectable()
export class PhysicalCustomerQuoteTablePrismaService
  implements PhysicalCustomerQuoteTableRepository
{
  constructor(private prisma: PrismaService) {}

  count(
    request: CountAllPhysicalCustomerQuoteTableWhereRequestDTO,
  ): Promise<number> {
    return this.prisma.physicalCustomerQuoteTable.count({
      where: request.where ?? undefined,
    });
  }
  async findPhysicalCustomerQuoteTable(
    request: GetPhysicalCustomerQuoteTableDTO,
  ): Promise<PhysicalCustomerQuoteTable> {
    const physicalcustomerquotetable =
      await this.prisma.physicalCustomerQuoteTable.findFirst({
        where: {
          OR: [{ id: request.id }, { cod_quote: request.codQuote }],
        },
        include: { AdressDestiny: true, AdressOrigin: true },
      });

    return PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
      physicalcustomerquotetable,
      physicalcustomerquotetable?.AdressOrigin,
      physicalcustomerquotetable?.AdressDestiny,
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
        include: { AdressDestiny: true, AdressOrigin: true },
      });

    return PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
      physicalcustomerquotetablePrisma,
      physicalcustomerquotetablePrisma.AdressOrigin,
      physicalcustomerquotetablePrisma.AdressDestiny,
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
        include: { AdressDestiny: true, AdressOrigin: true },
        where: { id },
      });

    return PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
      physicalcustomerquotetablePrisma,
      physicalcustomerquotetablePrisma.AdressOrigin,
      physicalcustomerquotetablePrisma.AdressDestiny,
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
        include: { AdressDestiny: true, AdressOrigin: true },
      });

    return physicalcustomerquotetables.map(physicalcustomerquotetable =>
      PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
        physicalcustomerquotetable,
        physicalcustomerquotetable.AdressOrigin,
        physicalcustomerquotetable.AdressDestiny,
      ),
    );
  }

  updateManyPhysicalCustomerQuoteTable(
    data: PhysicalCustomerQuoteTable[],
  ): Promise<PhysicalCustomerQuoteTable[]> {
    console.log(data);
    const physicalcustomerquotetableUpdate = this.prisma.$transaction(
      async tx => {
        const promises = data.map(async physicalcustomerquotetable => {
          const physicalcustomerquotetablePrisma =
            await tx.physicalCustomerQuoteTable.update({
              data: PhysicalCustomerQuoteTablePrismaDTO.EntityToPrismaUpdate(
                physicalcustomerquotetable,
              ),
              where: { id: physicalcustomerquotetable.id },
              include: { AdressDestiny: true, AdressOrigin: true },
            });

          return PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
            physicalcustomerquotetablePrisma,
            physicalcustomerquotetablePrisma.AdressOrigin,
            physicalcustomerquotetablePrisma.AdressDestiny,
          );
        });

        return Promise.all(promises);
      },
    );

    return physicalcustomerquotetableUpdate;
  }

  async deletePhysicalCustomerQuoteTable(
    id: string,
  ): Promise<PhysicalCustomerQuoteTable> {
    const data = await this.prisma.physicalCustomerQuoteTable.delete({
      where: { id },
      include: { AdressDestiny: true, AdressOrigin: true },
    });

    return PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
      data,
      data.AdressOrigin,
      data.AdressDestiny,
    );
  }
  deleteManyPhysicalCustomerQuoteTable(
    ids: string[],
  ): Promise<PhysicalCustomerQuoteTable[]> {
    const physicalcustomerquotetableDeleted = this.prisma.$transaction(
      async tx => {
        const promises = ids.map(async icmdsId => {
          const physicalcustomerquotetablePrisma =
            await tx.physicalCustomerQuoteTable.delete({
              where: { id: icmdsId },
              include: { AdressDestiny: true, AdressOrigin: true },
            });

          return PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
            physicalcustomerquotetablePrisma,
            physicalcustomerquotetablePrisma.AdressOrigin,
            physicalcustomerquotetablePrisma.AdressDestiny,
          );
        });

        return Promise.all(promises);
      },
    );

    return physicalcustomerquotetableDeleted;
  }
}
