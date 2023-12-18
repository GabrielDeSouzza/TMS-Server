import { Injectable } from '@nestjs/common';

import { type LegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';
import { type LegalClientMerchandiseRepository } from 'domain/repositories/LegalClientMerchandise.repository';

import { PrismaService } from '../prisma.service';
import { LegalClientMerchandisePrismaDTO } from './prismaDTO/LegalClientMerchandisePrismaDto';

@Injectable()
export class LegalClientMerchandisePrismaService
  implements LegalClientMerchandiseRepository
{
  constructor(private prisma: PrismaService) {}
  async findLegalClientMerchandisesByOrder(
    legalClientOrderId: string,
  ): Promise<LegalClientMerchandise[]> {
    const merchandises = await this.prisma.legalClientMerchandise.findMany({
      where: { legalClientOrderId },
    });

    return merchandises.map(merchandise =>
      LegalClientMerchandisePrismaDTO.PrismaToEntity(merchandise),
    );
  }
  async findLegalClientMerchandiseById(
    id: string,
  ): Promise<LegalClientMerchandise> {
    const legalClientMerchandise =
      await this.prisma.legalClientMerchandise.findFirstOrThrow({
        where: { id },
      });

    return LegalClientMerchandisePrismaDTO.PrismaToEntity(
      legalClientMerchandise,
    );
  }
  async createLegalClientMerchandise(
    legalClientMerchandise: LegalClientMerchandise,
  ): Promise<LegalClientMerchandise> {
    const legalClientMerchandisePrisma =
      await this.prisma.legalClientMerchandise.create({
        data: LegalClientMerchandisePrismaDTO.EntityToCreatePrisma(
          legalClientMerchandise,
        ),
      });

    return LegalClientMerchandisePrismaDTO.PrismaToEntity(
      legalClientMerchandisePrisma,
    );
  }
  async updateLegalClientMerchandise(
    id: string,
    legalClientMerchandise?: LegalClientMerchandise,
  ): Promise<LegalClientMerchandise> {
    const legalClientMerchandisePrisma =
      await this.prisma.legalClientMerchandise.update({
        data: LegalClientMerchandisePrismaDTO.EntityToPrismaUpdate(
          legalClientMerchandise,
        ),
        where: { id },
      });

    return LegalClientMerchandisePrismaDTO.PrismaToEntity(
      legalClientMerchandisePrisma,
    );
  }

  async getAllLegalClientMerchandise(): Promise<LegalClientMerchandise[]> {
    const legalClientMerchandises =
      await this.prisma.legalClientMerchandise.findMany();

    return legalClientMerchandises.map(legalClientMerchandise =>
      LegalClientMerchandisePrismaDTO.PrismaToEntity(legalClientMerchandise),
    );
  }
}