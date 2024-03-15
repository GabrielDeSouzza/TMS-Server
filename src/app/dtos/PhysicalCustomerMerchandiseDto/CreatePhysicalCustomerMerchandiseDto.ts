import { type IPhysicalCustomerMerchandise } from 'domain/entities/PhysicalClientEntities/physicalCustomerMerchandise/physical-merchandise';

export abstract class CreatePhysicalCustomerMerchandiseDTO
  implements IPhysicalCustomerMerchandise
{
  invoicePhysicalClient: string;

  codMerchandise: string;

  amount: number;

  description: string;

  mass: number;

  volume: number;

  value: number;

  physicalCustomerOrderId: string;
}
