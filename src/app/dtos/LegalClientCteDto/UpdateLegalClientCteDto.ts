import { type ILegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';

export abstract class UpdateLegalClientCteDTO
  implements Partial<Omit<ILegalClientCte, 'acessKey' | 'cteNumber'>>
{
  id?: string;
  orderId?: string;
  observations?: string;
  cteType?: string;
}
