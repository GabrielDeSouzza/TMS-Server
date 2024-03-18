import { Injectable } from '@nestjs/common';

import { type GetRecipientDTO } from 'domain/dto/repositories/getDataDtos/GetRecipientDto';
import { type FindAllRecipientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/RecipientRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type Recipient } from 'domain/entities/Recipient/Recipient';
import { type RecipientRepository } from 'domain/repositories/RecipientRepository ';

import { PrismaService } from '../prisma.service';
import { RecipientPrismaDTO } from './prismaDTO/RecipientPrismaDto';

@Injectable()
export class RecipientPrismaService implements RecipientRepository {
  constructor(private prisma: PrismaService) {}

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
