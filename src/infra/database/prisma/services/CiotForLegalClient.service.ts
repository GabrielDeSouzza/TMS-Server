import { Injectable } from '@nestjs/common';

import { type CiotForLegalClient } from 'domain/entities/LegalClientEntities/CiotForLegalPerson/CiotForLegalClient';
import { type CiotForLegalClientRepository } from 'domain/repositories/CiotForLegalClient.repository';

import { PrismaService } from '../prisma.service';
import { CiotForLegalClientPrismaDTO } from './prismaDTO/CiotForLegalClientPrismaDto';

@Injectable()
export class CiotForLegalClientPrismaService
  implements CiotForLegalClientRepository
{
  constructor(private prisma: PrismaService) {}

  async findCiotForLegalClientById(id: string): Promise<CiotForLegalClient> {
    const ciotForLegalClient =
      await this.prisma.ciotForLegalClient.findFirstOrThrow({
        where: { id },
      });

    return CiotForLegalClientPrismaDTO.PrismaToEntity(ciotForLegalClient);
  }
  async createCiotForLegalClient(
    ciotForLegalClient: CiotForLegalClient,
  ): Promise<CiotForLegalClient> {
    const ciotForLegalClientPrisma =
      await this.prisma.ciotForLegalClient.create({
        data: CiotForLegalClientPrismaDTO.EntityToCreatePrisma(
          ciotForLegalClient,
        ),
      });

    return CiotForLegalClientPrismaDTO.PrismaToEntity(ciotForLegalClientPrisma);
  }
  async updateCiotForLegalClient(
    id: string,
    ciotForLegalClient?: CiotForLegalClient,
  ): Promise<CiotForLegalClient> {
    const ciotForLegalClientPrisma =
      await this.prisma.ciotForLegalClient.update({
        data: CiotForLegalClientPrismaDTO.EntityToPrismaUpdate(
          ciotForLegalClient,
        ),
        where: { id },
      });

    return CiotForLegalClientPrismaDTO.PrismaToEntity(ciotForLegalClientPrisma);
  }

  async getAllCiotForLegalClient(): Promise<CiotForLegalClient[]> {
    const ciotForLegalClients = await this.prisma.ciotForLegalClient.findMany();

    return ciotForLegalClients.map(ciotForLegalClient =>
      CiotForLegalClientPrismaDTO.PrismaToEntity(ciotForLegalClient),
    );
  }
  async fingCiotsByContract(idContract: string): Promise<CiotForLegalClient[]> {
    const ciots = await this.prisma.ciotForLegalClient.findMany({
      where: { legal_contract_id: idContract },
    });

    return ciots.map(ciot => CiotForLegalClientPrismaDTO.PrismaToEntity(ciot));
  }
}
