export abstract class CreateRoutePhysicalCustomerDTO {
  cep: string;
  public_place: string;
  address_number: string;
  neighborhood: string;
  complement?: string;
  physicalCustomerOrderId: string;
  city: string;
  uf: string;
}
