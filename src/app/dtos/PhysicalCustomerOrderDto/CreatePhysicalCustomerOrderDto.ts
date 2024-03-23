import { type IPhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

export abstract class CreatePhysicalCustomerOrderDTO
  implements IPhysicalCustomerOrder
{
  order: string;
  quote_table_id: string;
  physicalCustomerId: string;

  created_by: string;

  updated_by: string;
}
