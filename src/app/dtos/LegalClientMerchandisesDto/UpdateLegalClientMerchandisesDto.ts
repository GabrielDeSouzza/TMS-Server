import { type ILegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';

export abstract class UpdateLegalClientMerchandisesDTO
  implements Partial<ILegalClientMerchandise>
{
  codMerchandise?: string;

  amount?: number;

  description?: string;

  mass?: number;

  volume?: number;

  value?: number;

  legal_client_order_id?: string;

  invoice_legal_client?: string;
}
