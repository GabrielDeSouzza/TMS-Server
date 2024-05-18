import { Injectable } from '@nestjs/common';

import ejs from 'ejs';
import { GraphQLError } from 'graphql';
import { type CreateOptions } from 'html-pdf';
import pdf from 'html-pdf';
import path from 'path';

import { type CteLegalClientPdf } from 'domain/entities/Cte Entities/CtePdfLegalClient/CtePdfLegalClient';
import { type CtePhyscialCustomerPdf } from 'domain/entities/Cte Entities/CtePdfPhysicalClient/CtePdfPhysicalCustomer';
import { UploaderProvider } from 'domain/providers/UploaderProvider';

@Injectable()
export class GenerateCtePdfService {
  constructor(private cloudFilesService: UploaderProvider) {}

  async generatePdf(
    cteData: CteLegalClientPdf | CtePhyscialCustomerPdf,
  ): Promise<string> {
    const options: CreateOptions = {
      format: 'A4',
      type: 'pdf',
    };
    console.log(cteData.orderData.natureService);
    const html = await this.compileEjs(cteData);

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      pdf.create(html, options).toBuffer(async (error, buffer) => {
        if (error) {
          reject(new GraphQLError('Erro ao Gerar PDF'));
        } else {
          try {
            const url = await this.cloudFilesService.uploadPdf(buffer, 'test');
            resolve(url.path);
          } catch (uploadError) {
            reject(uploadError);
          }
        }
      });
    });
  }
  private async compileEjs(
    cteData: CteLegalClientPdf | CtePhyscialCustomerPdf,
  ) {
    const html = await ejs.renderFile(
      path.dirname(process.cwd()) +
        '/app/src//infra/services/generatePdf/templates/test.ejs',
      cteData,
    );

    return html;
  }
}
