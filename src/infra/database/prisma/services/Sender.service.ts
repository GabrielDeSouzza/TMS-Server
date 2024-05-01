import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetSenderDTO } from 'domain/dto/repositories/getDataDtos/GetSendertDto';
import {
  type CountAllSendersWhereRequestDTO,
  type UpdateManySendersDTO,
  type FindAllSenderWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/SenderRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type Sender } from 'domain/entities/Sender/Sender';
import { type SenderRepository } from 'domain/repositories/SenderRepository';

import { PrismaService } from '../prisma.service';
import { SenderPrismaDTO } from './prismaDTO/SenderPrismaDto';

@Injectable()
export class SenderPrismaService implements SenderRepository {
  constructor(private prisma: PrismaService) {}

  async count(parameters: CountAllSendersWhereRequestDTO): Promise<number> {
    const count = this.prisma.sender.count({ where: parameters.where });

    return count;
  }

  async delete(id: string): Promise<Sender> {
    const sender = await this.prisma.sender.findUnique({
      where: { id },
    });

    if (!sender) {
      throw new GraphQLError('Sender not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const senderPrisma = await this.prisma.sender.delete({
      where: { id },
    });

    if (!senderPrisma) {
      throw new GraphQLError('Sender not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const senderDomain = SenderPrismaDTO.PrismaToEntity(senderPrisma);

    return senderDomain;
  }

  async updateMany(sender: UpdateManySendersDTO[]): Promise<Sender[]> {
    const senders: Sender[] = [];

    await Promise.all(
      sender.map(async item => {
        const sender = await this.prisma.sender.findUnique({
          where: { id: item.id },
        });

        if (!sender) {
          throw new GraphQLError(`Sender with id "${item.id}" not found!`, {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const senderPrisma = await tx.sender.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!senderPrisma) {
            throw new GraphQLError(`Sender with id "${item.id}" not updated!`, {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const senderDomain = SenderPrismaDTO.PrismaToEntity(senderPrisma);

          senders.push(senderDomain);
        });
      }),
    );

    return senders;
  }

  async deleteMany(ids: string[]): Promise<Sender[]> {
    const senders: Sender[] = [];

    await Promise.all(
      ids.map(async id => {
        const sender = await this.prisma.sender.findUnique({
          where: { id },
        });

        if (!sender) {
          throw new GraphQLError('Sender not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const senderPrisma = await tx.sender.delete({
            where: { id },
          });

          if (!senderPrisma) {
            throw new GraphQLError('Sender not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const senderDomain = SenderPrismaDTO.PrismaToEntity(senderPrisma);

          senders.push(senderDomain);
        });
      }),
    );

    return senders;
  }

  async findSender(data: GetSenderDTO): Promise<Sender> {
    const sender = await this.prisma.sender.findFirst({
      where: {
        OR: [
          { id: data.id },
          { NaturalPerson: { cpf: data.naturalPerson?.cpf } },
          { NaturalPerson: { rg: data.naturalPerson?.rg } },
          { NaturalPerson: { id: data.naturalPerson?.naturalPersonId } },
          { LegalPerson: { fantasy_name: data.legalPerson?.fantasyName } },
          { LegalPerson: { corporate_name: data.legalPerson?.corporateName } },
          { LegalPerson: { cnpj: data.legalPerson?.cnpj } },
          { LegalPerson: { id: data.legalPerson?.legalPersonId } },
        ],
      },
    });

    return SenderPrismaDTO.PrismaToEntity(sender);
  }
  async createSender(
    sender: Sender,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ): Promise<Sender> {
    const senderPrisma = await this.prisma.sender.create({
      data: SenderPrismaDTO.EntityToCreatePrisma(
        sender,
        legalPerson,
        naturalPerson,
      ),
    });

    return SenderPrismaDTO.PrismaToEntity(senderPrisma);
  }
  async updateSender(
    id: string,
    sender?: Sender,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ): Promise<Sender> {
    const senderPrisma = await this.prisma.sender.update({
      data: SenderPrismaDTO.EntityToPrismaUpdate(
        sender,
        legalPerson,
        naturalPerson,
      ),
      where: { id },
    });

    return SenderPrismaDTO.PrismaToEntity(senderPrisma);
  }

  async findAllSender(
    parameters: FindAllSenderWhereRequestDTO,
  ): Promise<Sender[]> {
    const senders = await this.prisma.sender.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return senders.map(sender => SenderPrismaDTO.PrismaToEntity(sender));
  }
}
