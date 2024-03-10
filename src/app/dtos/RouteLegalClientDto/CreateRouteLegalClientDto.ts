export abstract class CreateRouteLegalClientDTO {
  cep: string;
  public_place: string;
  address_number: string;
  neighborhood: string;
  complement?: string;
  legalClientOrderId: string;
  city: string;
  uf: string;
}
