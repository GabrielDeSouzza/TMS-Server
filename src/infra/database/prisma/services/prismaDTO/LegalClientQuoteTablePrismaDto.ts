import {
  type Prisma,
  type LegalClientQuoteTable as LegalClientQuoteTablePrisma,
  type Adresses as AdressesPrisma,
} from '@prisma/client';

import { LegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

export class LegalClientQuoteTablePrismaDTO {
  public static PrismaToEntity(
    legalclientquotetablePrisma: LegalClientQuoteTablePrisma,
    adressOriginPrisma: AdressesPrisma,
    adressDestinyPrisma: AdressesPrisma,
  ) {
    if (!legalclientquotetablePrisma) return null;

    return new LegalClientQuoteTable({
      amount: legalclientquotetablePrisma.amount,
      formPayment: legalclientquotetablePrisma.form_payment,
      kindService: legalclientquotetablePrisma.kind_service,
      natureService: legalclientquotetablePrisma.nature_service,
      typeCte: legalclientquotetablePrisma.type_cte,
      codQuote: legalclientquotetablePrisma.cod_quote,
      description: legalclientquotetablePrisma.description,
      mass: legalclientquotetablePrisma.mass,
      nf_value: legalclientquotetablePrisma.nf_value,
      adressDestiny: {
        address_number: adressDestinyPrisma.address_number,
        city: adressDestinyPrisma.city,
        id: adressDestinyPrisma.id,
        neighborhood: adressDestinyPrisma.neighborhood,
        postalCod: adressDestinyPrisma.postal_cod,
        street: adressDestinyPrisma.street,
        uf: adressDestinyPrisma.uf,
        complement: adressDestinyPrisma.complement,
      },
      adressOrigin: {
        address_number: adressOriginPrisma.address_number,
        city: adressOriginPrisma.city,
        id: adressOriginPrisma.id,
        neighborhood: adressOriginPrisma.neighborhood,
        postalCod: adressOriginPrisma.postal_cod,
        street: adressOriginPrisma.street,
        uf: adressOriginPrisma.uf,
        complement: adressOriginPrisma.complement,
      },
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
        Icms: {
          connect: {
            state_orgin_recipient_state: {
              recipient_state: legalclientquotetable.adressDestiny.uf,
              state_orgin: legalclientquotetable.adressOrigin.uf,
            },
          },
        },
        CreatedBy: { connect: { id: legalclientquotetable.created_by } },
        amount: legalclientquotetable.amount,
        cod_quote: legalclientquotetable.codQuote,
        form_payment: legalclientquotetable.formPayment,
        kind_service: legalclientquotetable.kindService,
        nature_service: legalclientquotetable.natureService,
        type_cte: legalclientquotetable.typeCte,
        description: legalclientquotetable.description,
        mass: legalclientquotetable.mass,
        nf_value: legalclientquotetable.nf_value,
        AdressDestiny: {
          connectOrCreate: {
            where: {
              postal_cod_address_number: {
                address_number:
                  legalclientquotetable.adressDestiny.address_number,
                postal_cod: legalclientquotetable.adressDestiny.postalCod,
              },
            },
            create: {
              address_number:
                legalclientquotetable.adressDestiny.address_number,
              city: legalclientquotetable.adressDestiny.city,
              neighborhood: legalclientquotetable.adressDestiny.neighborhood,
              postal_cod: legalclientquotetable.adressDestiny.postalCod,
              street: legalclientquotetable.adressDestiny.street,
              uf: legalclientquotetable.adressDestiny.uf,
              complement: legalclientquotetable.adressDestiny.complement,
            },
          },
        },
        AdressOrigin: {
          connectOrCreate: {
            where: {
              postal_cod_address_number: {
                address_number:
                  legalclientquotetable.adressOrigin.address_number,
                postal_cod: legalclientquotetable.adressOrigin.postalCod,
              },
            },
            create: {
              address_number: legalclientquotetable.adressOrigin.address_number,
              city: legalclientquotetable.adressOrigin.city,
              neighborhood: legalclientquotetable.adressOrigin.neighborhood,
              postal_cod: legalclientquotetable.adressOrigin.postalCod,
              street: legalclientquotetable.adressOrigin.street,
              uf: legalclientquotetable.adressOrigin.uf,
              complement: legalclientquotetable.adressOrigin.complement,
            },
          },
        },
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
        form_payment: legalclientquotetable.formPayment,
        kind_service: legalclientquotetable.kindService,
        nature_service: legalclientquotetable.natureService,
        type_cte: legalclientquotetable.typeCte,
        nf_value: legalclientquotetable.nf_value,
        AdressDestiny: legalclientquotetable.adressDestiny
          ? {
              update: {
                address_number:
                  legalclientquotetable.adressDestiny?.address_number,
                city: legalclientquotetable.adressDestiny?.city,
                neighborhood: legalclientquotetable.adressDestiny?.neighborhood,
                postal_cod: legalclientquotetable.adressDestiny?.postalCod,
                street: legalclientquotetable.adressDestiny?.street,
                uf: legalclientquotetable.adressDestiny?.uf,
                complement: legalclientquotetable.adressDestiny?.complement,
              },
            }
          : undefined,
        AdressOrigin: legalclientquotetable.adressOrigin
          ? {
              update: {
                address_number:
                  legalclientquotetable.adressOrigin?.address_number,
                city: legalclientquotetable.adressOrigin?.city,
                neighborhood: legalclientquotetable.adressOrigin?.neighborhood,
                postal_cod: legalclientquotetable.adressOrigin?.postalCod,
                street: legalclientquotetable.adressOrigin?.street,
                uf: legalclientquotetable.adressOrigin?.uf,
                complement: legalclientquotetable.adressOrigin?.complement,
              },
            }
          : undefined,
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
        Icms: {
          connect: {
            state_orgin_recipient_state: {
              recipient_state: legalclientquotetable.adressDestiny.uf,
              state_orgin: legalclientquotetable.adressOrigin.uf,
            },
          },
        },
      };

    return legalclientquotetableUptade;
  }
}
