import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOwnDriverDTO } from 'domain/dto/repositories/getDataDtos/GetOwnDriverDto';
import {
  type CountAllOwnDriversWhereRequestDTO,
  type UpdateManyOwnDriversDTO,
  type FindAllOwnDriverWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/OwnDriverRepositoryDto';
import { type OwnDriver } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type OwnDriverRepository } from 'domain/repositories/OwnDriverRepository';

import { PrismaService } from '../prisma.service';
import { OwnDriverPrismaDTO } from './prismaDTO/OwnDriverPrismaDto';

@Injectable()
export class OwnDriverService implements OwnDriverRepository {
  constructor(private prisma: PrismaService) {}

  async count(parameters: CountAllOwnDriversWhereRequestDTO): Promise<number> {
    const count = this.prisma.ownDriver.count({ where: parameters.where });

    return count;
  }

  async delete(id: string): Promise<OwnDriver> {
    const ownDriver = await this.prisma.ownDriver.findUnique({
      where: { id },
    });

    if (!ownDriver) {
      throw new GraphQLError('OwnDriver not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const ownDriverPrisma = await this.prisma.ownDriver.delete({
      where: { id },
    });

    if (!ownDriverPrisma) {
      throw new GraphQLError('OwnDriver not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const ownDriverDomain = OwnDriverPrismaDTO.PrismaToEntity(ownDriverPrisma);

    return ownDriverDomain;
  }

  async updateMany(ownDriver: UpdateManyOwnDriversDTO[]): Promise<OwnDriver[]> {
    const ownDrivers: OwnDriver[] = [];

    await Promise.all(
      ownDriver.map(async item => {
        const ownDriver = await this.prisma.ownDriver.findUnique({
          where: { id: item.id },
        });

        if (!ownDriver) {
          throw new GraphQLError(`OwnDriver with id "${item.id}" not found!`, {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const ownDriverPrisma = await tx.ownDriver.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!ownDriverPrisma) {
            throw new GraphQLError(
              `OwnDriver with id "${item.id}" not updated!`,
              {
                extensions: { code: HttpStatus.BAD_REQUEST },
              },
            );
          }

          const ownDriverDomain =
            OwnDriverPrismaDTO.PrismaToEntity(ownDriverPrisma);

          ownDrivers.push(ownDriverDomain);
        });
      }),
    );

    return ownDrivers;
  }

  async deleteMany(ids: string[]): Promise<OwnDriver[]> {
    const ownDrivers: OwnDriver[] = [];

    await Promise.all(
      ids.map(async id => {
        const ownDriver = await this.prisma.ownDriver.findUnique({
          where: { id },
        });

        if (!ownDriver) {
          throw new GraphQLError('OwnDriver not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const ownDriverPrisma = await tx.ownDriver.delete({
            where: { id },
          });

          if (!ownDriverPrisma) {
            throw new GraphQLError('OwnDriver not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const ownDriverDomain =
            OwnDriverPrismaDTO.PrismaToEntity(ownDriverPrisma);

          ownDrivers.push(ownDriverDomain);
        });
      }),
    );

    return ownDrivers;
  }

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
