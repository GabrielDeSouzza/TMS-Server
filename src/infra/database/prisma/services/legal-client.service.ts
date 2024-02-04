import { Injectable } from '@nestjs/common';

import {
  type getLegalClientData,
  type FindAllLegalClientWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalClientRepositoryDto';
import { type LegalClient } from 'domain/entities/LegalClientEntities/LegalClient/LegalClient';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type LegalClientRepository } from 'domain/repositories/LegalClientRepositoy';

import { PrismaService } from '../prisma.service';
import { LegalClientPrismaDTO } from './prismaDTO/LegalClientPrismaDto';

@Injectable()
export class LegalClientPrismaService implements LegalClientRepository {
  constructor(private prisma: PrismaService) {}
  async findLegalClient(data: getLegalClientData): Promise<LegalClient> {
    const legalClient = await this.prisma.legalClient.findFirstOrThrow({
      where: {
        OR: [
          { id: data.id },
          { LegalPerson: { fantasy_name: data.fantasyName } },
          { LegalPerson: { corporate_name: data.corporateName } },
          { LegalPerson: { cnpj: data.cnpj } },
        ],
      },
    });

    return LegalClientPrismaDTO.PrismaToEntity(legalClient);
  }
  async createLegalClient(
    legalClient: LegalClient,
    legalPerson?: LegalPerson,
    idLegalPerson?: string,
  ): Promise<LegalClient> {
    const legalClientPrisma = await this.prisma.legalClient.create({
      data: LegalClientPrismaDTO.EntityToCreatePrisma(
        legalClient,
        legalPerson,
        idLegalPerson,
      ),
    });

    return LegalClientPrismaDTO.PrismaToEntity(legalClientPrisma);
  }
  async updateLegalClient(
    id: string,
    legalClient?: LegalClient,
    legalPerson?: LegalPerson,
  ): Promise<LegalClient> {
    const legalClientPrisma = await this.prisma.legalClient.update({
      data: LegalClientPrismaDTO.EntityToPrismaUpdate(legalClient, legalPerson),
      where: { id },
    });

    return LegalClientPrismaDTO.PrismaToEntity(legalClientPrisma);
  }

  async getAllLegalClient(
    parameters: FindAllLegalClientWhereRequestDTO,
  ): Promise<LegalClient[]> {
    const legalClients = await this.prisma.legalClient.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return legalClients.map(legalClient =>
      LegalClientPrismaDTO.PrismaToEntity(legalClient),
    );
  }
}
