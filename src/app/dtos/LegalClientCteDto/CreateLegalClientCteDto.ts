import { type ILegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';

export abstract class CreateLegalClientCteDTO implements ILegalClientCte {
  orderId: string;
  acessKey: string;
  observations?: string;
  cteNumber: string;
  cteType: string;
}
