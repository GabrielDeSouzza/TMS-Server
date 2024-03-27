import { Injectable } from '@nestjs/common';

import { type GetLegalClientCteDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientCteDto';
import { type FindAllLegalClientCteWhereRequestDTO } from 'domain/dto/repositories/whereDtos/LegalClientCteRepository';
import { type LegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';
import { type LegalClientCteRepository } from 'domain/repositories/LegalClientCteRepository';

import { PrismaService } from '../prisma.service';
import { LegalClientCtePrismaDTO } from './prismaDTO/LegalClientCtePrismaDto';

@Injectable()
export class LegalClientCtePrismaService implements LegalClientCteRepository {
  constructor(private prisma: PrismaService) {}

  async findLegalClientCte(
    request: GetLegalClientCteDTO,
  ): Promise<LegalClientCte> {
    console.log(request);

    return LegalClientCtePrismaDTO.PrismaToEntity(
      await this.prisma.legalClientCte.findFirst({
        where: {
          OR: [
            { id: request.id },
            { access_key: request.acessKey },
            { cte_number: request.acessKey },
          ],
        },
      }),
    );
  }
  async createLegalClientCte(
    legalClientCte: LegalClientCte,
  ): Promise<LegalClientCte> {
    LegalClientCtePrismaDTO;

    return LegalClientCtePrismaDTO.PrismaToEntity(
      await this.prisma.legalClientCte.create({
        data: LegalClientCtePrismaDTO.EntityToCreatePrisma(legalClientCte),
      }),
    );
  }
  async updateLegalClientCte(
    id: string,
    legalClientCte: LegalClientCte,
  ): Promise<LegalClientCte> {
    console.log(legalClientCte.cteType);

    return LegalClientCtePrismaDTO.PrismaToEntity(
      await this.prisma.legalClientCte.update({
        data: LegalClientCtePrismaDTO.EntityToPrismaUpdate(legalClientCte),
        where: { id },
      }),
    );
  }
  async findAllLegalClientCtes(
    parameters: FindAllLegalClientCteWhereRequestDTO,
  ): Promise<LegalClientCte[]> {
    const customers = await this.prisma.legalClientCte.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return customers.map(customer =>
      LegalClientCtePrismaDTO.PrismaToEntity(customer),
    );
  }
}
