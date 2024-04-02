import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type CtePdf } from 'domain/entities/Cte Entities/CtePdfEntity/CtePdf';
import { CtePdfRepository } from 'domain/repositories/CtePdfRepository';

import { GenerateCtePdfService } from 'infra/services/generatePdf/GenerateCtePdf';

@Injectable()
export class ctePdfUseCase {
  constructor(
    private ctePdfRepository: CtePdfRepository,
    private uploader: GenerateCtePdfService,
  ) {}
  async getCteUrlLegalClient(orderId: string) {
    const ctePdf =
      await this.ctePdfRepository.getDataForGenerateCtePdfLegalClient(orderId);
    this.validateCtePdfData(ctePdf);

    return await this.uploader.generatePdf(ctePdf);
  }

  async getCteUrlPhysicalCustomer(orderId: string) {
    const ctePdf =
      await this.ctePdfRepository.getDataForGenerateCtePdfPhysicalCustomer(
        orderId,
      );
    this.validateCtePdfData(ctePdf);

    return await this.uploader.generatePdf(ctePdf);
  }

  private validateCtePdfData(ctePdf: CtePdf) {
    if (!ctePdf.cteData)
      throw new GraphQLError('CTE NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    if (!ctePdf.expenses)
      throw new GraphQLError('EXPENSES NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    if (!ctePdf.recipient)
      throw new GraphQLError('RECIPIENT NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    if (!ctePdf.sender)
      throw new GraphQLError('SENDER NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    if (!ctePdf.carrierCompany)
      throw new GraphQLError('CARRIER COMPANY NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
  }
}
