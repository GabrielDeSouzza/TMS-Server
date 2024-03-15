import { type ILegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';

export abstract class CreateLegalClientMerchandisesDTO
  implements ILegalClientMerchandise
{
  legal_client_order_id: string;

  invoice_legal_client: string;

  codMerchandise: string;

  amount: number;

  description: string;

  mass: number;

  volume: number;

  value: number;
}
