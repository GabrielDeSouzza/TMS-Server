import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetLegalClientQuoteTableDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientQuoteTableDto';
import { type FindAllLegalClientQuoteTableWhereRequestDTO } from 'domain/dto/repositories/whereDtos/LegalClientQuoteTableRepositoryDto';
import { LegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';
import { LegalClientQuoteTableRepository } from 'domain/repositories/LegalClientQuoteTable.repository';

import { type CreateLegalClientQuoteTableDTO } from 'app/dtos/LegalClientQuoteTableDto/CreateLegalClientQuoteTableDto';
import { type UpdateLegalClientQuoteTableDTO } from 'app/dtos/LegalClientQuoteTableDto/UpdateLegalClientQuoteTableDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

import { RecipientUseCases } from '../RecipientUseCase /RecipientUseCases';
import { SenderUseCases } from '../SenderUseCase /SenderUseCases';

@Injectable()
export class LegalClientQuoteTableUseCases {
  constructor(
    private legalClientQuoteTableRepository: LegalClientQuoteTableRepository,
    private senderUseCase: SenderUseCases,
    private recipientUseCase: RecipientUseCases,
  ) {}
  async getLegalClientQuoteTable(request: GetLegalClientQuoteTableDTO) {
    if (!request.id && !request.codQuote) {
      throw new GraphQLError('IS NECESSARY AN ID OR COD QUOTE', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const quote =
      await this.legalClientQuoteTableRepository.findLegalClientQuoteTable(
        request,
      );
    if (quote) return quote;

    throw new GraphQLError('QUOTE Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllLegalClientQuoteTable(
    request: FindAllLegalClientQuoteTableWhereRequestDTO,
  ) {
    return this.legalClientQuoteTableRepository.findAllLegalClientQuoteTable(
      request,
    );
  }
  async createQuoteTable(data: CreateLegalClientQuoteTableDTO) {
    data.codQuote = 'QT' + generateRandomNumber();
    const quoteExist =
      await this.legalClientQuoteTableRepository.findLegalClientQuoteTable({
        codQuote: data.codQuote,
      });

    await this.senderUseCase.getSender({ id: data.senderId });
    await this.recipientUseCase.getRecipient({ id: data.recipientId });

    if (quoteExist) {
      throw new GraphQLError('ORDER ALREADY EXISTS', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    const quote = new LegalClientQuoteTable({
      amount: data.amount,
      codQuote: data.codQuote,
      description: data.description,
      mass: data.mass,
      nf_value: data.nf_value,
      postalCodDestiny: data.postalCodDestiny,
      postalCodOrigin: data.postalCodOrigin,
      recipientId: data.recipientId,
      senderId: data.senderId,
      typeMerchandise: data.typeMerchandise,
      volume: data.volume,
      who_pays: data.who_pays,
      created_by: data.created_by,
      updated_by: data.updated_by,
    });

    return this.legalClientQuoteTableRepository.createLegalClientQuoteTable(
      quote,
    );
  }
  async updateQuoteTable(id: string, data: UpdateLegalClientQuoteTableDTO) {
    const orderExist =
      await this.legalClientQuoteTableRepository.findLegalClientQuoteTable({
        id,
      });

    if (!orderExist) {
      throw new GraphQLError('ORDER NOT EXISTS', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    if (data.senderId)
      await this.senderUseCase.getSender({ id: data.senderId });
    else if (data.recipientId)
      await this.recipientUseCase.getRecipient({ id: data.recipientId });
    const order = new LegalClientQuoteTable({
      amount: data.amount,
      codQuote: null,
      description: data.description,
      mass: data.mass,
      nf_value: data.nf_value,
      postalCodDestiny: data.postalCodDestiny,
      postalCodOrigin: data.postalCodOrigin,
      recipientId: data.recipientId,
      senderId: data.senderId,
      typeMerchandise: data.typeMerchandise,
      volume: data.volume,
      who_pays: data.who_pays,
      created_by: null,
      updated_by: data.updated_by,
    });

    return this.legalClientQuoteTableRepository.updateLegalClientQuoteTable(
      id,
      order,
    );
  }
}
