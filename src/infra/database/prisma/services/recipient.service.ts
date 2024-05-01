import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetRecipientDTO } from 'domain/dto/repositories/getDataDtos/GetRecipientDto';
import { type FindAllRecipientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/RecipientRepositoryDto';
import {
  type CountAllUserWhereRequestDTO,
  type UpdateManyUsersDTO,
} from 'domain/dto/repositories/whereDtos/UserRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type Recipient } from 'domain/entities/Recipient/Recipient';
import { type RecipientRepository } from 'domain/repositories/RecipientRepository ';

import { PrismaService } from '../prisma.service';
import { RecipientPrismaDTO } from './prismaDTO/RecipientPrismaDto';

@Injectable()
export class RecipientPrismaService implements RecipientRepository {
  constructor(private prisma: PrismaService) {}

  async count(parameters: CountAllUserWhereRequestDTO): Promise<number> {
    const count = this.prisma.recipient.count({ where: parameters.where });

    return count;
  }

  async delete(id: string): Promise<Recipient> {
    const recipient = await this.prisma.recipient.findUnique({
      where: { id },
    });

    if (!recipient) {
      throw new GraphQLError('Recipient not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const recipientPrisma = await this.prisma.recipient.delete({
      where: { id },
    });

    if (!recipientPrisma) {
      throw new GraphQLError('Recipient not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const recipientDomain = RecipientPrismaDTO.PrismaToEntity(recipientPrisma);

    return recipientDomain;
  }

  async updateMany(recipient: UpdateManyUsersDTO[]): Promise<Recipient[]> {
    const recipients: Recipient[] = [];

    await Promise.all(
      recipient.map(async item => {
        const recipient = await this.prisma.recipient.findUnique({
          where: { id: item.id },
        });

        if (!recipient) {
          throw new GraphQLError(`Recipient with id "${item.id}" not found!`, {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const recipientPrisma = await tx.recipient.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!recipientPrisma) {
            throw new GraphQLError(
              `Recipient with id "${item.id}" not updated!`,
              {
                extensions: { code: HttpStatus.BAD_REQUEST },
              },
            );
          }

          const recipientDomain =
            RecipientPrismaDTO.PrismaToEntity(recipientPrisma);

          recipients.push(recipientDomain);
        });
      }),
    );

    return recipients;
  }

  async deleteMany(ids: string[]): Promise<Recipient[]> {
    const recipients: Recipient[] = [];

    await Promise.all(
      ids.map(async id => {
        const recipient = await this.prisma.recipient.findUnique({
          where: { id },
        });

        if (!recipient) {
          throw new GraphQLError('Recipient not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const recipientPrisma = await tx.recipient.delete({
            where: { id },
          });

          if (!recipientPrisma) {
            throw new GraphQLError('Recipient not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const recipientDomain =
            RecipientPrismaDTO.PrismaToEntity(recipientPrisma);

          recipients.push(recipientDomain);
        });
      }),
    );

    return recipients;
  }

  async findRecipient(data: GetRecipientDTO): Promise<Recipient> {
    const recipient = await this.prisma.recipient.findFirst({
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

    return RecipientPrismaDTO.PrismaToEntity(recipient);
  }
  async createRecipient(
    recipient: Recipient,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ): Promise<Recipient> {
    const recipientPrisma = await this.prisma.recipient.create({
      data: RecipientPrismaDTO.EntityToCreatePrisma(
        recipient,
        legalPerson,
        naturalPerson,
      ),
    });

    return RecipientPrismaDTO.PrismaToEntity(recipientPrisma);
  }
  async updateRecipient(
    id: string,
    recipient?: Recipient,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ): Promise<Recipient> {
    const recipientPrisma = await this.prisma.recipient.update({
      data: RecipientPrismaDTO.EntityToPrismaUpdate(
        recipient,
        legalPerson,
        naturalPerson,
      ),
      where: { id },
    });

    return RecipientPrismaDTO.PrismaToEntity(recipientPrisma);
  }

  async findAllRecipient(
    parameters: FindAllRecipientWhereRequestDTO,
  ): Promise<Recipient[]> {
    const recipients = await this.prisma.recipient.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return recipients.map(recipient =>
      RecipientPrismaDTO.PrismaToEntity(recipient),
    );
  }
}
