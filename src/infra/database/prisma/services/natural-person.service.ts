import { Injectable } from '@nestjs/common';

import { type NaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';
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
}
