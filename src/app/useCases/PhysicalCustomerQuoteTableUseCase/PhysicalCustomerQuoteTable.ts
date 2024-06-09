import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetPhysicalCustomerQuoteTableDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerQuoteTableDto';
import {
  type CountAllPhysicalCustomerQuoteTableWhereRequestDTO,
  type FindAllPhysicalCustomerQuoteTableWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/PhysicalCustomerQuoteTableRepositoryDto';
import { PhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';
import { PhysicalCustomerQuoteTableRepository } from 'domain/repositories/PhysicalCustomerQuoteTable.repository';

import { type CreatePhysicalCustomerQuoteTableDTO } from 'app/dtos/PhysicalCustomerQuoteTableDto/CreatePhysicalCustomerQuoteTableDto';
import { type UpdateManyPhysicalCustomerQuoteTableDTO } from 'app/dtos/PhysicalCustomerQuoteTableDto/UpdateManyPhysicalCustomerQuoteTableDto';
import { type UpdatePhysicalCustomerQuoteTableDTO } from 'app/dtos/PhysicalCustomerQuoteTableDto/UpdatePhysicalCustomerQuoteTableDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

import { RecipientUseCases } from '../RecipientUseCase /RecipientUseCases';
import { SenderUseCases } from '../SenderUseCase /SenderUseCases';

@Injectable()
export class PhysicalCustomerQuoteTableUseCases {
  constructor(
    private physicalCustomerQuoteTableRepository: PhysicalCustomerQuoteTableRepository,
    private senderUseCase: SenderUseCases,
    private recipientUseCase: RecipientUseCases,
  ) {}
  async countPhysicalCustomerQuoteTable(
    request: CountAllPhysicalCustomerQuoteTableWhereRequestDTO,
  ) {
    return this.physicalCustomerQuoteTableRepository.count(request);
  }
  async getPhysicalCustomerQuoteTable(
    request: GetPhysicalCustomerQuoteTableDTO,
  ) {
    if (!request.id && !request.codQuote) {
      throw new GraphQLError('IS NECESSARY AN ID OR COD QUOTE', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const quote =
      await this.physicalCustomerQuoteTableRepository.findPhysicalCustomerQuoteTable(
        request,
      );
    if (quote) return quote;

    throw new GraphQLError('QUOTE Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllPhysicalCustomerQuoteTable(
    request: FindAllPhysicalCustomerQuoteTableWhereRequestDTO,
  ) {
    return this.physicalCustomerQuoteTableRepository.findAllPhysicalCustomerQuoteTable(
      request,
    );
  }
  async createQuoteTable(data: CreatePhysicalCustomerQuoteTableDTO) {
    data.codQuote = 'QT' + generateRandomNumber(8);
    const quoteExist =
      await this.physicalCustomerQuoteTableRepository.findPhysicalCustomerQuoteTable(
        {
          codQuote: data.codQuote,
        },
      );

    await this.senderUseCase.getSender({ id: data.senderId });
    await this.recipientUseCase.getRecipient({ id: data.recipientId });

    if (quoteExist) {
      throw new GraphQLError('ORDER ALREADY EXISTS', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    const quote = new PhysicalCustomerQuoteTable({
      amount: data.amount,
      codQuote: data.codQuote,
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
      created_by: data.created_by,
      updated_by: data.updated_by,
      nf_number: data.nf_number,
      nf_serie: data.nf_serie,
      digital_signature: generateRandomNumber(40),
    });

    return this.physicalCustomerQuoteTableRepository.createPhysicalCustomerQuoteTable(
      quote,
    );
  }
  async updateQuoteTable(
    id: string,
    data: UpdatePhysicalCustomerQuoteTableDTO,
  ) {
    const orderExist =
      await this.physicalCustomerQuoteTableRepository.findPhysicalCustomerQuoteTable(
        {
          id,
        },
      );

    if (orderExist) {
      throw new GraphQLError('ORDER ALREADY EXISTS', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    if (!data.senderId)
      await this.senderUseCase.getSender({ id: data.senderId });
    else if (!data.recipientId)
      await this.recipientUseCase.getRecipient({ id: data.recipientId });

    const order = new PhysicalCustomerQuoteTable({
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

    return this.physicalCustomerQuoteTableRepository.updatePhysicalCustomerQuoteTable(
      id,
      order,
    );
  }

  async updateManyPhysicalCustomerQuoteTable(
    data: UpdateManyPhysicalCustomerQuoteTableDTO[],
    updateBy: string,
  ) {
    for (const physicalcustomerquotetable of data)
      await this.verifyPhysicalCustomerQuoteTableExist(
        physicalcustomerquotetable.id,
      );
    const physicalcustomerquotetables = data.map(physicalcustomerquotetable => {
      const updatePhysicalCustomerQuoteTable = new PhysicalCustomerQuoteTable({
        amount: physicalcustomerquotetable.amount,
        codQuote: null,
        formPayment: physicalcustomerquotetable.formPayment,
        kindService: physicalcustomerquotetable.kindService,
        description: physicalcustomerquotetable.description,
        mass: physicalcustomerquotetable.mass,
        nf_value: physicalcustomerquotetable.nf_value,
        adressDestiny: physicalcustomerquotetable.adressDestiny,
        adressOrigin: physicalcustomerquotetable.adressOrigin,
        recipientId: physicalcustomerquotetable.recipientId,
        senderId: physicalcustomerquotetable.senderId,
        typeMerchandise: physicalcustomerquotetable.typeMerchandise,
        volume: physicalcustomerquotetable.volume,
        who_pays: physicalcustomerquotetable.who_pays,
        created_by: null,
        updated_by: updateBy,
        id: physicalcustomerquotetable.id,
        nf_number: physicalcustomerquotetable.nf_number,
        nf_serie: physicalcustomerquotetable.nf_serie,
        digital_signature: null,
      });

      return updatePhysicalCustomerQuoteTable;
    });

    return this.physicalCustomerQuoteTableRepository.updateManyPhysicalCustomerQuoteTable(
      physicalcustomerquotetables,
    );
  }

  async deletePhysicalCustomerQuoteTable(id: string) {
    await this.getPhysicalCustomerQuoteTable({ id });

    return this.physicalCustomerQuoteTableRepository.deletePhysicalCustomerQuoteTable(
      id,
    );
  }
  async deleteManyPhysicalCustomerQuoteTable(ids: string[]) {
    for (const physicalcustomerquotetableId of ids)
      await this.verifyPhysicalCustomerQuoteTableExist(
        physicalcustomerquotetableId,
      );

    return this.physicalCustomerQuoteTableRepository.deleteManyPhysicalCustomerQuoteTable(
      ids,
    );
  }

  private async verifyPhysicalCustomerQuoteTableExist(id: string) {
    const exist =
      await this.physicalCustomerQuoteTableRepository.findPhysicalCustomerQuoteTable(
        {
          id,
        },
      );
    if (!exist)
      throw new GraphQLError(
        `THIS LEGAL CLIENT QUOTETABLE ID ${id} NOT FOUND`,
        {
          extensions: { code: HttpStatus.NOT_FOUND },
        },
      );
  }
}
