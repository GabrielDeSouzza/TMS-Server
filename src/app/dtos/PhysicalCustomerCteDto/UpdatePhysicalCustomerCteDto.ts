import { type IPhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte';

export abstract class UpdatePhysicalCustomerCteDTO
  implements Partial<Omit<IPhysicalCustomerCte, 'acessKey' | 'cteNumber'>>
{
  id?: string;
  orderId?: string;
  observations?: string;
  cteType?: string;
}
