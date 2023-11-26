import { Injectable } from '@nestjs/common';

import { type LegalClient } from 'domain/entities/legalClientEntities/LegalClient/LegalClient';
import { type LegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';
import { type LegalClientRepository } from 'domain/repositories/LegalClientRepositoy';

import { PrismaService } from '../prisma.service';
import { LegalClientPrismaDTO } from './prismaDTO/LegalClientPrismaDto';

@Injectable()
export class LegalClientPrismaService implements LegalClientRepository {
  constructor(private prisma: PrismaService) {}
  async findLegalClientById(id: string): Promise<LegalClient> {
    const legalClient = await this.prisma.legalClient.findFirstOrThrow({
      where: { id },
    });

    return LegalClientPrismaDTO.PrismaToEntity(legalClient);
  }
  async createLegalClient(
    legalClient: LegalClient,
    legalPerson: LegalPerson,
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
    console.error('test', legalPerson);

    const legalClientPrisma = await this.prisma.legalClient.update({
      data: LegalClientPrismaDTO.EntityToPrismaUpdate(legalClient, legalPerson),
      where: { id },
    });

    return LegalClientPrismaDTO.PrismaToEntity(legalClientPrisma);
  }

  async getAllLegalClient(): Promise<LegalClient[]> {
    const legalClients = await this.prisma.legalClient.findMany();

    return legalClients.map(legalClient =>
      LegalClientPrismaDTO.PrismaToEntity(legalClient),
    );
  }
}
