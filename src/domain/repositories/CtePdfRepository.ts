import { type CteLegalClientPdf } from 'domain/entities/Cte Entities/CtePdfLegalClient/CtePdfLegalClient';
import { type CtePhyscialCustomerPdf } from 'domain/entities/Cte Entities/CtePdfPhysicalClient/CtePdfPhysicalCustomer';

export abstract class CtePdfRepository {
  abstract getDataForGenerateCtePdfLegalClient(
    cteId: string,
  ): Promise<CteLegalClientPdf>;
  abstract getDataForGenerateCtePdfPhysicalCustomer(
    cteId: string,
  ): Promise<CtePhyscialCustomerPdf>;
}
