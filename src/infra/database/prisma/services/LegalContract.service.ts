import { Injectable } from '@nestjs/common';

import { type FindAllLegalContractWhereRequestDTO } from 'domain/dto/repositories/LegalContractRepositoryDto';
import { type LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';
import { type LegalContractRepository } from 'domain/repositories/LegalContract.repository';

import { PrismaService } from '../prisma.service';
import { LegalContractPrismaDTO } from './prismaDTO/LegalContractPrismaDto';

@Injectable()
export class LegalContractPrismaService implements LegalContractRepository {
  constructor(private prisma: PrismaService) {}
  async findLegalContract(
    id?: string,
    contract_number?: string,
  ): Promise<LegalContract> {
    const legalContract = await this.prisma.legalContract.findFirst({
      where: { OR: [{ id }, { contract_number }] },
    });

    return LegalContractPrismaDTO.PrismaToEntity(legalContract);
  }
  async createLegalContract(
    legalContract: LegalContract,
  ): Promise<LegalContract> {
    const legalContractPrisma = await this.prisma.legalContract.create({
      data: LegalContractPrismaDTO.EntityToCreatePrisma(legalContract),
    });

    return LegalContractPrismaDTO.PrismaToEntity(legalContractPrisma);
  }
  async updateLegalContract(
    id: string,
    legalContract?: LegalContract,
  ): Promise<LegalContract> {
    const legalContractPrisma = await this.prisma.legalContract.update({
      data: LegalContractPrismaDTO.EntityToPrismaUpdate(legalContract),
      where: { id },
    });

    return LegalContractPrismaDTO.PrismaToEntity(legalContractPrisma);
  }

  async getAllLegalContract(
    parameters: FindAllLegalContractWhereRequestDTO,
  ): Promise<LegalContract[]> {
    const legalContracts = await this.prisma.legalContract.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return legalContracts.map(legalContract =>
      LegalContractPrismaDTO.PrismaToEntity(legalContract),
    );
  }
}
