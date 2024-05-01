import { Injectable } from '@nestjs/common';

import { type GetOutsoucedDriverDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedDriverDto';
import {
  type CountOutsourcedDriverRequestDTO,
  type FindAllOutsourcedDriverWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/OutsourcedDriverRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type OutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/outsourcedDriver/OutsourcedDriver';
import {
  type OutsourcedDriverCompanyUpdateDTO,
  type OutsourcedDriverRepository,
} from 'domain/repositories/OutsourcedDriverRepository';

import { PrismaService } from '../prisma.service';
import { OutsourcedDriverPrismaDTO } from './prismaDTO/OutsouredDriverPrismaDto';

@Injectable()
export class OutsourcedDriverPrismaService
  implements OutsourcedDriverRepository
{
  constructor(private prisma: PrismaService) {}
  countOutsourcedDriver(
    request: CountOutsourcedDriverRequestDTO,
  ): Promise<number> {
    return this.prisma.outsourcedDriver.count({
      where: request.where ?? undefined,
    });
  }
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

  updateManyOutsourcedDriver(
    data: OutsourcedDriverCompanyUpdateDTO[],
  ): Promise<OutsourcedDriver[]> {
    console.log(data);
    const outsourceddriverUpdate = this.prisma.$transaction(async tx => {
      const promises = data.map(async outsourceddriver => {
        const outsourceddriverPrisma = await tx.outsourcedDriver.update({
          data: OutsourcedDriverPrismaDTO.EntityToPrismaUpdate(
            outsourceddriver.outsourcedDriver,
            outsourceddriver.naturalPerson,
          ),
          where: { id: outsourceddriver.outsourcedDriver.id },
        });

        return OutsourcedDriverPrismaDTO.PrismaToEntity(outsourceddriverPrisma);
      });

      return Promise.all(promises);
    });

    return outsourceddriverUpdate;
  }

  async deleteOutsourcedDriver(id: string): Promise<OutsourcedDriver> {
    return OutsourcedDriverPrismaDTO.PrismaToEntity(
      await this.prisma.outsourcedDriver.delete({ where: { id } }),
    );
  }
  deleteManyOutsourcedDriver(ids: string[]): Promise<OutsourcedDriver[]> {
    const outsourceddriverDeleted = this.prisma.$transaction(async tx => {
      const promises = ids.map(async icmdsId => {
        const outsourceddriverPrisma = await tx.outsourcedDriver.delete({
          where: { id: icmdsId },
        });

        return OutsourcedDriverPrismaDTO.PrismaToEntity(outsourceddriverPrisma);
      });

      return Promise.all(promises);
    });

    return outsourceddriverDeleted;
  }
}
