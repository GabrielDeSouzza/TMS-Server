import { Injectable } from '@nestjs/common';

import { type GetOutsoucedDriverDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedDriverDto';
import { type FindAllOutsourcedDriverWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedDriverRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type OutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/outsourcedDriver/OutsourcedDriver';
import { type OutsourcedDriverRepository } from 'domain/repositories/OutsourcedDriverRepository';

import { PrismaService } from '../prisma.service';
import { OutsourcedDriverPrismaDTO } from './prismaDTO/OutsouredDriverPrismaDto';

@Injectable()
export class OutsourcedDriverPrismaService
  implements OutsourcedDriverRepository
{
  constructor(private prisma: PrismaService) {}
  async createOutsourcedDriver(
    outsourcedDriver: OutsourcedDriver,
    naturalPerson: NaturalPerson,
  ): Promise<OutsourcedDriver> {
    return OutsourcedDriverPrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedDriver.create({
        data: OutsourcedDriverPrismaDTO.EntityToCreatePrisma(
          outsourcedDriver,
          naturalPerson,
        ),
      }),
    );
  }
  async findOutsourcedDriver(
    request: GetOutsoucedDriverDTO,
  ): Promise<OutsourcedDriver> {
    return OutsourcedDriverPrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedDriver.findFirst({
        where: {
          OR: [
            { id: request.id },
            { cnh: request.cnh },
            { natural_person_id: request.naturalPersonId },
            { NaturalPerson: { cpf: request.cpf } },
            { NaturalPerson: { rg: request.rg } },
          ],
        },
      }),
    );
  }

  async updateOutsourcedDriver(
    id: string,
    outsourcedDriver: OutsourcedDriver,
    naturalPerson: NaturalPerson,
  ): Promise<OutsourcedDriver> {
    return OutsourcedDriverPrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedDriver.update({
        data: OutsourcedDriverPrismaDTO.EntityToPrismaUpdate(
          outsourcedDriver,
          naturalPerson,
        ),
        where: { id },
      }),
    );
  }
  async findAllOutsourcedDriver(
    parameters: FindAllOutsourcedDriverWhereRequestDTO,
  ): Promise<OutsourcedDriver[]> {
    const outsourcedDrivesPrisma = await this.prisma.outsourcedDriver.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return outsourcedDrivesPrisma.map(outDriver =>
      OutsourcedDriverPrismaDTO.PrismaToEntity(outDriver),
    );
  }
}
