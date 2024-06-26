export abstract class CreateLegalPersonDTO {
  fantasy_name: string;
  cep: string;
  cnpj: string;
  state_registration: string;
  corporate_name: string;
  public_place: string;
  address_number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  uf: string;
  first_phone: string;
  second_phone?: string;
  third_phone?: string;
  email: string;
  id?: string;
}
