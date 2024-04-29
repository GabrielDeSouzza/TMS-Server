import { Injectable } from '@nestjs/common';

import { type GetLegalContractDTO } from 'domain/dto/repositories/getDataDtos/GetLegalContractDto';
import {
  type CountLegalContractRequestDTO,
  type FindAllLegalContractWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalContractRepositoryDto';
import { type LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';
import { type LegalContractRepository } from 'domain/repositories/LegalContract.repository';

import { PrismaService } from '../prisma.service';
import { LegalContractPrismaDTO } from './prismaDTO/LegalContractPrismaDto';

@Injectable()
export class LegalContractPrismaService implements LegalContractRepository {
  constructor(private prisma: PrismaService) {}
  countLegalContract(request: CountLegalContractRequestDTO): Promise<number> {
    return this.prisma.legalContract.count({
      where: request.where ?? undefined,
    });
  }
  async findLegalContract(
    request: GetLegalContractDTO,
  ): Promise<LegalContract> {
    const legalContract = await this.prisma.legalContract.findFirst({
      where: {
        OR: [{ id: request.id }, { contract_number: request.contractNumber }],
      },
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
  updateManyLegalContract(data: LegalContract[]): Promise<LegalContract[]> {
    console.log(data);
    const legalcontractUpdate = this.prisma.$transaction(async tx => {
      const promises = data.map(async legalcontract => {
        const legalcontractPrisma = await tx.legalContract.update({
          data: LegalContractPrismaDTO.EntityToPrismaUpdate(legalcontract),
          where: { id: legalcontract.id },
        });

        return LegalContractPrismaDTO.PrismaToEntity(legalcontractPrisma);
      });

      return Promise.all(promises);
    });

    return legalcontractUpdate;
  }

  async deleteLegalContract(id: string): Promise<LegalContract> {
    return LegalContractPrismaDTO.PrismaToEntity(
      await this.prisma.legalContract.delete({ where: { id } }),
    );
  }
  deleteManyLegalContract(ids: string[]): Promise<LegalContract[]> {
    const legalcontractDeleted = this.prisma.$transaction(async tx => {
      const promises = ids.map(async icmdsId => {
        const legalcontractPrisma = await tx.legalContract.delete({
          where: { id: icmdsId },
        });

        return LegalContractPrismaDTO.PrismaToEntity(legalcontractPrisma);
      });

      return Promise.all(promises);
    });

    return legalcontractDeleted;
  }
}
