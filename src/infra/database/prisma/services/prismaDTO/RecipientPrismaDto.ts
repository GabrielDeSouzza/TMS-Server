import { type Prisma, type Recipient as RecipientPrisma } from '@prisma/client';

import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { Recipient } from 'domain/entities/Recipient/Recipient';

import { LegalPersonPrismaDTO } from './LegalPersonPrismaDto';
import { NaturalPersonPrismaDTO } from './NaturalPersonPrismaDto';

export class RecipientPrismaDTO {
  public static PrismaToEntity(recipientPrisma: RecipientPrisma) {
    if (!recipientPrisma) return null;

    return new Recipient({
      created_by: recipientPrisma.created_by,
      updated_by: recipientPrisma.updated_by,
      id: recipientPrisma.id,
      created_at: recipientPrisma.created_at,
      legal_person_id: recipientPrisma.legal_person_id,
      natural_person_id: recipientPrisma.natural_person_id,
      updated_at: recipientPrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    recipient: Recipient,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ) {
    const recipientPrisma: Prisma.RecipientCreateInput = {
      CreatedBy: { connect: { id: recipient.created_by } },
      LegalPerson: this.legalPersonQuery(
        legalPerson,
        recipient.legal_person_id,
      ),
      NaturalPerson: this.naturalPersonQuery(
        naturalPerson,
        recipient.natural_person_id,
      ),
      UpdatedBy: { connect: { id: recipient.updated_by } },
      created_at: recipient.created_at,
      id: recipient.id,
      updated_at: recipient.updated_at,
    };

    return recipientPrisma;
  }

  public static EntityToPrismaUpdate(
    recipient: Recipient,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ) {
    const recipientUptade: Prisma.RecipientUpdateInput = {
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
      UpdatedBy: { connect: { id: recipient.updated_by } },
      updated_at: recipient.updated_at,
    };

    return recipientUptade;
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
