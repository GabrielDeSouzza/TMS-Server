import { Injectable } from '@nestjs/common';

import { type GetOwnDriverDTO } from 'domain/dto/repositories/getDataDtos/GetOwnDriverDto';
import { type FindAllOwnDriverWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OwnDriverRepositoryDto';
import { type OwnDriver } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type OwnDriverRepository } from 'domain/repositories/OwnDriverRepository';

import { PrismaService } from '../prisma.service';
import { OwnDriverPrismaDTO } from './prismaDTO/OwnDriverPrismaDto';

@Injectable()
export class OwnDriverService implements OwnDriverRepository {
  constructor(private prisma: PrismaService) {}
  async findOwnDriver(request: GetOwnDriverDTO): Promise<OwnDriver> {
    return OwnDriverPrismaDTO.PrismaToEntity(
      await this.prisma.ownDriver.findFirst({
        where: {
          OR: [
            { id: request.id },
            { natural_person_id: request.naturalPersonId },
            { cnh: request.cnh },
            { NaturalPerson: { cpf: request.cpf } },
            { NaturalPerson: { rg: request.rg } },
          ],
        },
      }),
    );
  }
  async createOwnDriver(
    ownDriver: OwnDriver,
    naturalPerson?: NaturalPerson,
    naturalPersonId?: string,
  ): Promise<OwnDriver> {
    return OwnDriverPrismaDTO.PrismaToEntity(
      await this.prisma.ownDriver.create({
        data: OwnDriverPrismaDTO.EntityToCreatePrisma(
          ownDriver,
          naturalPerson,
          naturalPersonId,
        ),
      }),
    );
  }
  async updateOwnDriver(
    id: string,
    ownDriver: OwnDriver,
    naturalPerson: NaturalPerson,
  ) {
    return OwnDriverPrismaDTO.PrismaToEntity(
      await this.prisma.ownDriver.update({
        data: OwnDriverPrismaDTO.EntityToPrismaUpdate(ownDriver, naturalPerson),
        where: { id },
      }),
    );
  }
  async findAllOwnDrivers(
    parameters: FindAllOwnDriverWhereRequestDTO,
  ): Promise<OwnDriver[]> {
    const ownDrives = await this.prisma.ownDriver.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return ownDrives.map(ownDriver =>
      OwnDriverPrismaDTO.PrismaToEntity(ownDriver),
    );
  }
}
