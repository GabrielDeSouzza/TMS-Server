import path from 'node:path';

import { Injectable } from '@nestjs/common';

import ejs from 'ejs';

import { type CteLegalClientPdf } from 'domain/entities/Cte Entities/CtePdfLegalClient/CtePdfLegalClient';
import { type CtePhyscialCustomerPdf } from 'domain/entities/Cte Entities/CtePdfPhysicalClient/CtePdfPhysicalCustomer';

import { GeneratePdfService } from '../GeneratePdf';

@Injectable()
export class GenerateCtePDF {
  constructor(private pdfService: GeneratePdfService) {}
  public async GenerateCte(
    cteData: CteLegalClientPdf | CtePhyscialCustomerPdf,
  ): Promise<string> {
    const html = await ejs.renderFile(
      path.dirname(process.cwd()) +
        '/app/src/infra/services/generatePdf/templates/test.ejs',
      cteData,
    );

    return await this.pdfService.generatePdf(html, cteData.orderData.order);
  }
}
