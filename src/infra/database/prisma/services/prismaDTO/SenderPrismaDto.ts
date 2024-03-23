import { type Prisma, type Sender as SenderPrisma } from '@prisma/client';

import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { Sender } from 'domain/entities/Sender/Sender';

import { LegalPersonPrismaDTO } from './LegalPersonPrismaDto';
import { NaturalPersonPrismaDTO } from './NaturalPersonPrismaDto';

export class SenderPrismaDTO {
  public static PrismaToEntity(senderPrisma: SenderPrisma) {
    if (!senderPrisma) return null;

    return new Sender({
      created_by: senderPrisma.created_by,
      updated_by: senderPrisma.updated_by,
      id: senderPrisma.id,
      created_at: senderPrisma.created_at,
      legal_person_id: senderPrisma.legal_person_id,
      natural_person_id: senderPrisma.natural_person_id,
      updated_at: senderPrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    sender: Sender,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ) {
    const senderPrisma: Prisma.SenderCreateInput = {
      CreatedBy: { connect: { id: sender.created_by } },
      LegalPerson: this.legalPersonQuery(legalPerson, sender.legal_person_id),

      NaturalPerson: this.naturalPersonQuery(
        naturalPerson,
        sender.natural_person_id,
      ),
      UpdatedBy: { connect: { id: sender.updated_by } },
      created_at: sender.created_at,
      id: sender.id,
      updated_at: sender.updated_at,
    };

    return senderPrisma;
  }

  public static EntityToPrismaUpdate(
    sender: Sender,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ) {
    const senderUptade: Prisma.SenderUpdateInput = {
      LegalPerson: legalPerson
        ? {
            update: LegalPersonPrismaDTO.EntityToPrismaUpdate(legalPerson),
          }
        : undefined,
      NaturalPerson: naturalPerson
        ? {
            update: NaturalPersonPrismaDTO.EntityToPrismaUpdate(naturalPerson),
          }
        : undefined,
      UpdatedBy: { connect: { id: sender.updated_by } },
      updated_at: sender.updated_at,
    };

    return senderUptade;
  }

  private static legalPersonQuery(
    legalPerson?: LegalPerson,
    legalPersonId?: string,
  ) {
    if (!legalPerson && !legalPersonId) return;
    const query: Prisma.LegalPersonCreateNestedOneWithoutRecipientInput =
      legalPerson
        ? { create: LegalPersonPrismaDTO.EntityToCreatePrisma(legalPerson) }
        : { connect: { id: legalPersonId } };

    return query;
  }

  private static naturalPersonQuery(
    naturalPerson?: NaturalPerson,
    natualPersonId?: string,
  ) {
    if (!naturalPerson && !natualPersonId) return;
    const query: Prisma.NaturalPersonCreateNestedOneWithoutRecipientInput =
      naturalPerson
        ? { create: NaturalPersonPrismaDTO.EntityToPrisma(naturalPerson) }
        : { connect: { id: natualPersonId } };

    return query;
  }
}
