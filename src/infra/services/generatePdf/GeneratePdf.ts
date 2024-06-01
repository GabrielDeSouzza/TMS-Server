import { Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';
import { type CreateOptions } from 'html-pdf';
import pdf from 'html-pdf';

import { UploaderProvider } from 'domain/providers/UploaderProvider';

@Injectable()
export class GeneratePdfService {
  constructor(private cloudFilesService: UploaderProvider) {}

  async generatePdf(html: string, fileName: string): Promise<string> {
    const options: CreateOptions = {
      format: 'A4',
      type: 'pdf',
    };

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      pdf.create(html, options).toBuffer(async (error, buffer) => {
        if (error) {
          reject(new GraphQLError('Erro ao Gerar PDF'));
        } else {
          try {
            const url = await this.cloudFilesService.uploadPdf(
              buffer,
              fileName,
            );
            resolve(url.path);
          } catch (uploadError) {
            reject(uploadError);
          }
        }
      });
    });
  }
}
