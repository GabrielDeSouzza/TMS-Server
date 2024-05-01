import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import {
  type CountAllLegalClientsWhereRequestDTO,
  type UpdateManyLegalClientsDTO,
  type getLegalClientData,
  type FindAllLegalClientWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalClientRepositoryDto';
import { type LegalClient } from 'domain/entities/LegalClientEntities/LegalClient/LegalClient';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type LegalClientRepository } from 'domain/repositories/LegalClientRepositoy';

import { PrismaService } from '../prisma.service';
import { LegalClientPrismaDTO } from './prismaDTO/LegalClientPrismaDto';

@Injectable()
export class LegalClientPrismaService implements LegalClientRepository {
  constructor(private prisma: PrismaService) {}
  async count(
    parameters: CountAllLegalClientsWhereRequestDTO,
  ): Promise<number> {
    const count = this.prisma.legalClient.count({
      where: parameters.where,
    });

    return count;
  }

  async delete(id: string): Promise<LegalClient> {
    const legalClient = await this.prisma.legalClient.findUnique({
      where: { id },
    });

    if (!legalClient) {
      throw new GraphQLError('Legal Client not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const legalClientPrisma = await this.prisma.legalClient.delete({
      where: { id },
    });

    if (!legalClientPrisma) {
      throw new GraphQLError('Legal Client not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const legalClientDomain =
      LegalClientPrismaDTO.PrismaToEntity(legalClientPrisma);

    return legalClientDomain;
  }

  async updateMany(
    legalClient: UpdateManyLegalClientsDTO[],
  ): Promise<LegalClient[]> {
    const legalClients: LegalClient[] = [];

    await Promise.all(
      legalClient.map(async item => {
        const legalClient = await this.prisma.legalClient.findUnique({
          where: { id: item.id },
        });

        if (!legalClient) {
          throw new GraphQLError(
            `Physical Customer with id "${item.id}" not found!`,
            {
              extensions: { code: HttpStatus.NOT_FOUND },
            },
          );
        }

        await this.prisma.$transaction(async tx => {
          const legalClientPrisma = await tx.legalClient.update({
            where: { id: item.id },
            data: {
              ...item,
            },
          });

          if (!legalClientPrisma) {
            throw new GraphQLError(
              `Legal Client with id "${item.id}" not updated!`,
              {
                extensions: { code: HttpStatus.BAD_REQUEST },
              },
            );
          }

          const legalClientDomain =
            LegalClientPrismaDTO.PrismaToEntity(legalClientPrisma);

          legalClients.push(legalClientDomain);
        });
      }),
    );

    return legalClients;
  }

  async deleteMany(ids: string[]): Promise<LegalClient[]> {
    const legalClients: LegalClient[] = [];

    await Promise.all(
      ids.map(async id => {
        const legalClient = await this.prisma.legalClient.findUnique({
          where: { id },
        });

        if (!legalClient) {
          throw new GraphQLError('Legal Client not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const legalClientPrisma = await tx.legalClient.delete({
            where: { id },
          });

          if (!legalClientPrisma) {
            throw new GraphQLError('Legal Client not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const legalClientDomain =
            LegalClientPrismaDTO.PrismaToEntity(legalClientPrisma);

          legalClients.push(legalClientDomain);
        });
      }),
    );

    return legalClients;
  }

  async findLegalClient(request: getLegalClientData): Promise<LegalClient> {
    const legalClient = await this.prisma.legalClient.findFirst({
      where: {
        OR: [
          { id: request.id },
          { LegalPerson: { fantasy_name: request.fantasyName } },
          { LegalPerson: { corporate_name: request.corporateName } },
          { LegalPerson: { cnpj: request.cnpj } },
        ],
      },
    });

    return LegalClientPrismaDTO.PrismaToEntity(legalClient);
  }
  async createLegalClient(
    legalClient: LegalClient,
    legalPerson?: LegalPerson,
    idLegalPerson?: string,
  ): Promise<LegalClient> {
    const legalClientPrisma = await this.prisma.legalClient.create({
      data: LegalClientPrismaDTO.EntityToCreatePrisma(
        legalClient,
        legalPerson,
        idLegalPerson,
      ),
    });

    return LegalClientPrismaDTO.PrismaToEntity(legalClientPrisma);
  }
  async updateLegalClient(
    id: string,
    legalClient?: LegalClient,
    legalPerson?: LegalPerson,
  ): Promise<LegalClient> {
    const legalClientPrisma = await this.prisma.legalClient.update({
      data: LegalClientPrismaDTO.EntityToPrismaUpdate(legalClient, legalPerson),
      where: { id },
    });

    return LegalClientPrismaDTO.PrismaToEntity(legalClientPrisma);
  }

  async getAllLegalClient(
    parameters: FindAllLegalClientWhereRequestDTO,
  ): Promise<LegalClient[]> {
    const legalClients = await this.prisma.legalClient.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return legalClients.map(legalClient =>
      LegalClientPrismaDTO.PrismaToEntity(legalClient),
    );
  }
}
