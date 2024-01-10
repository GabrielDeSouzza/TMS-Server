import { Injectable } from '@nestjs/common';

import { type FindAllContractOutsourcedDriverWhereRequestDTO } from 'domain/dto/repositories/ContractOutsourcedDriverRepositoryDto';
import { type ContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { type ContractOutsourcedDriverRepository } from 'domain/repositories/ContractOutsourcedDriverResitory';

import { PrismaService } from '../prisma.service';
import { ContractOutsourcedDriverPrismaDto } from './prismaDTO/ContracOutsourcedDriverPrisma';

@Injectable()
export class ContractOutsourcedDriverPrismaService
  implements ContractOutsourcedDriverRepository
{
  constructor(private prisma: PrismaService) {}
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
}
