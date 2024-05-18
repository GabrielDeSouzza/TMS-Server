export abstract class AdressesType {
  id?: string;
  postalCod: string;
  street: string;
  address_number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  uf: string;
}
