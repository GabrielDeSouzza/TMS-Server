import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type CteLegalClientPdf } from 'domain/entities/Cte Entities/CtePdfLegalClient/CtePdfLegalClient';
import { type CtePhyscialCustomerPdf } from 'domain/entities/Cte Entities/CtePdfPhysicalClient/CtePdfPhysicalCustomer';
import { CtePdfRepository } from 'domain/repositories/CtePdfRepository';

import { GenerateCtePDF } from 'infra/services/generatePdf/CreatePDF/CreateCtePdf';

@Injectable()
export class ctePdfUseCase {
  constructor(
    private ctePdfRepository: CtePdfRepository,
    private uploader: GenerateCtePDF,
  ) {}
  async getCteUrlLegalClient(cteId: string) {
    const ctePdf =
      await this.ctePdfRepository.getDataForGenerateCtePdfLegalClient(cteId);
    this.validateCtePdfData(ctePdf);

    return await this.uploader.GenerateCte(ctePdf);
  }

  async getCteUrlPhysicalCustomer(cteId: string) {
    const ctePdf =
      await this.ctePdfRepository.getDataForGenerateCtePdfPhysicalCustomer(
        cteId,
      );
    this.validateCtePdfDataPhyscialCustomer(ctePdf);

    return await this.uploader.GenerateCte(ctePdf);
  }

  private validateCtePdfData(ctePdf: CteLegalClientPdf) {
    if (!ctePdf.cteData)
      throw new GraphQLError('CTE NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    if (!ctePdf.recipientLegalPerson && !ctePdf.recipientNaturalPerson)
      throw new GraphQLError('RECIPIENT NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    if (!ctePdf.senderLegalPerson && !ctePdf.senderNaturalPerson)
      throw new GraphQLError('SENDER NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    if (!ctePdf.carrierCompany)
      throw new GraphQLError('CARRIER COMPANY NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    if (!ctePdf.legalClient)
      throw new GraphQLError('LEGAL CLIENT NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
  }
  private validateCtePdfDataPhyscialCustomer(ctePdf: CtePhyscialCustomerPdf) {
    if (!ctePdf.cteData)
      throw new GraphQLError('CTE NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    if (!ctePdf.recipientLegalPerson && !ctePdf.recipientNaturalPerson)
      throw new GraphQLError('RECIPIENT NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    if (!ctePdf.senderLegalPerson && !ctePdf.senderNaturalPerson)
      throw new GraphQLError('SENDER NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    if (!ctePdf.carrierCompany)
      throw new GraphQLError('CARRIER COMPANY NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    if (!ctePdf.physicalCustomer)
      throw new GraphQLError('PHYSICAL CUSTOMER NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
  }
}
