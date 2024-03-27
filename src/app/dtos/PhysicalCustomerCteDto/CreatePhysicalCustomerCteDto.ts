import { type IPhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte/PhysicalCustomerCte';

export abstract class CreatePhysicalCustomerCteDTO
  implements IPhysicalCustomerCte
{
  orderId: string;
  acessKey: string;
  observations?: string;
  cteNumber: string;
  cteType: string;
}
