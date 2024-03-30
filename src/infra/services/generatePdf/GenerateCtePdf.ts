import { Injectable } from '@nestjs/common';

import PdfPrinter from 'pdfmake';
import { type TDocumentDefinitions } from 'pdfmake/interfaces';

import { type CtePdf } from 'domain/entities/Cte Entities/CtePdfEntity/CtePdf';
import { UploaderProvider } from 'domain/providers/UploaderProvider';

@Injectable()
export class GenerateCtePdfService {
  private cteUrl: string;
  constructor(private cloudFilesService: UploaderProvider) {}
  async generatePdf(cteData: CtePdf): Promise<string> {
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };
    const printer = new PdfPrinter(fonts);
    const documentDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Helvetica' },
      content: [
        { text: cteData.cteData.cteNumber },
        { text: cteData.expenses[0].expenseName },
      ],
    };
    const chunks: Uint8Array[] = [];
    const pdf = printer.createPdfKitDocument(documentDefinitions);

    pdf.on('data', (chunk: Uint8Array) => {
      chunks.push(chunk);
    });

    await new Promise<void>((resolve, reject) => {
      pdf.on('end', () => {
        const buffer = Buffer.concat(chunks);
        this.cloudFilesService
          .uploadPdf(buffer, cteData.cteData.cteNumber)
          .then(uploadUrl => {
            this.cteUrl = uploadUrl.path;
            resolve();
          })
          .catch(error => {
            console.error('Ocorreu um erro durante o upload do PDF:', error);
            reject(error);
          });
      });
      pdf.end();
    });

    return this.cteUrl;
  }
}
