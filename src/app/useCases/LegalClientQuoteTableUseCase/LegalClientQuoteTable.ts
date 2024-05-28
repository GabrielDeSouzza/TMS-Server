import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetLegalClientQuoteTableDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientQuoteTableDto';
import {
  type CountLegalClientQuoteTableRequestDTO,
  type FindAllLegalClientQuoteTableWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalClientQuoteTableRepositoryDto';
import { LegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';
import { LegalClientQuoteTableRepository } from 'domain/repositories/LegalClientQuoteTable.repository';

import { type CreateLegalClientQuoteTableDTO } from 'app/dtos/LegalClientQuoteTableDto/CreateLegalClientQuoteTableDto';
import { type UpdateLegalClientQuoteTableDTO } from 'app/dtos/LegalClientQuoteTableDto/UpdateLegalClientQuoteTableDto';
import { type UpdateManyLegalClientQuoteTableDTO } from 'app/dtos/LegalClientQuoteTableDto/UpdateManyLegalClientQuoteTableDto';
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
  async countLegalClientQuoteTable(
    request: CountLegalClientQuoteTableRequestDTO,
  ) {
    return this.legalClientQuoteTableRepository.countLegalClientQuoteTable(
      request,
    );
  }
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
    data.codQuote = 'QT' + generateRandomNumber(8);
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
      formPayment: data.formPayment,
      kindService: data.kindService,
      codQuote: data.codQuote,
      description: data.description,
      mass: data.mass,
      nf_value: data.nf_value,
      adressDestiny: data.adressDestiny,
      adressOrigin: data.adressOrigin,
      recipientId: data.recipientId,
      senderId: data.senderId,
      typeMerchandise: data.typeMerchandise,
      volume: data.volume,
      who_pays: data.who_pays,
      created_by: data.created_by,
      updated_by: data.updated_by,
      nf_number: data.nf_number,
      nf_serie: data.nf_serie,
      digital_signature: generateRandomNumber(40),
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
      formPayment: data.formPayment,
      kindService: data.kindService,
      description: data.description,
      mass: data.mass,
      nf_value: data.nf_value,
      adressDestiny: data.adressDestiny,
      adressOrigin: data.adressOrigin,
      recipientId: data.recipientId,
      senderId: data.senderId,
      typeMerchandise: data.typeMerchandise,
      volume: data.volume,
      who_pays: data.who_pays,
      created_by: null,
      updated_by: data.updated_by,
      nf_number: data.nf_number,
      nf_serie: data.nf_serie,
      digital_signature: null,
    });

    return this.legalClientQuoteTableRepository.updateLegalClientQuoteTable(
      id,
      order,
    );
  }
  async updateManyLegalClientQuoteTable(
    data: UpdateManyLegalClientQuoteTableDTO[],
    updateBy: string,
  ) {
    for (const legalclientquotetable of data)
      await this.verifyLegalClientQuoteTableExist(legalclientquotetable.id);
    const legalclientquotetables = data.map(legalclientquotetable => {
      const updateLegalClientQuoteTable = new LegalClientQuoteTable({
        amount: legalclientquotetable.amount,
        codQuote: null,
        formPayment: legalclientquotetable.formPayment,
        kindService: legalclientquotetable.kindService,
        description: legalclientquotetable.description,
        mass: legalclientquotetable.mass,
        nf_value: legalclientquotetable.nf_value,
        adressDestiny: legalclientquotetable.adressDestiny,
        adressOrigin: legalclientquotetable.adressOrigin,
        recipientId: legalclientquotetable.recipientId,
        senderId: legalclientquotetable.senderId,
        typeMerchandise: legalclientquotetable.typeMerchandise,
        volume: legalclientquotetable.volume,
        who_pays: legalclientquotetable.who_pays,
        created_by: null,
        updated_by: updateBy,
        id: legalclientquotetable.id,
        nf_number: legalclientquotetable.nf_number,
        nf_serie: legalclientquotetable.nf_serie,
        digital_signature: null,
      });

      return updateLegalClientQuoteTable;
    });

    return this.legalClientQuoteTableRepository.updateManyLegalClientQuoteTable(
      legalclientquotetables,
    );
  }
  async deleteLegalClientQuoteTable(id: string) {
    await this.getLegalClientQuoteTable({ id });

    return this.legalClientQuoteTableRepository.deleteLegalClientQuoteTable(id);
  }
  async deleteManyLegalClientQuoteTable(ids: string[]) {
    for (const legalclientquotetableId of ids)
      await this.verifyLegalClientQuoteTableExist(legalclientquotetableId);

    return this.legalClientQuoteTableRepository.deleteManyLegalClientQuoteTable(
      ids,
    );
  }
  private async verifyLegalClientQuoteTableExist(id: string) {
    const exist =
      await this.legalClientQuoteTableRepository.findLegalClientQuoteTable({
        id,
      });
    if (!exist)
      throw new GraphQLError(
        `THIS LEGAL CLIENT QUOTETABLE ID ${id} NOT FOUND`,
        {
          extensions: { code: HttpStatus.NOT_FOUND },
        },
      );
  }
}
