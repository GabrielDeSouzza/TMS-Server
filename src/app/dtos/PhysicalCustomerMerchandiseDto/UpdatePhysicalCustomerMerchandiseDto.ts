import { type IPhysicalCustomerMerchandise } from 'domain/entities/PhysicalClientEntities/physicalCustomerMerchandise/physical-merchandise';

export abstract class UpdatePhysicalCustomerMerchandiseDTO
  implements Partial<IPhysicalCustomerMerchandise>
{
  codMerchandise?: string;

  amount?: number;

  description?: string;

  mass?: number;

  volume?: number;

  value?: number;

  physicalCustomerOrderId?: string;

  invoicePhysicalClient?: string;
}
