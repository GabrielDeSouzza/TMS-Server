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
        include: { AdressDestiny: true, AdressOrigin: true },
      });

    return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
      legalclientquotetable,
      legalclientquotetable?.AdressOrigin,
      legalclientquotetable?.AdressDestiny,
    );
  }
  async createLegalClientQuoteTable(
    legalclientquotetable: LegalClientQuoteTable,
  ): Promise<LegalClientQuoteTable> {
    const legalclientquotetablePrisma =
      await this.prisma.legalClientQuoteTable.create({
        data: LegalClientQuoteTablePrismaDTO.EntityToCreatePrisma(
          legalclientquotetable,
        ),
        include: { AdressDestiny: true, AdressOrigin: true },
      });

    return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
      legalclientquotetablePrisma,
      legalclientquotetablePrisma.AdressOrigin,
      legalclientquotetablePrisma.AdressDestiny,
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
        include: { AdressDestiny: true, AdressOrigin: true },
        where: { id },
      });

    return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
      legalclientquotetablePrisma,
      legalclientquotetablePrisma.AdressOrigin,
      legalclientquotetablePrisma.AdressDestiny,
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
        include: { AdressDestiny: true, AdressOrigin: true },
      });

    return legalclientquotetables.map(legalclientquotetable =>
      LegalClientQuoteTablePrismaDTO.PrismaToEntity(
        legalclientquotetable,
        legalclientquotetable.AdressOrigin,
        legalclientquotetable.AdressDestiny,
      ),
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
            include: { AdressDestiny: true, AdressOrigin: true },
          });

        return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
          legalclientquotetablePrisma,
          legalclientquotetablePrisma.AdressOrigin,
          legalclientquotetablePrisma.AdressDestiny,
        );
      });

      return Promise.all(promises);
    });

    return legalclientquotetableUpdate;
  }

  async deleteLegalClientQuoteTable(
    id: string,
  ): Promise<LegalClientQuoteTable> {
    const data = await this.prisma.legalClientQuoteTable.delete({
      where: { id },
      include: { AdressDestiny: true, AdressOrigin: true },
    });

    return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
      data,
      data.AdressOrigin,
      data.AdressDestiny,
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
            include: { AdressDestiny: true, AdressOrigin: true },
          });

        return LegalClientQuoteTablePrismaDTO.PrismaToEntity(
          legalclientquotetablePrisma,
          legalclientquotetablePrisma.AdressOrigin,
          legalclientquotetablePrisma.AdressDestiny,
        );
      });

      return Promise.all(promises);
    });

    return legalclientquotetableDeleted;
  }
}
