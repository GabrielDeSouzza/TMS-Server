import { Injectable } from '@nestjs/common';

import { type FindAllNaturalPersonWhereRequestDTO } from 'domain/dto/repositories/NaturalPersonRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';

import { PrismaService } from '../prisma.service';
import { NaturalPersonPrismaDTO } from './prismaDTO/NaturalPersonPrismaDto';

@Injectable()
export class NaturalPersonPrismaService implements NaturalPersonRepository {
  constructor(private prisma: PrismaService) {}

  async findNaturalPersonByIdOrCpf(
    id?: string,
    cpf?: string,
  ): Promise<NaturalPerson> {
    return NaturalPersonPrismaDTO.PrismaToEntity(
      await this.prisma.naturalPerson.findFirstOrThrow({
        where: { OR: { id, cpf } },
      }),
    );
  }
  async createNaturalPerson(
    naturalPerson: NaturalPerson,
  ): Promise<NaturalPerson> {
    const personPrisma = await this.prisma.naturalPerson.create({
      data: NaturalPersonPrismaDTO.EntityToPrisma(naturalPerson),
    });

    return NaturalPersonPrismaDTO.PrismaToEntity(personPrisma);
  }
  async updateNaturalPerson(
    id: string,
    naturalPerson: NaturalPerson,
  ): Promise<NaturalPerson> {
    const personPrisma =
      NaturalPersonPrismaDTO.EntityToPrismaUpdate(naturalPerson);

    return NaturalPersonPrismaDTO.PrismaToEntity(
      await this.prisma.naturalPerson.update({
        data: personPrisma,
        where: { id },
      }),
    );
  }
  async getAllNaturalPerson(
    parameters: FindAllNaturalPersonWhereRequestDTO,
  ): Promise<NaturalPerson[]> {
    const persons = await this.prisma.naturalPerson.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return persons.map(person => NaturalPersonPrismaDTO.PrismaToEntity(person));
  }
}
