import {
  type Prisma,
  type PhysicalCustomerQuoteTable as PhysicalCustomerQuoteTablePrisma,
} from '@prisma/client';

import { PhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';

export class PhysicalCustomerQuoteTablePrismaDTO {
  public static PrismaToEntity(
    physicalcustomerquotetablePrisma: PhysicalCustomerQuoteTablePrisma,
  ) {
    if (!physicalcustomerquotetablePrisma) return null;

    return new PhysicalCustomerQuoteTable({
      amount: physicalcustomerquotetablePrisma.amount,
      codQuote: physicalcustomerquotetablePrisma.cod_quote,
      description: physicalcustomerquotetablePrisma.description,
      mass: physicalcustomerquotetablePrisma.mass,
      nf_value: physicalcustomerquotetablePrisma.nf_value,
      postalCodDestiny: physicalcustomerquotetablePrisma.postal_cod_destiny,
      postalCodOrigin: physicalcustomerquotetablePrisma.postal_cod_origin,
      recipientId: physicalcustomerquotetablePrisma.recipient_id,
      senderId: physicalcustomerquotetablePrisma.senderId,
      typeMerchandise: physicalcustomerquotetablePrisma.type_merchandise,
      volume: physicalcustomerquotetablePrisma.volume,
      who_pays: physicalcustomerquotetablePrisma.who_pays,
      id: physicalcustomerquotetablePrisma.id,
      created_by: physicalcustomerquotetablePrisma.created_by,
      updated_by: physicalcustomerquotetablePrisma.updated_by,
      created_at: physicalcustomerquotetablePrisma.created_at,
      updated_at: physicalcustomerquotetablePrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    physicalcustomerquotetable: PhysicalCustomerQuoteTable,
  ) {
    const physicalcustomerquotetablePrisma: Prisma.PhysicalCustomerQuoteTableCreateInput =
      {
        CreatedBy: { connect: { id: physicalcustomerquotetable.created_by } },
        amount: physicalcustomerquotetable.amount,
        cod_quote: physicalcustomerquotetable.codQuote,
        description: physicalcustomerquotetable.description,
        mass: physicalcustomerquotetable.mass,
        nf_value: physicalcustomerquotetable.nf_value,
        postal_cod_destiny: physicalcustomerquotetable.postalCodDestiny,
        postal_cod_origin: physicalcustomerquotetable.postalCodOrigin,
        Recipient: physicalcustomerquotetable.recipientId
          ? { connect: { id: physicalcustomerquotetable.recipientId } }
          : undefined,
        Sender: physicalcustomerquotetable.senderId
          ? { connect: { id: physicalcustomerquotetable.senderId } }
          : undefined,
        type_merchandise: physicalcustomerquotetable.typeMerchandise,
        volume: physicalcustomerquotetable.volume,
        who_pays: physicalcustomerquotetable.who_pays,
        UpdatedBy: { connect: { id: physicalcustomerquotetable.updated_by } },
        created_at: physicalcustomerquotetable.created_at,
        id: physicalcustomerquotetable.id,
        updated_at: physicalcustomerquotetable.updated_at,
      };

    return physicalcustomerquotetablePrisma;
  }

  public static EntityToPrismaUpdate(
    physicalcustomerquotetable: PhysicalCustomerQuoteTable,
  ) {
    const physicalcustomerquotetableUptade: Prisma.PhysicalCustomerQuoteTableUpdateInput =
      {
        amount: physicalcustomerquotetable.amount,
        description: physicalcustomerquotetable.description,
        mass: physicalcustomerquotetable.mass,
        nf_value: physicalcustomerquotetable.nf_value,
        postal_cod_destiny: physicalcustomerquotetable.postalCodDestiny,
        postal_cod_origin: physicalcustomerquotetable.postalCodOrigin,
        Recipient: { connect: { id: physicalcustomerquotetable.recipientId } },
        Sender: { connect: { id: physicalcustomerquotetable.senderId } },
        type_merchandise: physicalcustomerquotetable.typeMerchandise,
        volume: physicalcustomerquotetable.volume,
        who_pays: physicalcustomerquotetable.who_pays,
        UpdatedBy: { connect: { id: physicalcustomerquotetable.updated_by } },
        updated_at: physicalcustomerquotetable.updated_at,
      };

    return physicalcustomerquotetableUptade;
  }
}
