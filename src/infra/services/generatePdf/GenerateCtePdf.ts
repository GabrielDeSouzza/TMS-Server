import { Injectable } from '@nestjs/common';

import ejs from 'ejs';
import { GraphQLError } from 'graphql';
import { type CreateOptions } from 'html-pdf';
import pdf from 'html-pdf';
import path from 'path';

import { type CtePdf } from 'domain/entities/Cte Entities/CtePdfEntity/CtePdf';
import { UploaderProvider } from 'domain/providers/UploaderProvider';

@Injectable()
export class GenerateCtePdfService {
  private cteUrl: string;
  constructor(private cloudFilesService: UploaderProvider) {}

  async generatePdf(cteData: CtePdf): Promise<string> {
    const options: CreateOptions = {
      format: 'A4',
      type: 'pdf',
    };
    const html = await this.compileEjs(cteData);

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      pdf.create(html, options).toBuffer(async (error, buffer) => {
        if (error) {
          reject(new GraphQLError('Erro ao Gerar PDF'));
        } else {
          try {
            // Supondo que cloudFilesService.uploadPdf seja uma função assíncrona que faz o upload do PDF
            const url = await this.cloudFilesService.uploadPdf(buffer, 'test');
            resolve(url.path);
          } catch (uploadError) {
            reject(uploadError);
          }
        }
      });
    });
  }
  private async compileEjs(cteData: CtePdf) {
    const html = await ejs.renderFile(
      path.dirname(process.cwd()) +
        '/app/src//infra/services/generatePdf/templates/test.ejs',
      cteData,
    );

    return html;
  }
}
