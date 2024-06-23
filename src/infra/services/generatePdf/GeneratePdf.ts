import { Injectable } from '@nestjs/common';

import puppeteer from 'puppeteer';

import { UploaderProvider } from 'domain/providers/UploaderProvider';

@Injectable()
export class GeneratePdfService {
  constructor(private cloudFilesService: UploaderProvider) {}

  async generatePdf(html: string, fileName: string): Promise<string> {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ path: fileName, format: 'A4' });
    await browser.close();

    try {
      const url = await this.cloudFilesService.uploadPdf(pdf, fileName);

      console.log(url);

      return url.path;
    } catch (uploadError) {
      console.error(uploadError);
    }
  }
}
