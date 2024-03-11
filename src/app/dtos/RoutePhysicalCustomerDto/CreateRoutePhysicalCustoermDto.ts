export abstract class CreateRoutePhysicalCustomerDTO {
  cep: string;
  public_place: string;
  address_number: string;
  neighborhood: string;
  complement?: string;
  order_processing_id: string;
  city: string;
  uf: string;
}
