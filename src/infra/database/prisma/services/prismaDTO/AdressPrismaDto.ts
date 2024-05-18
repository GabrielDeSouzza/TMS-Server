import { type Adresses as AdressesPrisma } from '@prisma/client';

import { type AdressesType } from 'domain/entities/QuoteTables/AdressesType';

export class AdressPrismDto {
  public static prismaToType(adressPrisma: AdressesPrisma): AdressesType {
    return {
      address_number: adressPrisma.address_number,
      city: adressPrisma.city,
      neighborhood: adressPrisma.neighborhood,
      postalCod: adressPrisma.neighborhood,
      street: adressPrisma.street,
      uf: adressPrisma.uf,
      complement: adressPrisma.complement,
      id: adressPrisma.id,
    };
  }
}
