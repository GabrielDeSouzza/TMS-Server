import { Injectable } from '@nestjs/common';

import { type GetContractOutsourcedDriverDTO } from 'domain/dto/repositories/getDataDtos/GetContractOutsourcedDriverDto';
import {
  type CountAllContractOutsourcedDriverWhereRequestDTO,
  type FindAllContractOutsourcedDriverWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/ContractOutsourcedDriverRepositoryDto';
import { type ContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { type ContractOutsourcedDriverRepository } from 'domain/repositories/ContractOutsourcedDriverResitory';

import { PrismaService } from '../prisma.service';
import { ContractOutsourcedDriverPrismaDto } from './prismaDTO/ContracOutsourcedDriverPrisma';

@Injectable()
export class ContractOutsourcedDriverPrismaService
  implements ContractOutsourcedDriverRepository
{
  constructor(private prisma: PrismaService) {}
  countContractOutsourcedDriver(
    request: CountAllContractOutsourcedDriverWhereRequestDTO,
  ): Promise<number> {
    return this.prisma.contractOutsourcedDriver.count({
      where: request.where,
    });
  }

  async getContractOutsourcedDriver(
    request: GetContractOutsourcedDriverDTO,
  ): Promise<ContractOutsourcedDriver> {
    return ContractOutsourcedDriverPrismaDto.PrismaToEntity(
      await this.prisma.contractOutsourcedDriver.findFirst({
        where: {
          OR: [{ id: request.id }, { contract_number: request.contractNumber }],
        },
      }),
    );
  }
  async findAllContracOutsourcedDriver(
    parameters: FindAllContractOutsourcedDriverWhereRequestDTO,
  ): Promise<ContractOutsourcedDriver[]> {
    const contracts = await this.prisma.contractOutsourcedDriver.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return contracts.map(contract =>
      ContractOutsourcedDriverPrismaDto.PrismaToEntity(contract),
    );
  }
  async createContractOutsourcedDriver(
    contract: ContractOutsourcedDriver,
  ): Promise<ContractOutsourcedDriver> {
    return ContractOutsourcedDriverPrismaDto.PrismaToEntity(
      await this.prisma.contractOutsourcedDriver.create({
        data: ContractOutsourcedDriverPrismaDto.EntityCreateToPrisma(contract),
      }),
    );
  }
  async updateContractOutsourcedDriver(
    id: string,
    contract: ContractOutsourcedDriver,
  ): Promise<ContractOutsourcedDriver> {
    return ContractOutsourcedDriverPrismaDto.PrismaToEntity(
      await this.prisma.contractOutsourcedDriver.update({
        data: ContractOutsourcedDriverPrismaDto.EntityToPrismaUpdate(contract),
        where: { id },
      }),
    );
  }

  async updateManyContractOutsourcedDriver(
    data: ContractOutsourcedDriver[],
  ): Promise<ContractOutsourcedDriver[]> {
    const contractsUpdated = await this.prisma.$transaction(async tx => {
      const promises = data.map(async contract => {
        const contractPrisma = await tx.contractOutsourcedDriver.update({
          data: ContractOutsourcedDriverPrismaDto.EntityToPrismaUpdate(
            contract,
          ),
          where: { id: contract.id },
        });

        return ContractOutsourcedDriverPrismaDto.PrismaToEntity(contractPrisma);
      });

      return Promise.all(promises);
    });

    return contractsUpdated;
  }

  async deleteContractOutsourcedDriver(
    id: string,
  ): Promise<ContractOutsourcedDriver> {
    return ContractOutsourcedDriverPrismaDto.PrismaToEntity(
      await this.prisma.contractOutsourcedDriver.delete({
        where: { id },
      }),
    );
  }
  async deleteManyContractOutsourcedDriver(
    ids: string[],
  ): Promise<ContractOutsourcedDriver[]> {
    const contractsDeleted = await this.prisma.$transaction(async tx => {
      const promises = ids.map(async contractId => {
        const contractPrisma = await tx.contractOutsourcedDriver.delete({
          where: { id: contractId },
        });

        return ContractOutsourcedDriverPrismaDto.PrismaToEntity(contractPrisma);
      });

      return Promise.all(promises);
    });

    return contractsDeleted.map(deleted =>
      ContractOutsourcedDriverPrismaDto.PrismaToEntity(deleted),
    );
  }
}
