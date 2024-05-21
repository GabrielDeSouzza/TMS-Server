import {
  type Prisma,
  type PhysicalCustomerQuoteTable as PhysicalCustomerQuoteTablePrisma,
  type Adresses as AdressesPrisma,
} from '@prisma/client';

import { PhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';

export class PhysicalCustomerQuoteTablePrismaDTO {
  public static PrismaToEntity(
    physicalcustomerquotetablePrisma: PhysicalCustomerQuoteTablePrisma,
    adressOriginPrisma: AdressesPrisma,
    adressDestinyPrisma: AdressesPrisma,
  ) {
    if (!physicalcustomerquotetablePrisma) return null;

    return new PhysicalCustomerQuoteTable({
      amount: physicalcustomerquotetablePrisma.amount,
      codQuote: physicalcustomerquotetablePrisma.cod_quote,
      formPayment: physicalcustomerquotetablePrisma.form_payment,
      kindService: physicalcustomerquotetablePrisma.kind_service,
      description: physicalcustomerquotetablePrisma.description,
      mass: physicalcustomerquotetablePrisma.mass,
      nf_value: physicalcustomerquotetablePrisma.nf_value,
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
      icms_id: physicalcustomerquotetablePrisma.icms_id,
    });
  }
  public static EntityToCreatePrisma(
    physicalcustomerquotetable: PhysicalCustomerQuoteTable,
  ) {
    const physicalcustomerquotetablePrisma: Prisma.PhysicalCustomerQuoteTableCreateInput =
      {
        Icms: {
          connect: {
            state_orgin_recipient_state: {
              recipient_state: physicalcustomerquotetable.adressDestiny.uf,
              state_orgin: physicalcustomerquotetable.adressOrigin.uf,
            },
          },
        },
        CreatedBy: { connect: { id: physicalcustomerquotetable.created_by } },
        amount: physicalcustomerquotetable.amount,
        cod_quote: physicalcustomerquotetable.codQuote,
        form_payment: physicalcustomerquotetable.formPayment,
        kind_service: physicalcustomerquotetable.kindService,
        description: physicalcustomerquotetable.description,
        mass: physicalcustomerquotetable.mass,
        nf_value: physicalcustomerquotetable.nf_value,
        AdressDestiny: {
          connectOrCreate: {
            where: {
              postal_cod_address_number: {
                address_number:
                  physicalcustomerquotetable.adressDestiny.address_number,
                postal_cod: physicalcustomerquotetable.adressDestiny.postalCod,
              },
            },
            create: {
              address_number:
                physicalcustomerquotetable.adressDestiny.address_number,
              city: physicalcustomerquotetable.adressDestiny.city,
              neighborhood:
                physicalcustomerquotetable.adressDestiny.neighborhood,
              postal_cod: physicalcustomerquotetable.adressDestiny.postalCod,
              street: physicalcustomerquotetable.adressDestiny.street,
              uf: physicalcustomerquotetable.adressDestiny.uf,
              complement: physicalcustomerquotetable.adressDestiny.complement,
            },
          },
        },
        AdressOrigin: {
          connectOrCreate: {
            where: {
              postal_cod_address_number: {
                address_number:
                  physicalcustomerquotetable.adressOrigin.address_number,
                postal_cod: physicalcustomerquotetable.adressOrigin.postalCod,
              },
            },
            create: {
              address_number:
                physicalcustomerquotetable.adressOrigin.address_number,
              city: physicalcustomerquotetable.adressOrigin.city,
              neighborhood:
                physicalcustomerquotetable.adressOrigin.neighborhood,
              postal_cod: physicalcustomerquotetable.adressOrigin.postalCod,
              street: physicalcustomerquotetable.adressOrigin.street,
              uf: physicalcustomerquotetable.adressOrigin.uf,
              complement: physicalcustomerquotetable.adressOrigin.complement,
            },
          },
        },
        Recipient: { connect: { id: physicalcustomerquotetable.recipientId } },
        Sender: { connect: { id: physicalcustomerquotetable.senderId } },
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
        form_payment: physicalcustomerquotetable.formPayment,
        kind_service: physicalcustomerquotetable.kindService,
        nf_value: physicalcustomerquotetable.nf_value,
        AdressDestiny: physicalcustomerquotetable.adressDestiny
          ? {
              update: {
                address_number:
                  physicalcustomerquotetable.adressDestiny?.address_number,
                city: physicalcustomerquotetable.adressDestiny?.city,
                neighborhood:
                  physicalcustomerquotetable.adressDestiny?.neighborhood,
                postal_cod: physicalcustomerquotetable.adressDestiny?.postalCod,
                street: physicalcustomerquotetable.adressDestiny?.street,
                uf: physicalcustomerquotetable.adressDestiny?.uf,
                complement:
                  physicalcustomerquotetable.adressDestiny?.complement,
              },
            }
          : undefined,
        AdressOrigin: physicalcustomerquotetable.adressOrigin
          ? {
              update: {
                address_number:
                  physicalcustomerquotetable.adressOrigin?.address_number,
                city: physicalcustomerquotetable.adressOrigin?.city,
                neighborhood:
                  physicalcustomerquotetable.adressOrigin?.neighborhood,
                postal_cod: physicalcustomerquotetable.adressOrigin?.postalCod,
                street: physicalcustomerquotetable.adressOrigin?.street,
                uf: physicalcustomerquotetable.adressOrigin?.uf,
                complement: physicalcustomerquotetable.adressOrigin?.complement,
              },
            }
          : undefined,
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
        updated_at: physicalcustomerquotetable.updated_at,
        Icms: {
          connect: {
            state_orgin_recipient_state: {
              recipient_state: physicalcustomerquotetable.adressDestiny.uf,
              state_orgin: physicalcustomerquotetable.adressOrigin.uf,
            },
          },
        },
      };

    return physicalcustomerquotetableUptade;
  }
}
