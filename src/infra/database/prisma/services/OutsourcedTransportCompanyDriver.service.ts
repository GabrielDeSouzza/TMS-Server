import { Injectable } from '@nestjs/common';

import { type FindAllOutsourcedTransportCompanyDriverWhereRequestDTO } from 'domain/dto/repositories/OutsourcedTransportCompanyDriverRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type OutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';
import { type OutsourcedTransportCompanyDriverRepository } from 'domain/repositories/OutsourcedTransportCompanyDriver.repository';

import { PrismaService } from '../prisma.service';
import { OutsourcedTransportCompanyDriverPrismaDTO } from './prismaDTO/OutsourcedTransportCompanyDriverPrismaDto';

@Injectable()
export class OutsourcedTransportCompanyDriverPrismaService
  implements OutsourcedTransportCompanyDriverRepository
{
  constructor(private prisma: PrismaService) {}
  async findOutsourcedTransportCompanyDriverById(
    id: string,
  ): Promise<OutsourcedTransportCompanyDriver> {
    const outsourcedTransportCompanyDriver =
      await this.prisma.outsourcedTransportCompanyDriver.findFirstOrThrow({
        where: { id },
      });

    return OutsourcedTransportCompanyDriverPrismaDTO.PrismaToEntity(
      outsourcedTransportCompanyDriver,
    );
  }
  async createOutsourcedTransportCompanyDriver(
    outsourcedTransportCompanyDriver: OutsourcedTransportCompanyDriver,
    naturalPerson: NaturalPerson,
  ): Promise<OutsourcedTransportCompanyDriver> {
    const outsourcedTransportCompanyDriverPrisma =
      await this.prisma.outsourcedTransportCompanyDriver.create({
        data: OutsourcedTransportCompanyDriverPrismaDTO.EntityToCreatePrisma(
          outsourcedTransportCompanyDriver,
          naturalPerson,
        ),
      });

    return OutsourcedTransportCompanyDriverPrismaDTO.PrismaToEntity(
      outsourcedTransportCompanyDriverPrisma,
    );
  }
  async updateOutsourcedTransportCompanyDriver(
    id: string,
    outsourcedTransportCompanyDriver?: OutsourcedTransportCompanyDriver,
    naturalPerson?: NaturalPerson,
  ): Promise<OutsourcedTransportCompanyDriver> {
    const outsourcedTransportCompanyDriverPrisma =
      await this.prisma.outsourcedTransportCompanyDriver.update({
        data: OutsourcedTransportCompanyDriverPrismaDTO.EntityToPrismaUpdate(
          outsourcedTransportCompanyDriver,
          naturalPerson,
        ),
        where: { id },
      });

    return OutsourcedTransportCompanyDriverPrismaDTO.PrismaToEntity(
      outsourcedTransportCompanyDriverPrisma,
    );
  }

  async getAllOutsourcedTransportCompanyDriver(
    parameters: FindAllOutsourcedTransportCompanyDriverWhereRequestDTO,
  ): Promise<OutsourcedTransportCompanyDriver[]> {
    const outsourcedTransportCompanyDrivers =
      await this.prisma.outsourcedTransportCompanyDriver.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return outsourcedTransportCompanyDrivers.map(
      outsourcedTransportCompanyDriver =>
        OutsourcedTransportCompanyDriverPrismaDTO.PrismaToEntity(
          outsourcedTransportCompanyDriver,
        ),
    );
  }
}
