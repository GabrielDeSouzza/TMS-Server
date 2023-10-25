import { Injectable } from '@nestjs/common';

import { type IContractOutsourcedDriver } from 'domain/entities/personEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { type ContractOutsourcedDriverRepository } from 'domain/repositories/ContractOutsourcedDriverResitory';

import { PrismaService } from '../prisma.service';
import { ContractOutsourcedDriverPrismaDto } from './prismaDTO/ContracOutsourcedDriverPrisma';

@Injectable()
export class ContractOutsourcedDriverPrismaService
  implements ContractOutsourcedDriverRepository
{
  constructor(private prisma: PrismaService) {}
  async findAllContracOutsourcedDriverByOutsourcedDriverId(
    outsoucedDriverId: string,
  ): Promise<IContractOutsourcedDriver[]> {
    const contracts = await this.prisma.contractOutsourcedDriver.findMany({
      where: { outsourced_driver_id: outsoucedDriverId },
    });

    return contracts.map(contract =>
      ContractOutsourcedDriverPrismaDto.PrismaToEntity(contract),
    );
  }
  async findContractOutsourcedDriverById(
    id: string,
  ): Promise<IContractOutsourcedDriver> {
    return ContractOutsourcedDriverPrismaDto.PrismaToEntity(
      await this.prisma.contractOutsourcedDriver.findFirstOrThrow({
        where: { id },
      }),
    );
  }
  async findAllContracOutsourcedDriverByCpf(
    cpf: string,
  ): Promise<IContractOutsourcedDriver[]> {
    const contracts = await this.prisma.contractOutsourcedDriver.findMany({
      where: { cpf },
    });

    return contracts.map(contract =>
      ContractOutsourcedDriverPrismaDto.PrismaToEntity(contract),
    );
  }
  async findAllContracOutsourcedDriver(): Promise<IContractOutsourcedDriver[]> {
    const contracts = await this.prisma.contractOutsourcedDriver.findMany();

    return contracts.map(contract =>
      ContractOutsourcedDriverPrismaDto.PrismaToEntity(contract),
    );
  }
}
