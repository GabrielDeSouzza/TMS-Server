import {
  type Prisma,
  type LegalClientQuoteTable as LegalClientQuoteTablePrisma,
} from '@prisma/client';

import { LegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

export class LegalClientQuoteTablePrismaDTO {
  public static PrismaToEntity(
    legalclientquotetablePrisma: LegalClientQuoteTablePrisma,
  ) {
    if (!legalclientquotetablePrisma) return null;

    return new LegalClientQuoteTable({
      amount: legalclientquotetablePrisma.amount,
      codQuote: legalclientquotetablePrisma.cod_quote,
      description: legalclientquotetablePrisma.description,
      mass: legalclientquotetablePrisma.mass,
      nf_value: legalclientquotetablePrisma.nf_value,
      postalCodDestiny: legalclientquotetablePrisma.postal_cod_destiny,
      postalCodOrigin: legalclientquotetablePrisma.postal_cod_origin,
      recipientId: legalclientquotetablePrisma.recipient_id,
      senderId: legalclientquotetablePrisma.sender_id,
      typeMerchandise: legalclientquotetablePrisma.type_merchandise,
      volume: legalclientquotetablePrisma.volume,
      who_pays: legalclientquotetablePrisma.who_pays,
      id: legalclientquotetablePrisma.id,
      created_by: legalclientquotetablePrisma.created_by,
      updated_by: legalclientquotetablePrisma.updated_by,
      created_at: legalclientquotetablePrisma.created_at,
      updated_at: legalclientquotetablePrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    legalclientquotetable: LegalClientQuoteTable,
  ) {
    const legalclientquotetablePrisma: Prisma.LegalClientQuoteTableCreateInput =
      {
        CreatedBy: { connect: { id: legalclientquotetable.created_by } },
        amount: legalclientquotetable.amount,
        cod_quote: legalclientquotetable.codQuote,
        description: legalclientquotetable.description,
        mass: legalclientquotetable.mass,
        nf_value: legalclientquotetable.nf_value,
        postal_cod_destiny: legalclientquotetable.postalCodDestiny,
        postal_cod_origin: legalclientquotetable.postalCodOrigin,
        Recipient: { connect: { id: legalclientquotetable.recipientId } },
        Sender: { connect: { id: legalclientquotetable.senderId } },
        type_merchandise: legalclientquotetable.typeMerchandise,
        volume: legalclientquotetable.volume,
        who_pays: legalclientquotetable.who_pays,
        UpdatedBy: { connect: { id: legalclientquotetable.updated_by } },
        created_at: legalclientquotetable.created_at,
        id: legalclientquotetable.id,
        updated_at: legalclientquotetable.updated_at,
      };

    return legalclientquotetablePrisma;
  }

  public static EntityToPrismaUpdate(
    legalclientquotetable: LegalClientQuoteTable,
  ) {
    const legalclientquotetableUptade: Prisma.LegalClientQuoteTableUpdateInput =
      {
        amount: legalclientquotetable.amount,
        description: legalclientquotetable.description,
        mass: legalclientquotetable.mass,
        nf_value: legalclientquotetable.nf_value,
        postal_cod_destiny: legalclientquotetable.postalCodDestiny,
        postal_cod_origin: legalclientquotetable.postalCodOrigin,
        Recipient: legalclientquotetable.recipientId
          ? { connect: { id: legalclientquotetable.recipientId } }
          : undefined,
        Sender: legalclientquotetable.senderId
          ? { connect: { id: legalclientquotetable.senderId } }
          : undefined,
        type_merchandise: legalclientquotetable.typeMerchandise,
        volume: legalclientquotetable.volume,
        who_pays: legalclientquotetable.who_pays,
        UpdatedBy: { connect: { id: legalclientquotetable.updated_by } },
        updated_at: legalclientquotetable.updated_at,
      };

    return legalclientquotetableUptade;
  }
}
