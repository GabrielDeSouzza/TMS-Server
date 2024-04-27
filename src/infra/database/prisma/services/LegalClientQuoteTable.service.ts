import { Injectable } from '@nestjs/common';

import { type GetLegalClientQuoteTableDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientQuoteTableDto';
import {
  type CountLegalClientQuoteTableRequestDTO,
  type FindAllLegalClientQuoteTableWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalClientQuoteTableRepositoryDto';
import { type LegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';
import { type LegalClientQuoteTableRepository } from 'domain/repositories/LegalClientQuoteTable.repository';

import { PrismaService } from '../prisma.service';
import { LegalClientQuoteTablePrismaDTO } from './prismaDTO/LegalClientQuoteTablePrismaDto';

@Injectable()
export class LegalClientQuoteTablePrismaService
  implements LegalClientQuoteTableRepository
{
  constructor(private prisma: PrismaService) {}
  countLegalClientQuoteTable(
    request: CountLegalClientQuoteTableRequestDTO,
  ): Promise<number> {
    return this.prisma.legalClientQuoteTable.count({
      where: request.where ?? undefined,
    });
  }
  async findLegalClientQuoteTable(
    request: GetLegalClientQuoteTableDTO,
  ): Promise<LegalClientQuoteTable> {
    const legalclientquotetable =
      await this.prisma.legalClientQuoteTable.findFirst({
        where: {
          OR: [{ id: request.id }, { cod_quote: request.codQuote }],
        },
      });

    return LegalClientQuoteTablePrismaDTO.PrismaToEntity(legalclientquotetable);
  }
  async createLegalClientQuoteTable(
    legalclientquotetable: LegalClientQuoteTable,
  ): Promise<LegalClientQuoteTable> {
    const legalclientquotetablePrisma =
      await this.prisma.legalClientQuoteTable.create({
        data: LegalClientQuoteTablePrismaDTO.EntityToCreatePrisma(
          legalclientquotetable,
        ),
      });

    return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
      legalclientquotetablePrisma,
    );
  }
  async updateLegalClientQuoteTable(
    id: string,
    legalclientquotetable?: LegalClientQuoteTable,
  ): Promise<LegalClientQuoteTable> {
    const legalclientquotetablePrisma =
      await this.prisma.legalClientQuoteTable.update({
        data: LegalClientQuoteTablePrismaDTO.EntityToPrismaUpdate(
          legalclientquotetable,
        ),
        where: { id },
      });

    return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
      legalclientquotetablePrisma,
    );
  }

  async findAllLegalClientQuoteTable(
    parameters: FindAllLegalClientQuoteTableWhereRequestDTO,
  ): Promise<LegalClientQuoteTable[]> {
    const legalclientquotetables =
      await this.prisma.legalClientQuoteTable.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return legalclientquotetables.map(legalclientquotetable =>
      LegalClientQuoteTablePrismaDTO.PrismaToEntity(legalclientquotetable),
    );
  }
  updateManyLegalClientQuoteTable(
    data: LegalClientQuoteTable[],
  ): Promise<LegalClientQuoteTable[]> {
    console.log(data);
    const legalclientquotetableUpdate = this.prisma.$transaction(async tx => {
      const promises = data.map(async legalclientquotetable => {
        const legalclientquotetablePrisma =
          await tx.legalClientQuoteTable.update({
            data: LegalClientQuoteTablePrismaDTO.EntityToPrismaUpdate(
              legalclientquotetable,
            ),
            where: { id: legalclientquotetable.id },
          });

        return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
          legalclientquotetablePrisma,
        );
      });

      return Promise.all(promises);
    });

    return legalclientquotetableUpdate;
  }

  async deleteLegalClientQuoteTable(
    id: string,
  ): Promise<LegalClientQuoteTable> {
    return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
      await this.prisma.legalClientQuoteTable.delete({ where: { id } }),
    );
  }
  deleteManyLegalClientQuoteTable(
    ids: string[],
  ): Promise<LegalClientQuoteTable[]> {
    const legalclientquotetableDeleted = this.prisma.$transaction(async tx => {
      const promises = ids.map(async icmdsId => {
        const legalclientquotetablePrisma =
          await tx.legalClientQuoteTable.delete({
            where: { id: icmdsId },
          });

        return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
          legalclientquotetablePrisma,
        );
      });

      return Promise.all(promises);
    });

    return legalclientquotetableDeleted;
  }
}
