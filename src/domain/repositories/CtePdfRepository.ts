import { type CtePdf } from 'domain/entities/Cte Entities/CtePdfEntity/CtePdf';

export abstract class CtePdfRepository {
  abstract getDataForGenerateCtePdfLegalClient(
    orderId: string,
  ): Promise<CtePdf>;
  abstract getDataForGenerateCtePdfPhysicalCustomer(
    orderId: string,
  ): Promise<CtePdf>;
}
