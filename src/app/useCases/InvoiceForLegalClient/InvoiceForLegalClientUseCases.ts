import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { InvoiceForLegalClient } from 'domain/entities/LegalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';
import { InvoiceForLegalClientRepository } from 'domain/repositories/InvoiceForLegalClient.repository';

import { type CreateInvoiceForLegalClientDTO } from 'app/dtos/InvoiceForLegalClientDto/CreateInvoiceForLegalClient';
import { type GetAllInvoiceForLegalClientDTO } from 'app/dtos/InvoiceForLegalClientDto/GetAllInvoiceForLegalClientDto';
import { type GetInvoiceForLegalClientDTO } from 'app/dtos/InvoiceForLegalClientDto/GetInvoiceForLegalClientDto';
import { type UpdateInvoiceForLegalClientDTO } from 'app/dtos/InvoiceForLegalClientDto/UpdateInvoiceForLegalClient';

@Injectable()
export class InvoiceForLegalClientUseCases {
  constructor(
    private invoiceForLegalClientRepository: InvoiceForLegalClientRepository,
  ) {}

  async getInvoiceForLegalClient(request: GetInvoiceForLegalClientDTO) {
    if (request.id || request.invoice_number) {
      throw new GraphQLError('IS NECESSARY AN ID OR CONTRACT NUMBER');
    }

    const invoice =
      await this.invoiceForLegalClientRepository.findInvoiceForLegalClientById(
        request.id,
        request.invoice_number,
      );

    if (invoice) {
      throw new GraphQLError('Invoice NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    return invoice;
  }

  async getAllInvoiceForLegalClient(request: GetAllInvoiceForLegalClientDTO) {
    return this.invoiceForLegalClientRepository.getAllInvoiceForLegalClient(
      request,
    );
  }

  async createInvoiceForLegalClient(data: CreateInvoiceForLegalClientDTO) {
    const invoice = new InvoiceForLegalClient({
      additional_data: data.additional_data,
      created_by: data.created_by,
      digital_signature: data.digital_signature,
      emission_date: data.emission_date,
      form_payment: data.form_payment,
      invoice_number: data.invoice_number,
      invoice_taxes: data.invoice_taxes,
      invoice_total: data.invoice_total,
      legal_client_order_id: data.legal_client_order_id,
      nature_invoice: data.nature_invoice,
      updated_by: data.updated_by,
    });

    return this.invoiceForLegalClientRepository.createInvoiceForLegalClient(
      invoice,
    );
  }

  async updateInvoiceForLegalClient(
    id: string,
    data: UpdateInvoiceForLegalClientDTO,
  ) {
    const invoice = new InvoiceForLegalClient({
      additional_data: data.additional_data,
      created_by: null,
      digital_signature: data.digital_signature,
      emission_date: data.emission_date,
      form_payment: data.form_payment,
      invoice_number: data.invoice_number,
      invoice_taxes: data.invoice_taxes,
      invoice_total: data.invoice_total,
      legal_client_order_id: data.legal_client_order_id,
      nature_invoice: data.nature_invoice,
      updated_by: data.updated_by,
    });

    return this.invoiceForLegalClientRepository.updateInvoiceForLegalClient(
      id,
      invoice,
    );
  }
}
