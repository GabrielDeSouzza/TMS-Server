import { Injectable } from '@nestjs/common';

import { type GetLegalClientQuoteTableDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientQuoteTableDto';
import { type FindAllLegalClientQuoteTableWhereRequestDTO } from 'domain/dto/repositories/whereDtos/LegalClientQuoteTableRepositoryDto';
import { type LegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';
import { type LegalClientQuoteTableRepository } from 'domain/repositories/LegalClientQuoteTable.repository';

import { PrismaService } from '../prisma.service';
import { LegalClientQuoteTablePrismaDTO } from './prismaDTO/LegalClientQuoteTablePrismaDto';

@Injectable()
export class LegalClientQuoteTablePrismaService
  implements LegalClientQuoteTableRepository
{
  constructor(private prisma: PrismaService) {}
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
}
