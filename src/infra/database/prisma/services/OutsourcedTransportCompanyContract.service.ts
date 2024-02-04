import { Injectable } from '@nestjs/common';

import { type FindAllOutsourcedTransportCompanyContractWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedTransportCompanyContractRepositoryDto';
import { type OutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';
import { type OutsourcedTransportCompanyContractRepository } from 'domain/repositories/OutsourcedTransportCompanyContract.repository';

import { PrismaService } from '../prisma.service';
import { OutsourcedTransportCompanyContractPrismaDTO } from './prismaDTO/OutsourcedTransportCompanyContractPrismaDto';

@Injectable()
export class OutsourcedTransportCompanyContractPrismaService
  implements OutsourcedTransportCompanyContractRepository
{
  constructor(private prisma: PrismaService) {}
  async findOutsourcedTransportCompanyContractById(
    id: string,
  ): Promise<OutsourcedTransportCompanyContract> {
    const outsourcedTransportCompanyContract =
      await this.prisma.outsourcedTransportCompanyContract.findFirstOrThrow({
        where: { id },
      });

    return OutsourcedTransportCompanyContractPrismaDTO.PrismaToEntity(
      outsourcedTransportCompanyContract,
    );
  }
  async createOutsourcedTransportCompanyContract(
    outsourcedTransportCompanyContract: OutsourcedTransportCompanyContract,
  ): Promise<OutsourcedTransportCompanyContract> {
    const outsourcedTransportCompanyContractPrisma =
      await this.prisma.outsourcedTransportCompanyContract.create({
        data: OutsourcedTransportCompanyContractPrismaDTO.EntityToCreatePrisma(
          outsourcedTransportCompanyContract,
        ),
      });

    return OutsourcedTransportCompanyContractPrismaDTO.PrismaToEntity(
      outsourcedTransportCompanyContractPrisma,
    );
  }
  async updateOutsourcedTransportCompanyContract(
    id: string,
    outsourcedTransportCompanyContract?: OutsourcedTransportCompanyContract,
  ): Promise<OutsourcedTransportCompanyContract> {
    const outsourcedTransportCompanyContractPrisma =
      await this.prisma.outsourcedTransportCompanyContract.update({
        data: OutsourcedTransportCompanyContractPrismaDTO.EntityToPrismaUpdate(
          outsourcedTransportCompanyContract,
        ),
        where: { id },
      });

    return OutsourcedTransportCompanyContractPrismaDTO.PrismaToEntity(
      outsourcedTransportCompanyContractPrisma,
    );
  }

  async getAllOutsourcedTransportCompanyContract(
    parameters: FindAllOutsourcedTransportCompanyContractWhereRequestDTO,
  ): Promise<OutsourcedTransportCompanyContract[]> {
    const outsourcedTransportCompanyContracts =
      await this.prisma.outsourcedTransportCompanyContract.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return outsourcedTransportCompanyContracts.map(
      outsourcedTransportCompanyContract =>
        OutsourcedTransportCompanyContractPrismaDTO.PrismaToEntity(
          outsourcedTransportCompanyContract,
        ),
    );
  }
}
