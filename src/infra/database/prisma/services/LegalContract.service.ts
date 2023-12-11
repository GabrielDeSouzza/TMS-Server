import { Injectable } from '@nestjs/common';

import { type LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';
import { type LegalContractRepository } from 'domain/repositories/LegalContract.repository';

import { PrismaService } from '../prisma.service';
import { LegalContractPrismaDTO } from './prismaDTO/LegalContractPrismaDto';

@Injectable()
export class LegalContractPrismaService implements LegalContractRepository {
  constructor(private prisma: PrismaService) {}
  async findLegalContractById(
    id?: string | '',
    contract_number?: string | '',
  ): Promise<LegalContract> {
    let legalContract;

    if (!id && !contract_number) {
      throw new Error('ID OR CONTRACT NUMBER IS REQUIRED');
    } else if (id) {
      legalContract = await this.prisma.legalContract.findFirst({
        where: { id },
      });
    } else {
      legalContract = await this.prisma.legalContract.findFirst({
        where: { contract_number },
      });
    }

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

  async getAllLegalContract(): Promise<LegalContract[]> {
    const legalContracts = await this.prisma.legalContract.findMany();

    return legalContracts.map(legalContract =>
      LegalContractPrismaDTO.PrismaToEntity(legalContract),
    );
  }
}
